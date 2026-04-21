"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollOpacityTextProps {
  text: string; // The text to animate
  className?: string; // Container styles
  textClassName?: string; // Text element styles
  containerHeight?: string; // Outer container height (e.g. "h-[3000px]")
  start?: string;
  end?: string;
  extendedHold?: boolean; // New prop to hold visibility after animation
}

export default function ScrollOpacityText({
  text,
  className = "",
  textClassName = "",
  containerHeight,
  start = "top top",
  end = "+=1500%",
  extendedHold = false,
}: ScrollOpacityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setWords(text.split(" "));
  }, [text]);

  useEffect(() => {
    if (!containerRef.current || words.length === 0) return;

    const ctx = gsap.context(() => {
      const charElements = textRef.current?.querySelectorAll(".char");

      if (charElements && charElements.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: 0.75,
            pin: true,
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, [words, start, end, extendedHold]);

  const content = (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center ${className}`}
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

  if (!containerHeight) return content;

  return (
    <div className={`w-full ${containerHeight}`} data-section="scroll-opacity-text">
      {content}
    </div>
  );
}
