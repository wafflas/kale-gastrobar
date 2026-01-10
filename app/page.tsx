import Footer from "./components/sections/Footer";
import LandingPage from "./components/sections/LandingPage";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-cream">
      <div className="flex flex-col min-h-screen">
        <LandingPage />
        <Footer />
      </div>
    </main>
  );
}
