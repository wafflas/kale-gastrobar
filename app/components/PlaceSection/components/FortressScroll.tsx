"use client";

import HeroTypography from "../../shared/HeroTypography";

const TEXT_SIZE_CLASS = "!text-[clamp(2.6rem,4.5vw,6rem)]";

const TEXT_CLASS = `fortress-line font-vollkorn opacity-60 text-shadow-lg font-medium leading-none tracking-tight ${TEXT_SIZE_CLASS} [text-shadow:0_4px_12px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.35)]`;

export default function FortressScroll() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none flex items-center justify-center">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-y-[clamp(0.2rem,0.9vw,0.85rem)] text-center">
            <div className="flex items-center justify-center gap-x-[clamp(0.45rem,1.2vw,1.1rem)] whitespace-nowrap">
              <HeroTypography className={TEXT_CLASS}>Elevated</HeroTypography>
              <HeroTypography className={TEXT_CLASS}>evenings</HeroTypography>
            </div>
            <div className="flex items-center justify-center gap-x-[clamp(0.45rem,1.2vw,1.1rem)] whitespace-nowrap">
              <HeroTypography className={TEXT_CLASS}>by</HeroTypography>
              <HeroTypography className={TEXT_CLASS}>the</HeroTypography>
              <HeroTypography className={TEXT_CLASS}>fortress</HeroTypography>
              <HeroTypography className={TEXT_CLASS}>walls</HeroTypography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
