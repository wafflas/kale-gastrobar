"use client";

import { useEffect, useRef } from "react";

import HeroTypography from "../shared/HeroTypography";
import ReviewsCarousel from "./components/ReviewsCarousel";
import { useLanguage } from "../../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words =
        sectionRef.current?.querySelectorAll<HTMLElement>("[data-review-word]");
      if (!words?.length) return;

      gsap.set(words, { opacity: 0, x: -22, filter: "blur(10px)" });

      gsap.to(words, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);


  const titleWords = t("reviews.title").split(" ");

  return (
    <section
      ref={sectionRef}
      className="flex flex-col my-16 md:my-30 bg-cream overflow-hidden"
    >
      <div className="px-3 lg:px-6 mb-5 md:mb-8">
        <HeroTypography size={100} className="block leading-tight">
          {titleWords.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              data-review-word
              className="inline-block will-change-transform"
            >
              {word}
              {idx < titleWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </HeroTypography>
      </div>

      <div className="relative flex overflow-x-hidden">
        <ReviewsCarousel />
      </div>

      <div className="mt-16 flex flex-col items-center text-center px-6">
        <p className="font-ubuntu text-[17px] md:text-[20px] lg:text-[24px] text-darkbrown/60 max-w-md leading-snug">
          {t("reviews.cta_text")}
        </p>
        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g189418-d33035265-Reviews-Kale_Gastrobar-Ierapetra_Lasithi_Prefecture_Crete.html?m=69573"
          target="_blank"
          rel="noopener noreferrer"
          className="font-vollkorn text-[14px] md:text-[17px] lg:text-[20px] text-darkbrown mt-4 border-b border-darkbrown hover:opacity-70 transition-opacity"
        >
          {t("reviews.cta_button")}
        </a>
      </div>
    </section>
  );
}

