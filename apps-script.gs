/**
 * Wedding Times — RSVP Webhook
 *
 * Paste this into the Apps Script editor attached to your Sheet
 * (https://docs.google.com/spreadsheets/d/1ZnYef9orQoyjahVSj9TsqRbNsjf4neWbr8QaJ_REL7Q/edit)
 *
 * Setup (5 minutes):
 *   1. Open the Sheet
 *   2. Extensions → Apps Script
 *   3. Delete any boilerplate and paste this whole file
 *   4. Save (⌘S), name the project (e.g. "Wedding RSVP")
 *   5. Click "Deploy" → "New deployment"
 *      - Select type: Web app
 *      - Description: RSVP webhook v1
 *      - Execute as: Me (your Gmail)
 *      - Who has access: Anyone   ← important — this lets the site POST to it
 *   6. Click "Deploy" → first time, authorize the script when prompted
 *   7. Copy the "Web app URL" (https://script.google.com/macros/s/.../exec)
 *   8. In the project root, create `.env.local` with:
 *        RSVP_WEBHOOK_URL=<paste the URL here>
 *      (and add the same key in Vercel → Settings → Environment Variables if deployed)
 *   9. Restart the dev server so the env loads (`npm run dev`)
 *
 * From now on, every RSVP submission appends one row per guest to your Sheet.
 * The Age column is populated for adults and children.
 *
 * To redeploy after editing: Deploy → Manage deployments → pencil icon → New version.
 * The URL stays stable across versions.
 */

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

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#102844")
    .setFontColor("#fbf6ec");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    ensureHeaders_(sheet);

    const timestamp = body.timestamp || new Date().toISOString();
    const groupId = body.groupId || Utilities.getUuid().slice(0, 8);
    const guests = Array.isArray(body.guests) ? body.guests : [];
    const total = guests.length;
    const adultCount = guests.filter(function (g) {
      return String(g.guestType || "Adult").toLowerCase() !== "child";
    }).length;
    const childrenCount = guests.filter(function (g) {
      return String(g.guestType || "").toLowerCase() === "child";
    }).length;

    if (!total) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "no guests" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    guests.forEach(function (g) {
      const age = String(g.age || "").trim();
      sheet.appendRow([
        timestamp,
        groupId,
        total,
        adultCount,
        childrenCount,
        String(g.guestType || "Adult").trim(),
        String(g.firstName || "").trim(),
        String(g.lastName || "").trim(),
        String(g.whatsapp || "").trim(),
        age,
      ]);
    });

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, groupId: groupId, count: total })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err && err.message || err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: a GET endpoint that confirms the script is wired up.
// After deploy, hit the Web app URL in a browser — you should see "ok".
function doGet() {
  return ContentService.createTextOutput("RSVP webhook is live.");
}
