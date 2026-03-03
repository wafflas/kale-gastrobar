"use client";

import { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import HorizontalDecoration from "./shared/HorizontalDecoration";
import Footer from "./FooterSection/Footer";
import LandingPage from "./LandingSection/LandingPage";
import ReviewsSection from "./ReviewsSection/ReviewsSection";
import IntroSection from "./IntroSection/IntroSection";
import PlaceSection from "./PlaceSection/PlaceSection";
import MenuSection from "./MenuSection/MenuSection";
import EatSipSection from "./EatSipSection/EatSipSection";
import ScrollOpacityText from "./shared/ScrollOpacityText";
import LoadingScreen from "./shared/LoadingScreen";
import CuisineSection from "./CuisineSection/CuisineSection";

const DESKTOP_BREAKPOINT = "(min-width: 769px)";

export default function PageShell() {
  const [showLoading, setShowLoading] = useState(true);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  const [useLenis, setUseLenis] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BREAKPOINT);
    setUseLenis(mq.matches);
    const listener = () => setUseLenis(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const mainContent = (
    <main className="relative w-full min-h-screen bg-cream overflow-hidden">
      <div className="flex flex-col min-h-screen">
        <LandingPage shouldPlayVideo={shouldPlayVideo} />
        <div className="mt-5">
          <HorizontalDecoration
            text="The feeling of being in the right place. • The feeling of being in the right place. "
            direction="left"
            size={70}
          />
          <HorizontalDecoration
            text="The feeling of being in the right place. • The feeling of being in the right place. "
            direction="right"
            size={70}
          />
        </div>

        <IntroSection />
        <PlaceSection />
        <div className="w-full h-[3000px]" data-section="scroll-opacity-text">
          <ScrollOpacityText
            text="The food on the plate is the coming together of what is at its best in the present with the creative consequence of what was not used in the past."
            start="top top"
            end="+=3000"
            extendedHold={true}
            className="w-full h-screen flex items-center justify-center "
          />
        </div>

        <MenuSection />
        <div className="mt-5">
          <HorizontalDecoration
            text="The feeling of being in the right place. • The feeling of being in the right place. "
            direction="left"
            size={70}
          />
          <HorizontalDecoration
            text="The feeling of being in the right place. • The feeling of being in the right place. "
            direction="right"
            size={70}
          />
        </div>
        <EatSipSection />
        <CuisineSection />
        <div className="flex flex-col min-h-screen">
          <ReviewsSection />
        </div>
        <Footer />
      </div>
    </main>
  );

  return (
    <>
      {showLoading && (
        <LoadingScreen
          onStartExit={() => setShouldPlayVideo(true)}
          onComplete={() => setShowLoading(false)}
        />
      )}
      {useLenis ? <ReactLenis root>{mainContent}</ReactLenis> : mainContent}
    </>
  );
}
