import type { Metadata } from "next";
import en from "../../locales/en.json";
import { createPageMetadata } from "../../lib/site";

export const metadata: Metadata = createPageMetadata({
  title: en.menu.the_menu,
  description: en.menu.description,
  path: "/menu",
});

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
