import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { homeMetadata, siteUrl, weddingEventJsonLd } from "@/lib/seo";
import "./globals.css";

// Manrope — body, labels, captions. Variable, soothing sans.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Playfair Display — masthead "THE WEDDING TIMES" and large display headlines.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(siteUrl),
  category: "wedding invitation",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-desk text-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingEventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
