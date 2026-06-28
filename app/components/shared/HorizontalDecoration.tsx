"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroTypography from "./HeroTypography";

interface HorizontalDecorationProps {
  text: string;
  size?: 20 | 70 | 100 | 110 | 130 | 150 | 180;
  direction?: "left" | "right";
  speed?: number;
}

const REPEAT_COUNT = 6;

export default function HorizontalDecoration({
  text,
  size = 100,
  direction = "left",
  speed = 280,
}: HorizontalDecorationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 34,
    restDelta: 0.001,
  });

  // Map scroll progress to a delicate horizontal parallax offset
  const xRange = useMemo(
    () => (direction === "left" ? [0, -speed] : [-speed, 0]),
    [direction, speed],
  );

  const x = useTransform(smoothProgress, [0, 1], xRange);

  const decorationItems = useMemo(
    () =>
      Array.from({ length: REPEAT_COUNT }, (_, i) => (
        <HeroTypography
          key={`decoration-${i}`}
          size={size}
          className="will-change-transform opacity-95 transition-opacity duration-300 hover:opacity-100"
        >
          {text}
        </HeroTypography>
      )),
    [text, size],
  );

  return (
    <div
      ref={containerRef}
      className="w-full whitespace-nowrap overflow-hidden select-none"
    >
      <motion.div
        style={{ x }}
        className="flex gap-10 w-fit will-change-transform"
      >
        {decorationItems}
      </motion.div>
    </div>
  );
}
