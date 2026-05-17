"use client";

import React, { useRef } from "react";
import CuisineContent from "./components/CuisineContent";
import CuisineGrid from "./components/CuisineGrid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The section is taller than the viewport so it has scroll room to drive the
// reveal. The pin element itself stays exactly viewport-sized.
const SECTION_VH = 180;

export default function CuisineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinRef.current ||
        !gridContainerRef.current
      )
        return;

      const pinEl = pinRef.current;

      const sideImages = gsap.utils.toArray<HTMLElement>(
        gridContainerRef.current.querySelectorAll(".side-image"),
      );

      // Initial state: pin content is hidden (so nothing bleeds over EatSip),
      // side images are far below the viewport.
      gsap.set(pinEl, { visibility: "hidden" });
      gsap.set(sideImages, { y: "100vh", opacity: 0, force3D: true });

      // Manually toggle position:fixed via ScrollTrigger callbacks instead of
      // relying on GSAP's `pin` option. This guarantees the fixed styles are
      // ONLY applied while the section is in its scroll range — so the pin
      // element cannot leak above EatSip or behind ReviewsSection.
      const fixPinEl = () => {
        gsap.set(pinEl, {
          visibility: "visible",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100svh",
          zIndex: 5,
        });
      };

      const releasePinEl = () => {
        gsap.set(pinEl, {
          clearProps: "position,top,left,right,width,height,zIndex",
          visibility: "hidden",
        });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: fixPinEl,
        onEnterBack: fixPinEl,
        onLeave: releasePinEl,
        onLeaveBack: releasePinEl,
        invalidateOnRefresh: true,
      });

      // Scroll-scrubbed reveal timeline. Side images come up first, then the
      // whole pin content slides up to ease out as the section ends.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          sideImages,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.7,
            stagger: { each: 0.18, from: "random" },
          },
          0,
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream"
      style={{ height: `${SECTION_VH}svh` }}
    >
      <div
        ref={pinRef}
        className="w-full h-svh flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-cream"
      >
        <div className="w-full flex flex-col items-center z-10 space-y-2 md:space-y-4">
          <CuisineContent />
          <div className="w-full flex justify-center mt-2 md:mt-4">
            <CuisineGrid ref={gridContainerRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
