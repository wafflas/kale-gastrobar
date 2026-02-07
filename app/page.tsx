"use client";

import { ReactLenis } from "lenis/react";
import HorizontalDecoration from "./components/shared/HorizontalDecoration";
import Footer from "./components/FooterSection/Footer";
import LandingPage from "./components/LandingSection/LandingPage";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import IntroSection from "./components/IntroSection/IntroSection";
import PlaceSection from "./components/PlaceSection/PlaceSection";
import MenuSection from "./components/MenuSection/MenuSection";
import EatSipSection from "./components/EatSipSection/EatSipSection";
import ScrollOpacityText from "./components/shared/ScrollOpacityText";

export default function Home() {
  return (
    <ReactLenis root>
      <main className="relative w-full min-h-screen bg-cream overflow-hidden">
        <div className="flex flex-col min-h-screen">
          <LandingPage />
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
          <div className="w-full h-[3000px]">
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
          <div className="flex flex-col min-h-screen">
            <ReviewsSection />
          </div>
          <Footer />
        </div>
      </main>
    </ReactLenis>
  );
}
