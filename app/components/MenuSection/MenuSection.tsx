"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsArrowRight } from "react-icons/bs";
import Button from "../shared/Button";
import HeroTypography from "../shared/HeroTypography";
import StackingCards from "./components/StackingCards";
import { useReservation } from "../../context/ReservationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { openReservation } = useReservation();

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });
    });

    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      // iPad / Tablet
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top -40%",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center center",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[120vh] lg:h-screen bg-darkbrown overflow-hidden px-10 lg:px-40 py-10 lg:py-20 "
    >
      <div className="flex flex-col lg:flex-row w-full items-start gap-10">
        <div className="flex flex-col items-start justify-center w-full lg:w-1/2 h-full space-y-10 md:space-y-20 pt-0 md:pt-20">
          <HeroTypography
            className="text-white text-start"
            size={100}
            color="var(--color-darkbrown)"
            stroke="var(--color-cream)"
          >
            Our Menu
          </HeroTypography>
          <p className="text-cream text-start font-ubuntu text-xl md:text-2xl max-w-3xl leading-relaxed">
            Reserve now on Kale gastrobar, known for sharing plates, craft
            cocktails, thoughtfully curated wine list and impeccable service! We
            are located in the heart of the city, just a stone's throw away from
            the famous street of the same name.
          </p>
          <div className="flex flex-col lg:flex-row w-full gap-6 px-0 justify-center lg:justify-start">
            <Button
              variant="secondary"
              size="md"
              className="flex space-x-2 justify-center items-center"
              onClick={openReservation}
            >
              RESERVE NOW
            </Button>
            <Button
              variant="outline"
              size="md"
              className="flex space-x-2 justify-center items-center "
            >
              VIEW MENU <BsArrowRight className="text-xl" />
            </Button>
          </div>
        </div>
        <div className="w-full mt-15 lg:w-1/2">
          <StackingCards />
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
