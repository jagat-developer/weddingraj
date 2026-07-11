/**
 * Wedding Times — RSVP Webhook
 *
 * Paste this into the Apps Script editor for your RSVP Web App.
 * It writes to the RajXShefali Sheet:
 * https://docs.google.com/spreadsheets/d/1GGvgMoLNBGIJTHQGEvUr4EC5MhVFvo4S-e760z9HskM/edit
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
 * The sheet stores per-guest columns only, so there is no repeated TotalGuests
 * value on every row. The Age column is populated for children only.
 *
 * Quick check after redeploy:
 *   Open the Web app URL in a browser. It will migrate the header row and
 *   return JSON showing the active schema version and headers.
 *
 * To redeploy after editing: Deploy → Manage deployments → pencil icon → New version.
 * The URL stays stable across versions.
 */

const SPREADSHEET_ID = "1GGvgMoLNBGIJTHQGEvUr4EC5MhVFvo4S-e760z9HskM";
const SHEET_NAME = "Sheet1";

const HEADERS = [
  "Timestamp",
  "GroupID",
  "GuestType",
  "FirstName",
  "LastName",
  "WhatsApp",
  "Age",
];

const REMOVED_HEADERS = ["TotalGuests", "AdultCount", "ChildrenCount"];
const SCHEMA_VERSION = "2026-07-10-age-column-explicit-sheet";

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
}

function getHeaders_(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function findHeaderIndex_(headers, header) {
  const target = String(header).trim().toLowerCase();
  for (let i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === target) return i;
  }
  return -1;
}

function migrateHeaders_(sheet) {
  if (sheet.getLastRow() === 0) return;

  let headers = getHeaders_(sheet);
  REMOVED_HEADERS.forEach(function (header) {
    const index = findHeaderIndex_(headers, header);
    if (index !== -1) {
      sheet.deleteColumn(index + 1);
      headers = getHeaders_(sheet);
    }
  });

  headers = getHeaders_(sheet);
  const hasGuestType = findHeaderIndex_(headers, "GuestType") !== -1;
  const firstNameIndex = findHeaderIndex_(headers, "FirstName");
  if (!hasGuestType && firstNameIndex !== -1) {
    sheet.insertColumnBefore(firstNameIndex + 1);
  }

  headers = getHeaders_(sheet);
  const hasAge = findHeaderIndex_(headers, "Age") !== -1;
  if (!hasAge) {
    sheet.insertColumnAfter(sheet.getLastColumn());
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    migrateHeaders_(sheet);
    const clearWidth = Math.max(sheet.getLastColumn(), HEADERS.length);
    sheet.getRange(1, 1, 1, clearWidth).clearContent().clearFormat();
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#102844")
    .setFontColor("#fbf6ec");
  sheet.setFrozenRows(1);
  backfillGuestTypes_(sheet);
}

function backfillGuestTypes_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  const rows = dataRange.getValues();
  let changed = false;

  rows.forEach(function (row) {
    const current = String(row[2] || "").trim().toLowerCase();
    const hasValidType = current === "adult" || current === "child";
    if (hasValidType) return;

    const firstName = String(row[3] || "").trim();
    const lastName = String(row[4] || "").trim();
    if (!firstName && !lastName) return;

    const whatsapp = String(row[5] || "").trim();
    row[2] = whatsapp ? "Adult" : "Child";
    changed = true;
  });

  if (changed) dataRange.setValues(rows);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    ensureHeaders_(sheet);

    const timestamp = body.timestamp || new Date().toISOString();
    const groupId = body.groupId || Utilities.getUuid().slice(0, 8);
    const guests = Array.isArray(body.guests) ? body.guests : [];
    const total = guests.length;

    if (!total) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "no guests" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    guests.forEach(function (g) {
      const guestType = String(g.guestType || "Adult").trim();
      const isChild = guestType.toLowerCase() === "child";
      const age = isChild ? String(g.age || "").trim() : "";
      sheet.appendRow([
        timestamp,
        groupId,
        guestType,
        String(g.firstName || "").trim(),
        String(g.lastName || "").trim(),
        isChild ? "" : String(g.whatsapp || "").trim(),
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

// Optional: a GET endpoint that confirms the script is wired up and migrates
// the header row without appending a guest RSVP.
function doGet() {
  try {
    const sheet = getSheet_();
    ensureHeaders_(sheet);
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: true,
        version: SCHEMA_VERSION,
        spreadsheetId: SPREADSHEET_ID,
        sheetName: sheet.getName(),
        headers: getHeaders_(sheet).slice(0, HEADERS.length),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err && err.message || err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
