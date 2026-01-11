"use client";

import { motion } from "framer-motion";
import ReviewBox from "../ReviewBox";
import HeroTypography from "../HeroTypography";

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
              duration: 50,
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
    </section>
  );
}
