import HeroTypography from "../shared/HeroTypography";
import ReviewsCarousel from "./components/ReviewsCarousel";

export default function ReviewsSection() {
  return (
    <section className="flex flex-col my-16 md:my-30 bg-cream overflow-hidden">
      <div className="mx-auto px-6 mb-5 md:mb-8">
        <HeroTypography size={70} className="block leading-tight">
          What our guests say...
        </HeroTypography>
      </div>

      <div className="relative flex overflow-x-hidden">
        <ReviewsCarousel />
      </div>

      <div className="mt-16 flex flex-col items-center text-center px-6">
        <p className="font-ubuntu text-[17px] md:text-[20px] lg:text-[24px] text-darkbrown/60 max-w-md leading-snug">
          Have you already visited our restaurant and left with great memories?
        </p>
        <a
          href="https://www.tripadvisor.com/Restaurant_Review-g189418-d33035265-Reviews-Kale_Gastrobar-Ierapetra_Lasithi_Prefecture_Crete.html?m=69573"
          target="_blank"
          rel="noopener noreferrer"
          className="font-vollkorn text-[14px] md:text-[17px] lg:text-[20px] text-darkbrown mt-4 border-b border-darkbrown hover:opacity-70 transition-opacity"
        >
          Be sure to leave us a review!
        </a>
      </div>
    </section>
  );
}
