"use client";

import Image from "next/image";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, useMemo } from "react";

// Animation constants
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

const SCROLL_OFFSET = ["start end", "end start"];

// Transform ranges for parallax effect
const TRANSFORM_RANGES = {
  y1: [-50, 50] as const, // Moves up
  y2: [50, -50] as const, // Moves down
  y3: [75, -75] as const, // Moves up faster
  y4: [-40, 40] as const, // Moves down slower
} as const;

// Image configuration
interface ImageConfig {
  src: string;
  alt: string;
  desktop: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: string;
    aspectRatio: string;
  };
  mobile: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width: string;
    aspectRatio: string;
  };
}

const IMAGE_CONFIGS: ImageConfig[] = [
  {
    src: "/images/IntroSection/intro1.png",
    alt: "Kale Gastrobar interior view",
    desktop: {
      top: "top-[-10%]",
      left: "left-[-1%]",
      width: "w-[22%] xl:w-[28%]",
      aspectRatio: "aspect-4/5",
    },
    mobile: {
      top: "top-[5%]",
      left: "left-[-5%]",
      width: "w-[42%]",
      aspectRatio: "aspect-4/5",
    },
  },
  {
    src: "/images/IntroSection/intro2.png",
    alt: "Kale Gastrobar dining experience",
    desktop: {
      top: "top-[8%]",
      right: "right-[-2%]",
      width: "w-[20%] xl:w-[25%]",
      aspectRatio: "aspect-3/5",
    },
    mobile: {
      top: "top-[14%]",
      right: "right-[-8%]",
      width: "w-[35%]",
      aspectRatio: "aspect-3/5",
    },
  },
  {
    src: "/images/IntroSection/intro3.png",
    alt: "Kale Gastrobar atmosphere",
    desktop: {
      bottom: "bottom-[10%]",
      left: "left-[3%]",
      width: "w-[18%] xl:w-[22%]",
      aspectRatio: "aspect-4/5",
    },
    mobile: {
      bottom: "bottom-[10%]",
      left: "left-[-4%]",
      width: "w-[35%]",
      aspectRatio: "aspect-4/5",
    },
  },
  {
    src: "/images/IntroSection/intro4.png",
    alt: "Kale Gastrobar culinary presentation",
    desktop: {
      bottom: "bottom-[5%]",
      right: "right-[8%]",
      width: "w-[22%] xl:w-[26%]",
      aspectRatio: "aspect-4/3",
    },
    mobile: {
      bottom: "bottom-[4%]",
      right: "right-[-10%]",
      width: "w-[50%]",
      aspectRatio: "aspect-4/3",
    },
  },
];

interface FloatingImageProps {
  imageConfig: ImageConfig;
  yTransform: MotionValue<number>;
}

function FloatingImage({ imageConfig, yTransform }: FloatingImageProps) {
  const desktopClasses = useMemo(
    () =>
      [
        "hidden lg:block absolute",
        imageConfig.desktop.top,
        imageConfig.desktop.left,
        imageConfig.desktop.right,
        imageConfig.desktop.bottom,
        imageConfig.desktop.width,
        imageConfig.desktop.aspectRatio,
        "z-0",
      ]
        .filter(Boolean)
        .join(" "),
    [imageConfig.desktop]
  );

  const mobileClasses = useMemo(
    () =>
      [
        "lg:hidden absolute",
        imageConfig.mobile.top,
        imageConfig.mobile.left,
        imageConfig.mobile.right,
        imageConfig.mobile.bottom,
        imageConfig.mobile.width,
        imageConfig.mobile.aspectRatio,
        "z-0",
      ]
        .filter(Boolean)
        .join(" "),
    [imageConfig.mobile]
  );

  return (
    <>
      <motion.div style={{ y: yTransform }} className={desktopClasses}>
        <Image
          src={imageConfig.src}
          alt={imageConfig.alt}
          fill
          className="object-cover"
        />
      </motion.div>
      <motion.div style={{ y: yTransform }} className={mobileClasses}>
        <Image
          src={imageConfig.src}
          alt={imageConfig.alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </>
  );
}

export default function IntroSection() {
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

  const yTransforms = [y1, y2, y3, y4];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-[160vh] w-full bg-cream overflow-hidden flex flex-col items-center justify-center py-12 px-4 md:py-32 md:px-6 lg:py-72 my-10"
    >
      {/* Floating Images */}
      {IMAGE_CONFIGS.map((imageConfig, index) => (
        <FloatingImage
          key={imageConfig.src}
          imageConfig={imageConfig}
          yTransform={yTransforms[index]}
        />
      ))}

      {/* --- CENTER CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-[85%] md:max-w-2xl lg:max-w-3xl space-y-4 md:space-y-10"
      >
        <div className="mb-2">
          <Logo useImage={true} imageSrc="/logo2.png" size="xs" />
        </div>
        
        <h2 className="font-vollkorn text-[34px] md:text-[80px] lg:text-[100px] text-darkbrown leading-[1.1] font-medium">
          A place to find <br className="hidden md:block" /> again.
        </h2>

        <div className="space-y-3 md:space-y-8 px-2">
          <p className="font-ubuntu text-[16px] md:text-[30px] lg:text-[35px] text-darkbrown leading-tight font-light">
            We are hosts out of conviction.
          </p>
          <p className="font-ubuntu text-[13px] md:text-[18px] lg:text-[22px] text-darkbrown/80 leading-relaxed font-normal max-w-lg mx-auto">
            People who believe in good food and what it can trigger. We serve attentively, personally and with an open eye for the essentials: <span className="font-bold text-darkbrown">you.</span>
          </p>
        </div>

        <div className="pt-2 md:pt-4">
          <Button variant="primary" size="md" className="bg-darkbrown! text-cream! rounded-full px-8 md:px-10">
            RESERVE NOW
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
