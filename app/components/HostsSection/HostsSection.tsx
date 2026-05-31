"use client";

import React, { useRef } from "react";

import HostsContent from "./components/HostsContent";
import HostsGrid from "./components/HostsGrid";
import GastrobarMap from "./components/GastrobarMap";
import Button from "../shared/Button";
import Logo from "../shared/Logo";
import HeroTypography from "../shared/HeroTypography";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const { openReservation } = useReservation();
  const { t } = useLanguage();

  useGSAP(
    () => {
      if (!sectionRef.current || !gridRef.current) return;

      let tl: gsap.core.Timeline | null = null;

      const timer = setTimeout(() => {
        if (!sectionRef.current || !gridRef.current) return;

        const centerEl = sectionRef.current.querySelector(".center-image");
        const sideImages = sectionRef.current.querySelectorAll(".side-image");

        if (!centerEl || sideImages.length === 0) return;

        gsap.set(centerEl, { y: 30, scale: 0.97, opacity: 0 });
        gsap.set(sideImages, { y: 20, opacity: 0 });

        tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
              toggleActions: "play none none none",
            },
          })
          .to(centerEl, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
          })
          .to(
            sideImages,
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              stagger: 0.18,
              ease: "power3.out",
            },
            "-=1.0",
          );

        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(timer);
        if (tl) {
          tl.kill();
          tl.scrollTrigger?.kill();
        }
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hosts"
      className="relative w-full min-h-svh flex flex-col items-center justify-center px-2 sm:px-8 md:px-12 overflow-hidden bg-cream py-16 md:py-24 lg:py-32"
    >
      <div className="w-full flex flex-col items-center z-10 space-y-6 md:space-y-10 lg:space-y-12">
        <HostsContent />
        <div className="w-full flex justify-center mt-4 md:mt-8">
          <HostsGrid ref={gridRef} />
        </div>
        <div className="w-full max-w-3xl mx-auto pt-8 md:pt-16 px-0 sm:px-4 z-20">
          <div className="relative overflow-hidden rounded-3xl border border-darkbrown/15 bg-gradient-to-br from-cream/60 via-cream/45 to-cream/20 backdrop-blur-xl px-5 py-7 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(93,62,50,0.08)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(93,62,50,0.12)]">
            <div
              className="absolute inset-4 sm:inset-3 rounded-[18px] sm:rounded-[20px] border border-darkbrown/5 pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute inset-5 sm:inset-4 rounded-[16px] sm:rounded-[18px] border border-dashed border-darkbrown/10 pointer-events-none"
              aria-hidden
            />

            <div
              className="absolute top-5 left-5 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-darkbrown/20 pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute top-5 right-5 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t border-r border-darkbrown/20 pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute bottom-5 left-5 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b border-l border-darkbrown/20 pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute bottom-5 right-5 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-darkbrown/20 pointer-events-none"
              aria-hidden
            />

            <div className="mb-2 z-10 transform scale-75 opacity-90">
              <Logo useImage={true} imageSrc="/logos/logo2.png" size="xs" />
            </div>

            <span className="font-ubuntu text-[10px] tracking-[0.22em] text-darkbrown/50 uppercase mb-2 z-10">
              {t("nav.reserve")}
            </span>

            <div className="flex items-center justify-center gap-x-3 mb-4 opacity-50 z-10">
              <div className="h-px w-6 bg-darkbrown/20" />
              <div className="w-1 h-1 rotate-45 bg-darkbrown" />
              <div className="h-px w-6 bg-darkbrown/20" />
            </div>

            <p className="font-vollkorn text-darkbrown/90 text-[clamp(20px,4vw,44px)] italic font-semibold leading-tight text-center tracking-wide mb-3 z-10">
              {t("hosts.waiting")}
            </p>

            <p className="font-vollkorn text-darkbrown/70 text-xs sm:text-sm italic tracking-wide max-w-md mb-5 sm:mb-8 z-10">
              {t("hosts.tagline")}
            </p>

            {/* Premium Brownish Iframe Map */}
            <div className="w-full max-w-xl mb-5 sm:mb-8 z-10">
              <GastrobarMap />
            </div>

            <Button
              variant="primary"
              size="sm"
              className="rounded-full px-8 py-3.5 shadow-[0_4px_20px_rgba(93,62,50,0.12)] hover:shadow-[0_6px_25px_rgba(93,62,50,0.22)] transform hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300 z-10 tracking-[0.16em]"
              onClick={openReservation}
            >
              {t("hosts.reserve_now")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
