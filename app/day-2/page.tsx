import { WeddingShell } from "@/components/pages/wedding-shell-config";
import { day2Metadata } from "@/lib/seo";

export const metadata = day2Metadata;

export default function Day2Route() {
  return <WeddingShell initialIndex={2} />;
}
