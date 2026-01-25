import type { Metadata } from "next";
import { Ubuntu, Vollkorn } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "./context/MenuContext";
import { ReservationProvider } from "./context/ReservationContext";
import NavBar from "./components/NavBarSection/NavBar";

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
  title: "Kalè Gastrobar",
  description: "Experience fine dining at Kalè Gastrobar",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon_ioKale/favicon.ico", sizes: "any" },
      { url: "/favicon_ioKale/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_ioKale/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon_ioKale/apple-touch-icon.png",
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
        <ReservationProvider>
          <MenuProvider>
            <NavBar />
            {children}
          </MenuProvider>
        </ReservationProvider>
      </body>
    </html>
  );
}
