"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ScrollDownIndicator() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fillRef.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

    tl.fromTo(
      fillRef.current,
      { scaleY: 0, opacity: 1, transformOrigin: "top center" },
      { scaleY: 1, duration: 1.8, ease: "power2.out" },
    ).to(fillRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute bottom-[110px] md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 group">
      <div className="relative h-8 w-[1px]">
        <div className="absolute inset-0 bg-white/20" />
        <div ref={fillRef} className="absolute inset-0 bg-white/80" />
      </div>

      <span className="font-apercu text-[0.5rem] tracking-[0.35em] uppercase text-white/60 group-hover:text-white/90 transition-colors duration-500">
        SCROLL DOWN
      </span>
    </div>
  );
}
