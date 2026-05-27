import type { Metadata, Viewport } from "next";
import { Ubuntu, Vollkorn } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "./context/MenuContext";
import { ReservationProvider } from "./context/ReservationContext";
import { LanguageProvider } from "./context/LanguageContext";
import NavBarWrapper from "./components/NavBarSection/NavBarWrapper";

export const viewport: Viewport = {
  viewportFit: "cover",
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

const getBaseUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  return url.startsWith("http") ? url : `https://${url}`;
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: "Kalè Gastrobar",
  description: "Experience fine dining at Kalè Gastrobar",
  manifest: "/site.webmanifest",
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
    title: "Kalè Gastrobar",
    description: "Experience fine dining at Kalè Gastrobar",
    images: [
      {
        url: "/logos/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Kalè Gastrobar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalè Gastrobar",
    description: "Experience fine dining at Kalè Gastrobar",
    images: ["/logos/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${vollkorn.variable} antialiased`}>
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
