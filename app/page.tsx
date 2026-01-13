import HorizontalDecoration from "./components/HorizontalDecoration";
import Footer from "./components/sections/Footer";
import LandingPage from "./components/sections/LandingPage";
import ReviewsSection from "./components/sections/ReviewsSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-cream">
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
        <div className="flex flex-col min-h-screen">
          <ReviewsSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
