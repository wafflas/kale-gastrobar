"use client";

import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroTypography from "./HeroTypography";

interface HorizontalDecorationProps {
  text: string;
  size?: 70 | 100 | 150 | 180;
  direction?: "left" | "right";
  speed?: number;
}

const REPEAT_COUNT = 6;

export default function HorizontalDecoration({
  text,
  size = 100,
  direction = "left",
  speed = 3000,
}: HorizontalDecorationProps) {
  const { scrollYProgress } = useScroll();

  const xRange = useMemo(
    () => (direction === "left" ? [0, -speed] : [-speed, 0]),
    [direction, speed],
  );
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  const decorationItems = useMemo(
    () =>
      Array.from({ length: REPEAT_COUNT }, (_, i) => (
        <HeroTypography key={`decoration-${i}`} size={size}>
          {text}
        </HeroTypography>
      )),
    [text, size],
  );

  return (
    <div className="w-full whitespace-nowrap">
      <motion.div style={{ x }} className="flex gap-10 w-fit">
        {decorationItems}
      </motion.div>
    </div>
  );
}
