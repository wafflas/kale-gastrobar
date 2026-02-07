"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroTypography from "../../shared/HeroTypography";
import PlaceFloatingImage, {
  type PlaceImageConfig,
} from "./PlaceFloatingImage";

const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

const SCROLL_OFFSET = ["start end", "end start"];

const TRANSFORM_RANGES = {
  y1: [-28, 28] as const,
  y2: [28, -28] as const,
  y3: [36, -36] as const,
  y4: [32, -32] as const,
  y5: [-30, 30] as const,
} as const;

const MOBILE_TRANSFORM_RANGES = {
  y1: [-14, 14] as const,
  y2: [14, -14] as const,
  y3: [18, -18] as const,
  y4: [16, -16] as const,
  y5: [-15, 15] as const,
} as const;

const PLACE_IMAGE_CONFIGS: PlaceImageConfig[] = [
  {
    src: "/images/PlaceSection/place1.png",
    alt: "Kale Gastrobar interior",
    top: "top-[1%] lg:top-[2%]",
    left: "left-[-5%] lg:left-[4%]",
    width: "w-[42%] md:w-[36%] lg:w-[34%] xl:w-[32%]",
    aspectRatio: "aspect-4/5",
    zIndex: 1,
  },
  {
    src: "/images/PlaceSection/place2.png",
    alt: "Kale Gastrobar dining",
    top: "top-[2%] lg:top-[-4%]",
    right: "right-[-6%] lg:right-[16%]",
    width: "w-[36%] md:w-[30%] lg:w-[28%] xl:w-[26%]",
    aspectRatio: "aspect-3/5",
    zIndex: 2,
  },
  {
    src: "/images/PlaceSection/place3.png",
    alt: "Kale Gastrobar terrace",
    bottom: "bottom-[19%] lg:bottom-[20%]",
    left: "left-[-5%] lg:left-[2%]",
    width: "w-[44%] md:w-[38%] lg:w-[36%] xl:w-[32%]",
    aspectRatio: "aspect-4/3",
    zIndex: 4,
  },
  {
    src: "/images/PlaceSection/place4.png", 
    alt: "Kale Gastrobar detail",
    bottom: "bottom-[-3%] lg:bottom-[6%]",
    left: "left-1/2",
    width: "w-[28%] md:w-[24%] lg:w-[23%]",
    aspectRatio: "aspect-3/5",
    centerX: true,
    zIndex: 3,
  },
  {
    src: "/images/PlaceSection/place5.png",
    alt: "Kale Gastrobar exterior",
    bottom: "bottom-[6%] lg:bottom-[16%]",
    right: "right-[-7%] md:right-[-3%] lg:right-[2%]",
    width: "w-[34%] md:w-[30%] lg:w-[23%]",
    aspectRatio: "aspect-3/5",
    zIndex: 5,
  },
];

export default function PlaceImagesSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET as ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  const y1 = useTransform(smoothProgress, [0, 1], TRANSFORM_RANGES.y1 as [number, number]);
  const y2 = useTransform(smoothProgress, [0, 1], TRANSFORM_RANGES.y2 as [number, number]);
  const y3 = useTransform(smoothProgress, [0, 1], TRANSFORM_RANGES.y3 as [number, number]);
  const y4 = useTransform(smoothProgress, [0, 1], TRANSFORM_RANGES.y4 as [number, number]);
  const y5 = useTransform(smoothProgress, [0, 1], TRANSFORM_RANGES.y5 as [number, number]);

  const y1M = useTransform(smoothProgress, [0, 1], MOBILE_TRANSFORM_RANGES.y1 as [number, number]);
  const y2M = useTransform(smoothProgress, [0, 1], MOBILE_TRANSFORM_RANGES.y2 as [number, number]);
  const y3M = useTransform(smoothProgress, [0, 1], MOBILE_TRANSFORM_RANGES.y3 as [number, number]);
  const y4M = useTransform(smoothProgress, [0, 1], MOBILE_TRANSFORM_RANGES.y4 as [number, number]);
  const y5M = useTransform(smoothProgress, [0, 1], MOBILE_TRANSFORM_RANGES.y5 as [number, number]);

  const yTransforms = [y1, y2, y3, y4, y5];
  const yTransformsMobile = [y1M, y2M, y3M, y4M, y5M];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] lg:min-h-[160vh] w-full bg-cream overflow-hidden flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-6 lg:py-24 my-20"
    >
      {PLACE_IMAGE_CONFIGS.map((imageConfig, index) => (
        <PlaceFloatingImage
          key={imageConfig.src}
          imageConfig={imageConfig}
          yTransform={yTransforms[index]}
          yTransformMobile={yTransformsMobile[index]}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center text-center pointer-events-none"
      >
        <HeroTypography
          size={130}
          color="var(--color-cream)"
          stroke="var(--color-darkbrown)"
          strokeWidth="min(3px, 0.05em)"
          className="text-center tracking-wide"
        >
          The place
        </HeroTypography>
      </motion.div>
    </section>
  );
}
