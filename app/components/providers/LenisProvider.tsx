"use client";

import { useState, useEffect, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

const DESKTOP_BREAKPOINT = "(min-width: 769px)";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    setUseLenis(mq.matches);
    const listener = () => setUseLenis(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  if (!useLenis) return <>{children}</>;

  return <ReactLenis root>{children}</ReactLenis>;
}
