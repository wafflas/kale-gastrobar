"use client";

import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { useMemo } from "react";

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
  sizes?: string;
  priority?: boolean;
}

interface PlaceFloatingImageProps {
  imageConfig: PlaceImageConfig;
  yTransform?: MotionValue<number>;
}

export default function PlaceFloatingImage({
  imageConfig,
  yTransform,
}: PlaceFloatingImageProps) {
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

  const zStyle =
    imageConfig.zIndex != null ? { zIndex: imageConfig.zIndex } : undefined;

  const motionStyle =
    imageConfig.centerX && yTransform
      ? { x: "-50%" as const, y: yTransform }
      : imageConfig.centerX
        ? ({ transform: "translateX(-50%)" } as const)
        : yTransform
          ? { y: yTransform }
          : undefined;

  const style = motionStyle ? { ...motionStyle, ...zStyle } : zStyle;

  return (
    <motion.div style={style} className={classes}>
      <Image
        src={imageConfig.src}
        alt={imageConfig.alt}
        fill
        className="object-cover"
        sizes={
          imageConfig.sizes ??
          "(max-width: 640px) 55vw, (max-width: 1024px) 32vw, 22vw"
        }
        priority={imageConfig.priority}
      />
    </motion.div>
  );
}
