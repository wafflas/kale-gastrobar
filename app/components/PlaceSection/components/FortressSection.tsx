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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll<HTMLElement>(".fortress-line");
      if (!lines?.length) return;

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
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-cream overflow-hidden"
    >
      <div className="absolute inset-0">
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
