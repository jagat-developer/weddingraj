import {
  NewspaperShell,
  type ShellMenuItem,
  type ShellPage,
} from "@/components/shell";
import { FrontPage } from "@/components/pages/front-page";
import { Day1Page } from "@/components/pages/day-1-page";
import { Day2Page } from "@/components/pages/day-2-page";
import { RsvpPage } from "@/components/pages/rsvp-page";

const pages: ShellPage[] = [
  { content: <FrontPage />, path: "/", label: "Front Page" },
  { content: <Day1Page />, path: "/day-1", label: "Day 1 — Haldi & Sangeet" },
  { content: <Day2Page />, path: "/day-2", label: "Day 2 — Wedding Day" },
  { content: <RsvpPage />, path: "/rsvp", label: "RSVP & Guest Info" },
];

const menu: ShellMenuItem[] = [
  { label: "Home", pageIndex: 0 },
  { label: "Day 1", pageIndex: 1 },
  { label: "Day 2", pageIndex: 2 },
  { label: "Guest Details", pageIndex: 3, anchor: "guest-details" },
  { label: "RSVP", pageIndex: 3, anchor: "rsvp-form" },
];

export default function Home() {
  return <NewspaperShell pages={pages} menu={menu} initialIndex={0} />;
}
