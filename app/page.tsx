import LenisProvider from "./components/providers/LenisProvider";
import { LoadingProvider } from "./context/LoadingContext";
import LandingPage from "./components/LandingSection/LandingPage";
import DecorationBand from "./components/shared/DecorationBand";
import IntroSection from "./components/IntroSection/IntroSection";
import PlaceSection from "./components/PlaceSection/PlaceSection";
import ScrollOpacityText from "./components/shared/ScrollOpacityText";
import MenuSection from "./components/MenuSection/MenuSection";
import EatSipSection from "./components/EatSipSection/EatSipSection";
import CuisineSection from "./components/CuisineSection/CuisineSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import Footer from "./components/FooterSection/Footer";

export default function Home() {
  return (
    <LoadingProvider>
      <LenisProvider>
        <main className="relative flex flex-col w-full min-h-screen bg-cream overflow-hidden">
          <LandingPage />
          <DecorationBand />
          <IntroSection />
          <PlaceSection />
          <ScrollOpacityText
            text="The food on the plate is the coming together of what is at its best in the present with the creative consequence of what was not used in the past."
            start="top top"
            end="+=3000"
            extendedHold={true}
            containerHeight="h-[3000px]"
            className="w-full h-screen flex items-center justify-center"
          />
          <MenuSection />
          <DecorationBand />
          <EatSipSection />
          <CuisineSection />
          <ReviewsSection />
          <Footer />
        </main>
      </LenisProvider>
    </LoadingProvider>
  );
}
