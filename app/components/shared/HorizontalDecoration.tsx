"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroTypography from "./HeroTypography";

interface HorizontalDecorationProps {
  text: string;
  size?: 70 | 100 | 150 | 180;
  direction?: "left" | "right";
  speed?: number;
}

export default function HorizontalDecoration({
  text,
  size = 100,
  direction = "left",
  speed = 500,
}: HorizontalDecorationProps) {
  const { scrollYProgress } = useScroll();

  const xRange = direction === "left" ? [0, -speed] : [-speed, 0];
  const x = useTransform(scrollYProgress, [0, 1], xRange);

  const smoothX = useSpring(x, {
    damping: 20,
    restDelta: 0.001,
  });

  const REPEAT_COUNT = 6;

  return (
    <div className="w-full whitespace-nowrap">
      <motion.div style={{ x: smoothX }} className="flex gap-10 w-fit">
        {Array.from({ length: REPEAT_COUNT }, (_, i) => (
          <HeroTypography key={`decoration-${i}`} size={size}>
            {text}
          </HeroTypography>
        ))}
      </motion.div>
    </div>
  );
}
