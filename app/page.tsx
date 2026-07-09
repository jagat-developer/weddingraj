import { WeddingShell } from "@/components/pages/wedding-shell-config";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata;

export default function Home() {
  return <WeddingShell initialIndex={0} />;
}
