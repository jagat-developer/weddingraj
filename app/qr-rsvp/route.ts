import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL("/rsvp", request.url);
  url.hash = "rsvp-form";

  return NextResponse.redirect(url, 307);
}
