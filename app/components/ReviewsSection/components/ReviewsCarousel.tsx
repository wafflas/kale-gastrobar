"use client";

import { motion } from "framer-motion";
import ReviewBox from "./ReviewBox";

const REVIEWS = [
  {
    id: "review-1",
    reviewSite: "Trip Advisor",
    reviewText:
      "Inassumong on the outside, GORGEOUS on the inside. I was dining alone and it was just stellar.",
    authorName: "Marie R.",
  },
  {
    id: "review-2",
    reviewSite: "Google",
    reviewText:
      "Inassumong on the outside, GORGEOUS on the inside. I was dining alone and it was just stellar.",
    authorName: "Marie R.",
  },
  {
    id: "review-3",
    reviewSite: "Yelp",
    reviewText:
      "The restaurant is very clean, food is amazing and servers very attentive. You will not regret eating here.",
    authorName: "Elizabeth M.",
  },
  {
    id: "review-4",
    reviewSite: "Reddit",
    reviewText:
      "I had some of the best Indian food around… Tandoori Chicken, Rogan Josh and samosa chaat — everything was incredible.",
    authorName: "Rahul S.",
  },
] as const;

const REVIEW_LOOP_COUNT = 3;

const LOOPED_REVIEWS = Array.from(
  { length: REVIEW_LOOP_COUNT },
  (_, loopIndex) =>
    REVIEWS.map((review) => ({
      ...review,
      id: `${review.id}-loop-${loopIndex}`,
    })),
).flat();

export default function ReviewsCarousel() {
  return (
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
      {LOOPED_REVIEWS.map((review) => (
        <div key={review.id} className="shrink-0">
          <ReviewBox
            reviewSite={review.reviewSite}
            reviewText={review.reviewText}
            authorName={review.authorName}
          />
        </div>
      ))}
    </motion.div>
  );
}
