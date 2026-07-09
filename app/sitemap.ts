import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-07-09T00:00:00.000Z");

const routes = [
  { path: "/", priority: 1 },
  { path: "/day-1", priority: 0.9 },
  { path: "/day-2", priority: 0.9 },
  { path: "/rsvp", priority: 0.85 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
    images: [absoluteUrl("/opengraph-image")],
  }));
}
