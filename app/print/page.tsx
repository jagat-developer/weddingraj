import type { Metadata } from "next";
import { Day1Page } from "@/components/pages/day-1-page";
import { Day2Page } from "@/components/pages/day-2-page";
import { FrontPage } from "@/components/pages/front-page";
import { RsvpPage } from "@/components/pages/rsvp-page";

export const metadata: Metadata = {
  title: "Printable Wedding Times Packet — Shefali & Raj",
  description:
    "Printable four-page Wedding Times packet with QR RSVP card for Shefali and Raj's wedding.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrintPacketRoute() {
  return (
    <main className="page-stage clone-print-stage clone-print-packet">
      <FrontPage />
      <Day1Page />
      <Day2Page />
      <RsvpPage mode="qr" />
    </main>
  );
}
