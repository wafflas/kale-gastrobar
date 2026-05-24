"use client";

import React, { useRef } from "react";

import HostsContent from "./components/HostsContent";
import HostsGrid from "./components/HostsGrid";
import Button from "../shared/Button";
import { useReservation } from "../../context/ReservationContext";
import { useLanguage } from "../../context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HostsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openReservation } = useReservation();
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const centerEl = sectionRef.current.querySelector(".center-image");
      const sideImages = sectionRef.current.querySelectorAll(".side-image");

      if (!centerEl || sideImages.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          once: true,
          toggleActions: "play none none none",
        },
      })
      .fromTo(
        centerEl,
        { y: 30, scale: 0.97, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" }
      )
      .fromTo(
        sideImages,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.18, ease: "power3.out" },
        "-=1.0"
      );

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hosts"
      className="relative w-full min-h-svh flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 overflow-hidden bg-cream py-16 md:py-24 lg:py-32"
    >
      <div className="w-full flex flex-col items-center z-10 space-y-6 md:space-y-10 lg:space-y-12">
        <HostsContent />
        <div className="w-full flex justify-center mt-4 md:mt-8">
          <HostsGrid />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-6 pt-12 md:pt-20 z-20">
          <p className="font-vollkorn text-darkbrown/90 text-[clamp(30px,4.5vw,54px)] italic font-semibold leading-none text-center tracking-wide pb-4">
            {t("hosts.waiting")}
          </p>
          <Button
            variant="primary"
            size="sm"
            className="rounded-full px-6 md:px-8 shadow-md animate-fade-in"
            onClick={openReservation}
          >
            {t("hosts.reserve_now")}
          </Button>
        </div>
      </div>
    </section>
  );
}


