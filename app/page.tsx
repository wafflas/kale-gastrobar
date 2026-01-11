import HeroTypography from "./components/HeroTypography";
import Footer from "./components/sections/Footer";
import LandingPage from "./components/sections/LandingPage";
import ReviewsSection from "./components/sections/ReviewsSection";
export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-cream">
      <div className="flex flex-col min-h-screen">
        <LandingPage />
        <div className="flex flex-col min-h-screen">
          <ReviewsSection />
        </div>
        <Footer />
      </div>
    </main>
  );
}
