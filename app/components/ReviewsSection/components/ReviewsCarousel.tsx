"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import ReviewBox from "./ReviewBox";
import { useLanguage } from "../../../context/LanguageContext";

const REVIEW_LOOP_COUNT = 3;

export default function ReviewsCarousel() {
  const { language, t } = useLanguage();

  const reviews = useMemo(() => [
    {
      id: "review-1",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_sonia"),
      authorName: t("reviews.author_sonia"),
    },
    {
      id: "review-2",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_eleni"),
      authorName: t("reviews.author_eleni"),
    },
    {
      id: "review-3",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_nomi"),
      authorName: t("reviews.author_nomi"),
    },
    {
      id: "review-4",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_tonii"),
      authorName: t("reviews.author_tonii"),
    },
    {
      id: "review-5",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_milly"),
      authorName: t("reviews.author_milly"),
    },
    {
      id: "review-6",
      reviewSite: t("reviews.site_google"),
      reviewText: t("reviews.review_anne_maree"),
      authorName: t("reviews.author_anne_maree"),
    },
  ], [language, t]);

  const loopedReviews = useMemo(() => Array.from(
    { length: REVIEW_LOOP_COUNT },
    (_, loopIndex) =>
      reviews.map((review) => ({
        ...review,
        id: `${review.id}-loop-${loopIndex}`,
      })),
  ).flat(), [reviews]);

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
      {loopedReviews.map((review) => (
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

