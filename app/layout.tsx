import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "The Wedding Times — Shefali & Raj",
  description:
    "Special Wedding Edition. Shefali & Raj are tying the knot in Goa, 1–2 February 2027. Kenilworth Resort & Spa.",
  openGraph: {
    title: "The Wedding Times — Shefali & Raj",
    description:
      "Shefali & Raj — 1–2 February 2027 — Kenilworth Resort & Spa, Goa.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding Times — Shefali & Raj",
    description:
      "Shefali & Raj — 1–2 February 2027 — Kenilworth Resort & Spa, Goa.",
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
        {children}
      </body>
    </html>
  );
}
