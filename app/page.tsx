"use client";

import LenisProvider from "./components/providers/LenisProvider";
import { LoadingProvider } from "./context/LoadingContext";
import LandingPage from "./components/LandingSection/LandingPage";
import DecorationBand from "./components/shared/DecorationBand";
import IntroSection from "./components/IntroSection/IntroSection";
import PlaceSection from "./components/PlaceSection/PlaceSection";
import ScrollOpacityText from "./components/shared/ScrollOpacityText";
import EatSipSection from "./components/EatSipSection/EatSipSection";
import HostsSection from "./components/HostsSection/HostsSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import Footer from "./components/FooterSection/Footer";
import MenuSection from "./components/MenuSection/MenuSection";
import { useLanguage } from "./context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { t } = useLanguage();

  useGSAP(() => {
    // Select the key body copy paragraph tags on the page for standard scroll reveals
    const revealParagraphs = document.querySelectorAll(
      "#menu header p, #hosts p, #reviews .mt-16 p, footer p:first-of-type"
    );

    revealParagraphs.forEach((p) => {
      // Set starting state with a soft modern blur and subtle offset
      gsap.set(p, { opacity: 0, y: 22, filter: "blur(4px)" });

      // Animate elegantly on scroll
      gsap.to(p, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: p,
          start: "top 88%",
          once: true,
          toggleActions: "play none none none",
        },
      });
    });
  });

  return (
    <LoadingProvider>
      <LenisProvider>
        <main className="relative flex flex-col w-full min-h-screen bg-cream overflow-hidden">
          <LandingPage />
          {/* <DecorationBand /> */}
          <IntroSection />
          <PlaceSection />
          <ScrollOpacityText
            text={t("intro.quote")}
          />
          <MenuSection />
          <DecorationBand />
          <EatSipSection />
          <HostsSection />
          <ReviewsSection />
          <Footer />
        </main>
      </LenisProvider>
    </LoadingProvider>
  );
}

