"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { useMenu } from "../../context/MenuContext";
import { useReservation } from "../../context/ReservationContext";
import gsap from "gsap";

const OPEN_DURATION = 0.5;
const CLOSE_DURATION = 0.45;
const TEXT_STAGGER = 0.06;
const EASE_OPEN = "power3.out";
const EASE_CLOSE = "power3.in";

export default function NavBar() {
  const slideRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);
  const [language, setLanguage] = useState<"el" | "en">("el");
  const { closeMenu } = useMenu();
  const { openReservation } = useReservation();
  const router = useRouter();

  const handleClose = useCallback(
    (afterClose?: () => void) => {
      if (!slideRef.current || isClosingRef.current) return;
      isClosingRef.current = true;
      const reveals =
        containerRef.current?.querySelectorAll<HTMLElement>(".nav-reveal");
      const tl = gsap.timeline({
        onComplete: () => {
          closeMenu();
          afterClose?.();
        },
      });
      if (reveals?.length) {
        tl.to(reveals, {
          filter: "blur(3px)",
          opacity: 0,
          duration: 0.25,
          stagger: { each: 0.03, from: "end" },
          ease: EASE_CLOSE,
        });
      }
      tl.to(
        slideRef.current,
        {
          height: 0,
          duration: CLOSE_DURATION,
          ease: EASE_CLOSE,
          overflow: "hidden",
        },
        reveals?.length ? "-=0.15" : 0,
      );
    },
    [closeMenu],
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      handleClose(() => router.push(href));
    },
    [handleClose, router],
  );

  useEffect(() => {
    if (!slideRef.current || !containerRef.current) return;
    const slide = slideRef.current;
    const reveals =
      containerRef.current.querySelectorAll<HTMLElement>(".nav-reveal");

    gsap.set(slide, { height: 0, overflow: "hidden" });
    gsap.set(reveals, { filter: "blur(12px)", opacity: 0 });

    const tl = gsap.timeline();
    tl.to(slide, {
      height: "100vh",
      duration: OPEN_DURATION,
      ease: EASE_OPEN,
      overflow: "hidden",
    });
    tl.to(
      reveals,
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        stagger: TEXT_STAGGER,
        ease: "power2.out",
      },
      "-=0.35",
    );
    tl.set(slide, { overflow: "auto" });
    tl.set(reveals, { clearProps: "opacity,filter" });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 w-full overflow-hidden pointer-events-none"
      aria-hidden="false"
    >
      <div
        ref={slideRef}
        className="absolute bottom-0 left-0 right-0 w-full bg-darkbrown text-cream flex flex-col px-8 py-20 md:px-12 md:py-6 overflow-y-auto pointer-events-auto min-h-0"
        style={{ height: 0 }}
      >
        <div className="flex items-center justify-between w-full px-2 md:px-12">
          <div className="flex-1 flex justify-start nav-reveal">
            <Logo useImage={true} imageSrc="/logo.png" size="xs" />
          </div>

          <div className="flex-1 flex justify-end items-center gap-1">
            <button
              className="nav-reveal p-1 hover:scale-110 transition-transform cursor-pointer"
              aria-label="Close menu"
              onClick={() => handleClose()}
            >
              <IoClose size={30} className="text-cream" />
            </button>
            <Button
              variant="secondary"
              size="sm"
              className="nav-reveal"
              onClick={() => handleClose(openReservation)}
            >
              RESERVE
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-40 md:space-y-15 py-2">
          <div className="flex justify-center items-center gap-6 font-ubuntu mt-6">
            <button
              onClick={() => setLanguage("en")}
              className={`nav-reveal text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer ${
                language === "en" ? "opacity-100" : "opacity-50"
              }`}
              aria-label="Switch to English"
            >
              English
            </button>
            <button
              onClick={() => setLanguage("el")}
              className={`nav-reveal text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer ${
                language === "el" ? "opacity-100" : "opacity-50"
              }`}
              aria-label="Switch to Greek"
            >
              Ελληνικά
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 md:space-y-8 py-2">
            <div className="flex flex-wrap justify-center gap-x-7 md:gap-x-24 gap-y-4 font-vollkorn text-[30px] md:text-[60px] lg:text-[90px] leading-tight">
              <Link
                href="/"
                className="nav-reveal hover:opacity-70 transition-opacity"
                onClick={(e) => handleLinkClick(e, "/")}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="nav-reveal hover:opacity-70 transition-opacity"
                onClick={(e) => handleLinkClick(e, "/about")}
              >
                About
              </Link>
              <Link
                href="/menu"
                className="nav-reveal hover:opacity-70 transition-opacity"
                onClick={(e) => handleLinkClick(e, "/menu")}
              >
                Menu
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-24 gap-y-4 font-vollkorn text-[30px] md:text-[60px] lg:text-[90px] leading-tight">
              <Link
                href="/place"
                className="nav-reveal hover:opacity-70 transition-opacity"
                onClick={(e) => handleLinkClick(e, "/place")}
              >
                Place
              </Link>
              <Link
                href="/cuisine"
                className="nav-reveal hover:opacity-70 transition-opacity"
                onClick={(e) => handleLinkClick(e, "/cuisine")}
              >
                Cuisine
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-12 mt-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-sm md:text-lg font-ubuntu tracking-wide opacity-90">
            <Link
              href="tel:+302842020140"
              className="nav-reveal hover:opacity-70 transition-opacity"
              onClick={(e) => handleLinkClick(e, "tel:+302842020140")}
            >
              +30 28420 20140 |
            </Link>
            <span className="nav-reveal hidden md:block opacity-50">|</span>
            <span className="nav-reveal">Everyday | 20:00-24:00</span>
            <span className="nav-reveal hidden md:block opacity-50">|</span>
            <span className="nav-reveal">Tamiolaki 2 | Ierapetra, Crete</span>
          </div>

          <div className="flex items-center gap-10">
            <a
              href="https://www.instagram.com/kale.gastrobar.ier/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reveal hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reveal hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              aria-label="TripAdvisor"
            >
              <SiTripadvisor size={30} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-reveal hover:scale-110 transition-transform opacity-90 hover:opacity-100"
              aria-label="Facebook"
            >
              <FaFacebook size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
