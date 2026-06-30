import { NewspaperShell, type ShellMenuItem, type ShellPage } from "@/components/shell";
import { Day1Page } from "@/components/pages/day-1-page";
import { Day2Page } from "@/components/pages/day-2-page";
import { FrontPage } from "@/components/pages/front-page";
import { RsvpPage } from "@/components/pages/rsvp-page";

export const weddingPages: ShellPage[] = [
  { content: <FrontPage />, path: "/", label: "Front Page" },
  { content: <Day1Page />, path: "/day-1", label: "Day 1 - Haldi & Sangeet" },
  { content: <Day2Page />, path: "/day-2", label: "Day 2 - Wedding Day" },
  { content: <RsvpPage />, path: "/rsvp", label: "RSVP & Guest Info" },
];

export const weddingMenu: ShellMenuItem[] = [
  { label: "Home", pageIndex: 0 },
  { label: "Day 1", pageIndex: 1 },
  { label: "Day 2", pageIndex: 2 },
  { label: "Guest Information", pageIndex: 3, anchor: "guest-information" },
  { label: "RSVP", pageIndex: 3, anchor: "rsvp-form" },
];

export function WeddingShell({ initialIndex = 0 }: { initialIndex?: number }) {
  return (
    <NewspaperShell
      pages={weddingPages}
      menu={weddingMenu}
      initialIndex={initialIndex}
    />
  );
}
