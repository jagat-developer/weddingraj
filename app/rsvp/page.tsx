import { WeddingShell } from "@/components/pages/wedding-shell-config";
import { rsvpMetadata } from "@/lib/seo";

export const metadata = rsvpMetadata;

export default function RsvpRoute() {
  return <WeddingShell initialIndex={3} />;
}
