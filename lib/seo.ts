import type { Metadata } from "next";

const productionUrl = "https://weddingraj.vercel.app";

function normalizeUrl(url: string) {
  const withProtocol = /^https?:\/\//.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  productionUrl
);

export const siteName = "The Wedding Times";
export const coupleNames = "Shefali & Raj";
export const shareImageAlt =
  "The Wedding Times wedding invitation for Shefali and Raj in Goa";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

const baseKeywords = [
  "Shefali and Raj wedding",
  "The Wedding Times",
  "Raj Wali Shefali",
  "Goa wedding",
  "Kenilworth Resort and Spa Goa",
  "wedding invitation",
  "wedding RSVP",
];

export const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: shareImageAlt,
};

export function pageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    applicationName: siteName,
    authors: [{ name: coupleNames }],
    creator: coupleNames,
    publisher: siteName,
    keywords: [...baseKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      type: "website",
      locale: "en_IN",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const homeMetadata = pageMetadata({
  title: "The Wedding Times — Shefali & Raj",
  description:
    "You are invited to celebrate Shefali and Raj in Goa on 1-2 February 2027 at Kenilworth Resort & Spa.",
  path: "/",
  keywords: ["Shefali Raj wedding invitation", "Goa wedding invite"],
});

export const day1Metadata = pageMetadata({
  title: "Day 1 Edition — Haldi & Sangeet | Shefali & Raj",
  description:
    "Day 1 wedding celebration guide for Shefali and Raj, featuring Haldi and Sangeet details in Goa.",
  path: "/day-1",
  keywords: ["Haldi ceremony", "Sangeet night", "Day 1 wedding schedule"],
});

export const day2Metadata = pageMetadata({
  title: "Day 2 Edition — Wedding Day | Shefali & Raj",
  description:
    "Day 2 wedding schedule for Shefali and Raj, including Grah Shanti, Chooda, Baaraat, ceremony, and after-party details.",
  path: "/day-2",
  keywords: ["Wedding day schedule", "Baaraat", "Goa wedding ceremony"],
});

export const rsvpMetadata = pageMetadata({
  title: "RSVP & Guest Information — Shefali & Raj",
  description:
    "Confirm your attendance for Shefali and Raj's Goa wedding and find guest travel, RSVP, and event update details.",
  path: "/rsvp",
  keywords: ["wedding RSVP", "guest information", "Goa wedding travel"],
});

export const weddingEventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Shefali & Raj Wedding Celebration",
  description:
    "A two-day wedding celebration for Shefali and Raj in Goa at Kenilworth Resort & Spa.",
  image: [
    absoluteUrl("/opengraph-image"),
    absoluteUrl("/images/clone-assets/front-couple-img-0909.jpg"),
  ],
  url: absoluteUrl("/"),
  startDate: "2027-02-01T11:00:00+05:30",
  endDate: "2027-02-02T23:59:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Kenilworth Resort & Spa, Goa",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Goa",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Person",
    name: coupleNames,
  },
};
