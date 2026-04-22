import LenisProvider from "./components/providers/LenisProvider";
import { LoadingProvider } from "./context/LoadingContext";
import LandingPage from "./components/LandingSection/LandingPage";
import DecorationBand from "./components/shared/DecorationBand";
import IntroSection from "./components/IntroSection/IntroSection";
import PlaceSection from "./components/PlaceSection/PlaceSection";
import ScrollOpacityText from "./components/shared/ScrollOpacityText";
import EatSipSection from "./components/EatSipSection/EatSipSection";
//import CuisineSection from "./components/CuisineSection/CuisineSection";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";
import Footer from "./components/FooterSection/Footer";
//import MenuSection from "./components/MenuSection/MenuSection";

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
            start="top 80%"
            end="bottom 20%"
          />
          {/* <MenuSection /> */}
          <EatSipSection />
          {/* { <CuisineSection /> */}
          <ReviewsSection />
          <Footer />
        </main>
      </LenisProvider>
    </LoadingProvider>
  );
}
