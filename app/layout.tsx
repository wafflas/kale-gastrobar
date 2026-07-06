import type { Metadata, Viewport } from "next";
import { Ubuntu, Vollkorn } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "./context/MenuContext";
import { ReservationProvider } from "./context/ReservationContext";
import { LanguageProvider } from "./context/LanguageContext";
import NavBarWrapper from "./components/NavBarSection/NavBarWrapper";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  OG_IMAGE,
  getSiteUrl,
  getRestaurantJsonLd,
} from "./lib/site";

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#2B1810",
  colorScheme: "light",
};

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin", "greek"],
  weight: ["300", "400", "500", "700"],
});

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "restaurant",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon_ioKale/favicon.ico", sizes: "any" },
      {
        url: "/favicon_ioKale/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_ioKale/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/favicon_ioKale/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["el_GR"],
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: {
      url: OG_IMAGE.url,
      alt: OG_IMAGE.alt,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const restaurantJsonLd = getRestaurantJsonLd();

  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${vollkorn.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd),
          }}
        />
        <LanguageProvider>
          <ReservationProvider>
            <MenuProvider>
              <NavBarWrapper />
              {children}
            </MenuProvider>
          </ReservationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
