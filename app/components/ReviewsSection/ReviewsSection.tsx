"use client";

import { motion } from "framer-motion";
import ReviewBox from "./components/ReviewBox";
import HeroTypography from "../shared/HeroTypography";

const REVIEWS = [
  {
    reviewSite: "Trip Advisor",
    reviewText:
      "Inassumong on the outside, GORGEOUS on the inside. I was dining alone and it was just stellar.",
    authorName: "Marie R.",
  },
  {
    reviewSite: "Google",
    reviewText:
      "Inassumong on the outside, GORGEOUS on the inside. I was dining alone and it was just stellar.",
    authorName: "Marie R.",
  },
  {
    reviewSite: "Yelp",
    reviewText:
      "The restaurant is very clean, food is amazing and servers very attentive. You will not regret eating here.",
    authorName: "Elizabeth M.",
  },
  {
    reviewSite: "Reddit",
    reviewText:
      "I had some of the best Indian food around… Tandoori Chicken, Rogan Josh and samosa chaat — everything was incredible.",
    authorName: "Rahul S.",
  },
];

export default function ReviewsSection() {
  const loopedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="py-10 bg-cream overflow-hidden">
      <div className="mx-auto px-6 mb-5 md:mb-8">
        <HeroTypography size={70} className="block leading-tight">
          What our guests say...
        </HeroTypography>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex gap-10 py-4"
          animate={{
            x: [0, "-33.33%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {loopedReviews.map((review, index) => (
            <div key={index} className="shrink-0">
              <ReviewBox
                reviewSite={review.reviewSite}
                reviewText={review.reviewText}
                authorName={review.authorName}
              />
            </div>
          ))}
        </motion.div>
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
