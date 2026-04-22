"use client";
interface HeroTypographyProps {
  children: React.ReactNode;
  size?: 20 | 70 | 100 | 130 | 150 | 180;
  className?: string;
  color?: string;
  stroke?: string;
  strokeWidth?: string;
}

const DEFAULT_STROKE_WIDTH = "min(3px, 0.03em)";

export default function HeroTypography({
  children,
  size = 150,
  className = "",
  color = "var(--color-cream)",
  stroke = "var(--color-darkbrown)",
  strokeWidth = DEFAULT_STROKE_WIDTH,
}: HeroTypographyProps) {
  const sizeStyles = {
    20: "text-[15px] md:text-[30px]",
    70: "text-[30px] md:text-[70px]",
    100: "text-[50px] md:text-[100px]",
    130: "text-[60px] md:text-[130px]",
    150: "text-[80px] md:text-[150px]",
    180: "text-[100px] md:text-[180px]",
  };

  const strokeValue = `${strokeWidth} ${stroke}`;

  const isOutlineOnly = color === "transparent" || color === "rgba(0,0,0,0)";

  return (
    <span
      className={`${sizeStyles[size]} font-vollkorn font-bold leading-none ${className}`}
      style={{
        color: color,
        WebkitTextStroke: strokeValue,
        paintOrder: "stroke fill",
        ...(isOutlineOnly && {
          WebkitFontSmoothing: "antialiased" as const,
          MozOsxFontSmoothing: "grayscale",
        }),
      }}
    >
      {children}
    </span>
  );
}
