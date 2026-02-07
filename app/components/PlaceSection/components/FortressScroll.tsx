"use client";

import HeroTypography from "../../shared/HeroTypography";

const TEXT_SIZE_CLASS =
  "!text-[2rem]  lg:!text-[4rem] xl:!text-[5rem] 2xl:!text-[clamp(3rem,7vw,6rem)]";

const TEXT_CLASS = `fortress-line font-vollkorn text-cream text-shadow-lg font-medium leading-relaxed ${TEXT_SIZE_CLASS} [text-shadow:0_4px_12px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.35)]`;

export default function FortressScroll() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Top left */}
      <HeroTypography className={`absolute top-8 left-8 md:top-12 md:left-12 ${TEXT_CLASS}`}>
        Elevated
      </HeroTypography>
      {/* Top right */}
      <HeroTypography className={`absolute top-8 right-8 md:top-12 md:right-12 ${TEXT_CLASS}`}>
        evenings
      </HeroTypography>
      {/* Center: by above the */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-3">
        <HeroTypography className={TEXT_CLASS}>by</HeroTypography>
        <HeroTypography className={TEXT_CLASS}>the</HeroTypography>
      </div>
      {/* Bottom left */}
      <HeroTypography className={`absolute bottom-8 left-8 md:bottom-12 md:left-12 ${TEXT_CLASS}`}>
        fortress
        </HeroTypography>
      {/* Bottom right */}
      <HeroTypography className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 ${TEXT_CLASS}`}>
        walls
      </HeroTypography>
    </div>
  );
}
