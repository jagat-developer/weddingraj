import type { Metadata } from "next";
import { RsvpPage } from "@/components/pages/rsvp-page";

export const metadata: Metadata = {
  title: "Printable RSVP QR — Shefali & Raj",
  description:
    "Printable QR version of the RSVP and guest information page for Shefali and Raj's wedding.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RsvpPrintRoute() {
  return (
    <main className="page-stage clone-print-stage">
      <RsvpPage mode="qr" />
    </main>
  );
}
