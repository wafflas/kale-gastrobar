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
import { useRef, useMemo } from "react";
import { useReservation } from "../../context/ReservationContext";

// Animation constants
const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

const SCROLL_OFFSET = ["start end", "end start"];

// Transform ranges for desktop
const TRANSFORM_RANGES: Record<"y1" | "y2" | "y3" | "y4", [number, number]> = {
  y1: [-40, 40],
  y2: [40, -40],
  y3: [60, -60],
  y4: [-32, 32],
};

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
    src: "/images/IntroSection/intro1.webp",
    alt: "Kale Gastrobar interior view",
    bottom:
      "bottom-[70%] sm:bottom-[70%] md:bottom-[62%] lg:bottom-[56%] xl:bottom-[50%]",
    right:
      "right-[70%] sm:right-[70%] md:right-[82%] lg:right-[70%] xl:right-[92%]",
    width: "w-[36%] sm:w-[40%] md:w-[41%] lg:w-[41%] xl:w-[42%]",
    aspectRatio: "aspect-4/5",
  },
  {
    src: "/images/IntroSection/intro2.webp",
    alt: "Kale Gastrobar dining experience",
    bottom:
      "bottom-[67%] sm:bottom-[67%] md:bottom-[60%] lg:bottom-[55%] xl:bottom-[50%]",
    left: "left-[78%] sm:left-[78%] md:left-[86%] lg:left-[91%] xl:left-[95%]",
    width: "w-[28%] sm:w-[31%] md:w-[33%] lg:w-[34%] xl:w-[35%]",
    aspectRatio: "aspect-3/5",
  },
  {
    src: "/images/IntroSection/intro3.webp",
    alt: "Kale Gastrobar atmosphere",
    top: "top-[72%] sm:top-[70%] md:top-[69%] lg:top-[68%] xl:top-[67%]",
    right:
      "right-[70%] sm:right-[70%] md:right-[80%] lg:right-[85%] xl:right-[90%]",
    width: "w-[28%] sm:w-[31%] md:w-[33%] lg:w-[34%] xl:w-[35%]",
    aspectRatio: "aspect-4/5",
  },
  {
    src: "/images/IntroSection/intro4.webp",
    alt: "Kale Gastrobar culinary presentation",
    top: "top-[82%] sm:top-[80%] md:top-[79%] lg:top-[78%] xl:top-[77%]",
    left: "left-[70%] sm:left-[70%] md:left-[75%] lg:left-[78%] xl:left-[80%]",
    width: "w-[32%] sm:w-[36%] md:w-[38%] lg:w-[39%] xl:w-[40%]",
    aspectRatio: "aspect-4/3",
  },
];

interface FloatingImageProps {
  imageConfig: ImageConfig;
  yTransform: MotionValue<number>;
}

function FloatingImage({ imageConfig, yTransform }: FloatingImageProps) {
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
    <motion.div style={{ y: yTransform }} className={classes}>
      <Image
        src={imageConfig.src}
        alt={imageConfig.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 55vw, (max-width: 1024px) 35vw, 28vw"
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

  const yTransforms = [y1, y2, y3, y4];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-cream overflow-hidden flex items-center justify-center py-14 px-4 sm:py-20 sm:px-6 lg:py-28 my-10 min-h-[65vh]"
    >
      <div className="relative w-full max-w-[1300px] aspect-square">
        {IMAGE_CONFIGS.map((imageConfig, index) => (
          <FloatingImage
            key={imageConfig.src}
            imageConfig={imageConfig}
            yTransform={yTransforms[index]}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8"
        >
          <div className="w-full max-w-[clamp(18.5rem,40vw,48rem)]">
            <div className="mb-2">
              <Logo useImage={true} imageSrc="/logos/logo2.png" size="xs" />
            </div>

            <motion.h2
              initial={{ filter: "blur(12px)", opacity: 0 }}
              whileInView={{ filter: "blur(0px)", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-vollkorn text-[clamp(28px,4.2vw,100px)] text-darkbrown leading-[1.08] font-medium"
            >
              Where every bite <br className="hidden md:block" /> tells a story.
            </motion.h2>

            <div className="mt-[clamp(14px,2.2vw,40px)] space-y-[clamp(10px,1.6vw,32px)]">
              <p className="font-ubuntu text-[clamp(15px,1.6vw,35px)] text-darkbrown leading-tight font-light">
                Bold flavours, unhurried moments.
              </p>
              <p className="font-ubuntu text-[clamp(12px,1.1vw,22px)] text-darkbrown/80 leading-relaxed font-normal max-w-[clamp(22rem,40vw,32rem)] mx-auto">
                We craft dishes that linger on the palate and conversations that
                linger at the table. No rush, no rules, just honest cooking,
                good wine, and the kind of evening you don&apos;t want to{" "}
                <span className="font-bold text-darkbrown">end.</span>
              </p>
            </div>

            <div className="pt-[clamp(16px,2.4vw,44px)]">
              <Button
                variant="primary"
                size="md"
                className="bg-darkbrown! text-cream! rounded-full px-[clamp(28px,4vw,44px)] py-[clamp(10px,1.4vw,14px)] text-[clamp(12px,1.1vw,16px)]"
                onClick={openReservation}
              >
                RESERVE NOW
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
