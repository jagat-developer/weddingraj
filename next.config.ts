import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local SVG placeholders during dev (client will replace with real JPGs).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
