import type { Metadata } from "next";
import en from "../locales/en.json";

export const SITE_NAME = "Kalè Gastrobar";
export const SITE_TITLE = en.metadata.title;
export const SITE_DESCRIPTION = en.metadata.description;

export const OG_IMAGE = {
  url: "/opengraph.png",
  width: 1200,
  height: 630,
  alt: "Kalè Gastrobar",
  type: "image/png",
} as const;

export const SITE_KEYWORDS = [
  "Kalè Gastrobar",
  "gastrobar",
  "restaurant",
  "fine dining",
  "Ierapetra",
  "Crete",
  "Mediterranean cuisine",
  "Greek restaurant",
];

export const SITE_SOCIAL = {
  instagram: "https://www.instagram.com/kale.gastrobar.ier/",
  facebook:
    "https://www.facebook.com/profile.php?id=61573999105493",
  tripadvisor:
    "https://www.tripadvisor.com/Restaurant_Review-g189418-d33035265-Reviews-Kale_Gastrobar-Ierapetra_Lasithi_Prefecture_Crete.html?m=69573",
} as const;

export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  return url.startsWith("http") ? url : `https://${url}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path = "/",
}: PageMetadataOptions): Metadata {
  const pageTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      title: pageTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function getRestaurantJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    image: `${siteUrl}${OG_IMAGE.url}`,
    url: siteUrl,
    telephone: "+302842020140",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Tamiolaki 2",
      addressLocality: "Ierapetra",
      addressRegion: "Crete",
      postalCode: "722 00",
      addressCountry: "GR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "20:00",
        closes: "24:00",
      },
    ],
    servesCuisine: ["Mediterranean", "Greek"],
    sameAs: Object.values(SITE_SOCIAL),
  };
}
