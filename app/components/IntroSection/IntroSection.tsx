"use client";

import Image from "next/image";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import { useEffect, useRef } from "react";
import { useReservation } from "../../context/ReservationContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardTopLeftRef = useRef<HTMLDivElement>(null);
  const cardBottomRightRef = useRef<HTMLDivElement>(null);
  const cardTopRightRef = useRef<HTMLDivElement>(null);
  const cardBottomLeftRef = useRef<HTMLDivElement>(null);
  const { openReservation } = useReservation();

  useEffect(() => {
    if (
      !sectionRef.current ||
      !stickyRef.current ||
      !cardTopLeftRef.current ||
      !cardBottomRightRef.current ||
      !cardTopRightRef.current ||
      !cardBottomLeftRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      const items = q<HTMLElement>("[data-intro-reveal]");
      if (!items.length) return;

      gsap.set(items, { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(
        [
          cardTopLeftRef.current,
          cardBottomRightRef.current,
          cardTopRightRef.current,
          cardBottomLeftRef.current,
        ],
        {
          opacity: 0,
          y: 26,
          filter: "blur(12px)",
          force3D: true,
        },
      );
      const floatingCards = [
        cardTopLeftRef.current,
        cardBottomRightRef.current,
        cardTopRightRef.current,
        cardBottomLeftRef.current,
      ];

      gsap.set(floatingCards, {
        opacity: 0,
        y: 26,
        filter: "blur(12px)",
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
        defaults: { duration: 0.25, ease: "power2.out" },
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.06,
        clearProps: "filter",
      });

      tl.to(floatingCards, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "filter",
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      scrollTl
        .fromTo(
          cardTopLeftRef.current,
          { xPercent: 8, yPercent: -8, rotate: -8, scale: 0.98 },
          {
            xPercent: -18,
            yPercent: -22,
            rotate: -14,
            scale: 1.02,
            ease: "none",
          },
          0,
        )
        .fromTo(
          cardBottomRightRef.current,
          { xPercent: 10, yPercent: 12, rotate: 8, scale: 0.98 },
          { xPercent: 22, yPercent: 26, rotate: 14, scale: 1.03, ease: "none" },
          0,
        )
        .fromTo(
          cardTopRightRef.current,
          { xPercent: 2, yPercent: -10, rotate: 6, scale: 0.96 },
          {
            xPercent: 12,
            yPercent: -26,
            rotate: 12,
            scale: 1.01,
            ease: "none",
          },
          0,
        )
        .fromTo(
          cardBottomLeftRef.current,
          { xPercent: -2, yPercent: 10, rotate: -6, scale: 0.96 },
          {
            xPercent: -12,
            yPercent: 28,
            rotate: -12,
            scale: 1.01,
            ease: "none",
          },
          0,
        );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream my-10 h-[220svh] "
    >
      <div ref={stickyRef} className="sticky top-0 h-svh w-full">
        <div className="relative h-full w-full px-4 sm:px-6 ">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div
              ref={cardTopLeftRef}
              className="absolute left-[2%] top-[16%] w-[26vw] max-w-[150px] sm:left-[4%] sm:top-[20%] sm:w-[22vw] sm:max-w-[200px] lg:left-[6%] lg:top-[18%] lg:w-[16vw] lg:max-w-[240px]"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(43,24,16,0.18)] ring-1 ring-darkbrown/10 bg-cream">
                <Image
                  src="/images/IntroSection/intro1.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 38vw, (max-width: 1024px) 26vw, 16vw"
                />
              </div>
            </div>

            <div
              ref={cardBottomRightRef}
              className="absolute right-[2%] top-[66%] w-[26vw] max-w-[160px] sm:right-[4%] sm:top-[58%] sm:w-[22vw] sm:max-w-[210px] lg:right-[6%] lg:top-[56%] lg:w-[16vw] lg:max-w-[250px]"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl  ring-1 ring-darkbrown/10 bg-cream">
                <Image
                  src="/images/IntroSection/intro2.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 26vw, 16vw"
                />
              </div>
            </div>

            <div
              ref={cardTopRightRef}
              className="absolute right-[2%] top-[12%] w-[20vw] max-w-[112px] sm:right-[8%] sm:top-[14%] sm:w-[20vw] sm:max-w-[230px] lg:right-[10%] lg:top-[12%] lg:w-[14vw] lg:max-w-[240px]"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(43,24,16,0.16)] ring-1 ring-darkbrown/10 bg-cream">
                <Image
                  src="/images/IntroSection/intro3.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 20vw, 14vw"
                />
              </div>
            </div>

            <div
              ref={cardBottomLeftRef}
              className="absolute left-[2%] bottom-[14%] w-[20vw] max-w-[112px] sm:left-[8%] sm:bottom-[18%] sm:w-[20vw] sm:max-w-[210px] lg:left-[10%] lg:bottom-[14%] lg:w-[14vw] lg:max-w-[240px]"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-[0_30px_70px_rgba(43,24,16,0.16)] ring-1 ring-darkbrown/10 bg-cream">
                <Image
                  src="/images/IntroSection/intro4.webp"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 20vw, (max-width: 1024px) 20vw, 14vw"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-208 flex-col items-center justify-center text-center pointer-events-auto">
            <div data-intro-reveal className="mb-3 sm:mb-4">
              <Logo useImage={true} imageSrc="/logos/logo2.png" size="xs" />
            </div>

            <h2
              data-intro-reveal
              className="font-vollkorn text-[clamp(34px,6vw,104px)] sm:text-[clamp(40px,5vw,110px)] text-darkbrown leading-[1.03] font-semibold"
            >
              Where every bite <br className="hidden md:block" /> tells a story.
            </h2>

            <p
              data-intro-reveal
              className="mt-4 sm:mt-6 font-ubuntu text-[clamp(18px,2.2vw,30px)] text-darkbrown/80 leading-tight font-normal"
            >
              Bold flavours, unhurried moments.
            </p>

            <div
              data-intro-reveal
              className="mx-auto flex items-center justify-center gap-3 py-1 sm:py-2"
              aria-hidden="true"
            >
              <div className="h-px w-10 bg-darkbrown/20" />
              <div className="h-1 w-1 rounded-full bg-darkbrown/30" />
              <div className="h-px w-10 bg-darkbrown/20" />
            </div>

            <p
              data-intro-reveal
              className="font-ubuntu text-[clamp(14px,1.45vw,20px)] text-darkbrown/70 leading-relaxed font-normal max-w-160 mx-auto"
            >
              We craft dishes that linger on the palate and conversations that
              linger at the table. No rush, no rules, just honest cooking, good
              wine, and the kind of evening you don&apos;t want to{" "}
              <span className="font-bold text-darkbrown">end.</span>
            </p>

            <div data-intro-reveal className="pt-6 sm:pt-7">
              <Button
                variant="primary"
                size="md"
                className="bg-darkbrown! text-cream! rounded-full px-[clamp(28px,4vw,44px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.1vw,16px)]"
                onClick={openReservation}
              >
                RESERVE NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
