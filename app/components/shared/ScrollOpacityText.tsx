"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollOpacityTextProps {
  text: string; // The text to animate
  className?: string; // Container styles
  textClassName?: string; // Text element styles
  start?: string;
  end?: string;
  extendedHold?: boolean;
}

export default function ScrollOpacityText({
  text,
  className = "",
  textClassName = "",
  start = "top 70%",
  end = "bottom 55%",
  extendedHold = false,
}: ScrollOpacityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => text.split(" "), [text]);

  useGSAP(
    () => {
      if (!containerRef.current || words.length === 0) return;

      let tl: gsap.core.Timeline | null = null;

      const timer = setTimeout(() => {
        if (!containerRef.current) return;

        const charElements = textRef.current?.querySelectorAll(".char");

        if (!charElements || charElements.length === 0) return;

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: 0.75,
            markers: false,
          },
        });

        tl.fromTo(
          charElements,
          {
            opacity: 0.25,
          },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "none",
          },
        );

        if (extendedHold) {
          tl.to({}, { duration: tl.duration() });
        }

        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(timer);
        if (tl) {
          tl.kill();
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill();
          }
        }
      };
    },
    { dependencies: [words, start, end, extendedHold], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center pb-24 ${className}`}
    >
      <div className="container max-w-4xl px-4">
        <p
          ref={textRef}
          className={`text-3xl lg:text-[80px] text-darkbrown text-center text-ubuntu ${textClassName}`}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span key={charIndex} className="char inline-block">
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className="char inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
