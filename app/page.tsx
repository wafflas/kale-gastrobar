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
export default function Home() {
  return (
    <ReactLenis root>
      <main className="relative w-full min-h-screen bg-cream overflow-hidden">
        <div className="flex flex-col min-h-screen">
          <LandingPage />
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
          <IntroSection />
          <PlaceSection />
          <MenuSection />
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
