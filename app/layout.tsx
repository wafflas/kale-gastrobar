import type { Metadata } from "next";
import { Ubuntu, Vollkorn } from "next/font/google";
import "./globals.css";

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
    icon: "/favicon.ico",
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
        {children}
      </body>
    </html>
  );
}
