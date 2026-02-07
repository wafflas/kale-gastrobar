"use client";

import Image from "next/image";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { useReservation } from "../../context/ReservationContext";

// Animation constants
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

const SCROLL_OFFSET = ["start end", "end start"];

// Transform ranges for desktop
const TRANSFORM_RANGES = {
  y1: [-50, 50] as const, // Moves up
  y2: [50, -50] as const, // Moves down
  y3: [75, -75] as const, // Moves up faster
  y4: [-40, 40] as const, // Moves down slower
} as const;

// Transform ranges for mobile
const MOBILE_TRANSFORM_RANGES = {
  y1: [-20, 20] as const, // Moves up (reduced)
  y2: [20, -20] as const, // Moves down (reduced)
  y3: [30, -30] as const, // Moves up faster (reduced)
  y4: [-16, 16] as const, // Moves down slower (reduced)
} as const;

// Image configuration
interface ImageConfig {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  aspectRatio: string;
}

const IMAGE_CONFIGS: ImageConfig[] = [
  {
    src: "/images/IntroSection/intro1.png",
    alt: "Kale Gastrobar interior view",
    top: "top-[3%] xl:top-[-10%]",
    left: "left-[-5%] lg:left-[-1%]",
    width: "w-[42%] md:w-[30%] lg:w-[35%] xl:w-[28%]",
    aspectRatio: "aspect-4/5",
  },
  {
    src: "/images/IntroSection/intro2.png",
    alt: "Kale Gastrobar dining experience",
    top: "top-[6%] xl:top-[8%]",
    right: "right-[-8%] lg:right-[-2%]",
    width: "w-[35%] md:w-[25%] lg:w-[23%] xl:w-[25%]",
    aspectRatio: "aspect-3/5",
  },
  {
    src: "/images/IntroSection/intro3.png",
    alt: "Kale Gastrobar atmosphere",
    bottom: "bottom-[5%] xl:bottom-[10%]",
    left: "left-[-4%] lg:left-[3%]",
    width: "w-[35%] md:w-[25%] lg:w-[30%] xl:w-[22%]",
    aspectRatio: "aspect-4/5",
  },
  {
    src: "/images/IntroSection/intro4.png",
    alt: "Kale Gastrobar culinary presentation",
    bottom: "bottom-[4%] xl:bottom-[5%]",
    right: "right-[-10%] md:right-[-8%] lg:right-[8%]",
    width: "w-[50%] md:w-[35%] lg:w-[30%] xl:w-[26%]",
    aspectRatio: "aspect-4/3",
  },
];

interface FloatingImageProps {
  imageConfig: ImageConfig;
  yTransform: MotionValue<number>;
  yTransformMobile: MotionValue<number>;
}

function FloatingImage({
  imageConfig,
  yTransform,
  yTransformMobile,
}: FloatingImageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const listener = () => setIsMobile(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const classes = useMemo(
    () =>
      [
        "absolute",
        imageConfig.top,
        imageConfig.left,
        imageConfig.right,
        imageConfig.bottom,
        imageConfig.width,
        imageConfig.aspectRatio,
        "z-0",
      ]
        .filter(Boolean)
        .join(" "),
    [imageConfig],
  );

  return (
    <motion.div
      style={{ y: isMobile ? yTransformMobile : yTransform }}
      className={classes}
    >
      <Image
        src={imageConfig.src}
        alt={imageConfig.alt}
        fill
        className="object-cover"
      />
    </motion.div>
  );
}

export default function IntroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { openReservation } = useReservation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET as ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  // Desktop transforms (full parallax effect)
  const y1 = useTransform(
    smoothProgress,
    [0, 1],
    TRANSFORM_RANGES.y1 as [number, number],
  );
  const y2 = useTransform(
    smoothProgress,
    [0, 1],
    TRANSFORM_RANGES.y2 as [number, number],
  );
  const y3 = useTransform(
    smoothProgress,
    [0, 1],
    TRANSFORM_RANGES.y3 as [number, number],
  );
  const y4 = useTransform(
    smoothProgress,
    [0, 1],
    TRANSFORM_RANGES.y4 as [number, number],
  );

  // Mobile transforms (reduced parallax effect)
  const y1Mobile = useTransform(
    smoothProgress,
    [0, 1],
    MOBILE_TRANSFORM_RANGES.y1 as [number, number],
  );
  const y2Mobile = useTransform(
    smoothProgress,
    [0, 1],
    MOBILE_TRANSFORM_RANGES.y2 as [number, number],
  );
  const y3Mobile = useTransform(
    smoothProgress,
    [0, 1],
    MOBILE_TRANSFORM_RANGES.y3 as [number, number],
  );
  const y4Mobile = useTransform(
    smoothProgress,
    [0, 1],
    MOBILE_TRANSFORM_RANGES.y4 as [number, number],
  );

  const yTransforms = [y1, y2, y3, y4];
  const yTransformsMobile = [y1Mobile, y2Mobile, y3Mobile, y4Mobile];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-[160vh] w-full bg-cream overflow-hidden flex flex-col items-center justify-center py-12 px-4 md:py-32 md:px-6 lg:py-72 my-10"
    >
      {IMAGE_CONFIGS.map((imageConfig, index) => (
        <FloatingImage
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
        className="relative z-10 flex flex-col items-center text-center max-w-[85%] md:max-w-2xl lg:max-w-3xl space-y-4 md:space-y-10"
      >
        <div className="mb-2">
          <Logo useImage={true} imageSrc="/logo2.png" size="xs" />
        </div>

        <motion.h2
          initial={{ filter: "blur(12px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-vollkorn text-[34px] md:text-[80px] lg:text-[100px] text-darkbrown leading-[1.1] font-medium"
        >
          A place to find <br className="hidden md:block" /> again.
        </motion.h2>

        <div className="space-y-3 md:space-y-8 px-2">
          <p className="font-ubuntu text-[16px] md:text-[30px] lg:text-[35px] text-darkbrown leading-tight font-light">
            We are hosts out of conviction.
          </p>
          <p className="font-ubuntu text-[13px] md:text-[18px] lg:text-[22px] text-darkbrown/80 leading-relaxed font-normal max-w-lg mx-auto">
            People who believe in good food and what it can trigger. We serve
            attentively, personally and with an open eye for the essentials:{" "}
            <span className="font-bold text-darkbrown">you.</span>
          </p>
        </div>

        <div className="pt-2 md:pt-4">
          <Button
            variant="primary"
            size="md"
            className="bg-darkbrown! text-cream! rounded-full px-8 md:px-10"
            onClick={openReservation}
          >
            RESERVE NOW
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
