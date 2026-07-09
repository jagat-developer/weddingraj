import { WeddingShell } from "@/components/pages/wedding-shell-config";
import { day1Metadata } from "@/lib/seo";

export const metadata = day1Metadata;

export default function Day1Route() {
  return <WeddingShell initialIndex={1} />;
}
