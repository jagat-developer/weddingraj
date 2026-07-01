import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * RSVP submission endpoint.
 *
 * Behavior:
 *   1. Writes a row per guest to `data/rsvps.csv` (best-effort, in-process).
 *      Useful when running locally — won't survive Vercel/Netlify deploys
 *      because their filesystems are ephemeral.
 *   2. If `RSVP_WEBHOOK_URL` is set, also POSTs the payload to that URL
 *      (e.g. a Google Apps Script Web App attached to the destination Sheet).
 *      This is the production storage path.
 *
 * The submission succeeds if EITHER step works. We surface remote-write
 * status so callers can debug, but never fail the user's RSVP just because
 * the disk write or webhook hiccupped.
 */

const CSV_PATH = path.join(process.cwd(), "data", "rsvps.csv");
const HEADERS = [
  "Timestamp",
  "GroupID",
  "TotalGuests",
  "AdultCount",
  "ChildrenCount",
  "GuestType",
  "FirstName",
  "LastName",
  "WhatsApp",
  "Age",
];

type GuestType = "Adult" | "Child";
type Guest = {
  guestType?: string;
  firstName: string;
  lastName: string;
  age: string;
  whatsapp?: string;
};
type CleanGuest = Required<Pick<Guest, "firstName" | "lastName" | "age">> & {
  guestType: GuestType;
  whatsapp: string;
};
type Payload = { adultCount?: number; childrenCount?: number; guests: Guest[] };

function makeGroupId() {
  // 8-char base36, ~2.8 trillion combos — plenty for a guest list
  return Math.random().toString(36).slice(2, 10);
}

function csvEscape(v: string) {
  if (v.includes('"') || v.includes(",") || v.includes("\n")) {
    return '"' + v.replace(/"/g, '""') + '"';
  }
  return v;
}

async function appendCsv(rows: string[][]) {
  await fs.mkdir(path.dirname(CSV_PATH), { recursive: true });
  let exists = true;
  try {
    await fs.access(CSV_PATH);
  } catch {
    exists = false;
  }
  if (!exists) {
    await fs.writeFile(CSV_PATH, HEADERS.join(",") + "\n", "utf-8");
  }
  const data =
    rows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
  await fs.appendFile(CSV_PATH, data, "utf-8");
}

type ForwardResult = { sent: boolean; status?: number; error?: string };

async function forwardToSheet(payload: {
  guests: CleanGuest[];
  groupId: string;
  timestamp: string;
  adultCount: number;
  childrenCount: number;
}): Promise<ForwardResult> {
  const url = process.env.RSVP_WEBHOOK_URL;
  if (!url) return { sent: false, error: "no webhook configured" };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script Web Apps follow a redirect after auth; required for fetch
      redirect: "follow",
    });
    return { sent: res.ok, status: res.status };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

function normalizeGuestType(value: string | undefined): GuestType {
  return value?.toLowerCase() === "child" ? "Child" : "Adult";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const { guests } = body;
  if (!Array.isArray(guests) || guests.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No guests provided" },
      { status: 400 },
    );
  }
  for (const g of guests) {
    const guestType = normalizeGuestType(g?.guestType);
    if (!g?.firstName?.trim() || !g?.lastName?.trim() || !g?.age?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Each guest needs first name, last name and age" },
        { status: 400 },
      );
    }
    if (guestType === "Adult" && !g?.whatsapp?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Each adult guest needs a WhatsApp number" },
        { status: 400 },
      );
    }
  }

  const timestamp = new Date().toISOString();
  const groupId = makeGroupId();
  const total = String(guests.length);

  const cleanedGuests: CleanGuest[] = guests.map((g) => ({
    guestType: normalizeGuestType(g.guestType),
    firstName: g.firstName.trim(),
    lastName: g.lastName.trim(),
    age: g.age.trim(),
    whatsapp: g.whatsapp?.trim() ?? "",
  }));
  const adultCount = cleanedGuests.filter((g) => g.guestType === "Adult").length;
  const childrenCount = cleanedGuests.filter((g) => g.guestType === "Child").length;

  const rows = cleanedGuests.map((g) => [
    timestamp,
    groupId,
    total,
    String(adultCount),
    String(childrenCount),
    g.guestType,
    g.firstName,
    g.lastName,
    g.whatsapp,
    g.age,
  ]);

  // Best-effort local CSV
  let csvOk = true;
  try {
    await appendCsv(rows);
  } catch (err) {
    csvOk = false;
    console.error("RSVP CSV write failed:", err);
  }

  // Forward to Google Sheet (production destination)
  const remote = await forwardToSheet({
    guests: cleanedGuests,
    groupId,
    timestamp,
    adultCount,
    childrenCount,
  });

  return NextResponse.json({
    ok: true,
    groupId,
    storage: {
      csv: csvOk,
      remote,
    },
  });
}
