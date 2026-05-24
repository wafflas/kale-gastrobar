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

export default function Home() {
  const { t } = useLanguage();

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
            start="top 80%"
            end="bottom 20%"
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

