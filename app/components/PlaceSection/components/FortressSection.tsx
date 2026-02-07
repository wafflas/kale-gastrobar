"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FortressScroll from "./FortressScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FortressSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const lines =
        sectionRef.current?.querySelectorAll<HTMLElement>(".fortress-line");
      if (!lines?.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        gsap.set(contentRef.current, { y: "100%" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });
        tl.to(contentRef.current, {
          y: "0%",
          duration: 0.5,
          ease: "power3.out",
        });
        tl.fromTo(
          lines,
          { opacity: 0, x: -56, filter: "blur(20px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.25"
        );
        return tl;
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(contentRef.current, { y: "0%" });
        gsap.set(lines, { opacity: 1, x: 0, filter: "blur(0px)" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-cream overflow-hidden"
    >
      <div ref={contentRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/PlaceSection/fortress2.png"
          alt="Kale Gastrobar by the fortress"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <FortressScroll />
        </div>
      </div>
    </section>
  );
}
