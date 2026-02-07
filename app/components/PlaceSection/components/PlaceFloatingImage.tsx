"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

export interface PlaceImageConfig {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  aspectRatio: string;
  className?: string;
  centerX?: boolean;
  zIndex?: number;
}

interface PlaceFloatingImageProps {
  imageConfig: PlaceImageConfig;
  yTransform: MotionValue<number>;
  yTransformMobile: MotionValue<number>;
}

export default function PlaceFloatingImage({
  imageConfig,
  yTransform,
  yTransformMobile,
}: PlaceFloatingImageProps) {
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
        imageConfig.className,
        "z-0",
      ]
        .filter(Boolean)
        .join(" "),
    [imageConfig],
  );

  const y = isMobile ? yTransformMobile : yTransform;
  const motionStyle = imageConfig.centerX
    ? { x: "-50%" as const, y }
    : { y };
  const zStyle =
    imageConfig.zIndex != null ? { zIndex: imageConfig.zIndex } : undefined;
  const style = { ...motionStyle, ...zStyle };

  return (
    <motion.div
      style={style}
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
