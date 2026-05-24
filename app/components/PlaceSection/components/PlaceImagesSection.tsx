import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import HeroTypography from "../../shared/HeroTypography";
import PlaceFloatingImage, {
  type PlaceImageConfig,
} from "./PlaceFloatingImage";
import { useLanguage } from "../../../context/LanguageContext";

const SPRING_CONFIG = {
  stiffness: 110,
  damping: 28,
  restDelta: 0.001,
} as const;

const SCROLL_OFFSET = ["start end", "end start"] as const;

const TRANSFORM_RANGES: Record<
  "y1" | "y2" | "y3" | "y4" | "y5",
  [number, number]
> = {
  y1: [-22, 22],
  y2: [22, -22],
  y3: [26, -26],
  y4: [20, -20],
  y5: [-18, 18],
};

const PLACE_IMAGE_CONFIGS: PlaceImageConfig[] = [
  {
    src: "/images/PlaceSection/place1.webp",
    alt: "Kale Gastrobar interior",
    bottom: "bottom-[60%]",
    left: "left-[2%]",
    width: "w-[40%]",
    aspectRatio: "aspect-4/5",
    zIndex: 1,
  },
  {
    src: "/images/PlaceSection/place2.webp",
    alt: "Kale Gastrobar dining",
    bottom: "bottom-[60%]",
    right: "right-[10%]",
    width: "w-[40%]",
    aspectRatio: "aspect-3/5",
    zIndex: 2,
  },
  {
    src: "/images/PlaceSection/place6.webp",
    alt: "Kale Gastrobar terrace",
    top: "top-[50%]",
    right: "right-[60%]",
    width: "w-[55%]",
    aspectRatio: "aspect-4/3",
    zIndex: 4,
  },
  {
    src: "/images/PlaceSection/place4.webp",
    alt: "Kale Gastrobar detail",
    top: "top-[60%]",
    left: "left-[44%]",
    width: "w-[30%]",
    aspectRatio: "aspect-3/5",
    centerX: false,
    zIndex: 3,
  },
  {
    src: "/images/PlaceSection/place5.webp",
    alt: "Kale Gastrobar exterior",
    bottom: "bottom-[8%]",
    left: "left-[78%]",
    width: "w-[40%]",
    aspectRatio: "aspect-3/5",
    zIndex: 5,
  },
];

export default function PlaceImagesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: SCROLL_OFFSET as unknown as ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING_CONFIG);

  const y1 = useTransform(
    smoothProgress,
    [0, 1],
    [TRANSFORM_RANGES.y1[0], TRANSFORM_RANGES.y1[1]],
  );
  const y2 = useTransform(
    smoothProgress,
    [0, 1],
    [TRANSFORM_RANGES.y2[0], TRANSFORM_RANGES.y2[1]],
  );
  const y3 = useTransform(
    smoothProgress,
    [0, 1],
    [TRANSFORM_RANGES.y3[0], TRANSFORM_RANGES.y3[1]],
  );
  const y4 = useTransform(
    smoothProgress,
    [0, 1],
    [TRANSFORM_RANGES.y4[0], TRANSFORM_RANGES.y4[1]],
  );
  const y5 = useTransform(
    smoothProgress,
    [0, 1],
    [TRANSFORM_RANGES.y5[0], TRANSFORM_RANGES.y5[1]],
  );
  const yTransforms = [y1, y2, y3, y4, y5];

  return (
    <section
      id="place"
      ref={containerRef}
      className="relative w-full bg-cream overflow-hidden flex items-center justify-center px-4 my-16 md:my-30 sm:px-6 min-h-[65vh]"
    >
      <div
        ref={collageRef}
        className="relative w-full max-w-[1300px] aspect-square origin-center scale-100"
      >
        {PLACE_IMAGE_CONFIGS.map((imageConfig, index) => (
          <PlaceFloatingImage
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
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
        >
          <HeroTypography
            size={130}
            color="var(--color-cream)"
            stroke="var(--color-darkbrown)"
            strokeWidth="min(3px, 0.05em)"
            className="text-center tracking-wide text-[50px] md:text-[130px]"
          >
            {t("place.the_place")}
          </HeroTypography>
        </motion.div>
      </div>
    </section>
  );
}

