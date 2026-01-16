import React from "react";

interface HeroTypographyProps {
  children: React.ReactNode;
  size?: 70 | 100 | 150 | 180;
  className?: string;
}

export default function HeroTypography({
  children,
  size = 150,
  className = "",
}: HeroTypographyProps) {
  const sizeStyles = {
    70: "text-[30px] md:text-[70px]",
    100: "text-[50px] md:text-[100px]",
    150: "text-[80px] md:text-[150px]",
    180: "text-[100px] md:text-[180px]",
  };

  return (
    <span
      className={`${sizeStyles[size]} font-vollkorn font-bold leading-none ${className}`}
      style={{
        color: "var(--color-cream)",
        WebkitTextStroke: "min(3px, 0.05em) var(--color-darkbrown)",
        paintOrder: "stroke fill",
      }}
    >
      {children}
    </span>
  );
}
