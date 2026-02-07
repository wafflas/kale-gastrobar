"use client";

import HeroTypography from "../../shared/HeroTypography";

const TEXT_SIZE_CLASS =
  "!text-[3rem]  lg:!text-[5rem] xl:!text-[6rem] 2xl:!text-[clamp(3rem,7vw,6rem)]";

const TEXT_CLASS = `fortress-line font-vollkorn text-cream text-shadow-lg font-medium leading-relaxed ${TEXT_SIZE_CLASS} [text-shadow:0_4px_12px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.35)]`;

export default function FortressScroll() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
      <div className="w-full max-w-[90vw] md:max-w-[85vw] px-6 md:px-12 lg:px-16">
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
          <HeroTypography className={`${TEXT_CLASS} pl-0`}>Elevated</HeroTypography>
          <HeroTypography className={`${TEXT_CLASS} pl-4 md:pl-8 lg:pl-12`}>
            evenings
          </HeroTypography>
          <HeroTypography className={`${TEXT_CLASS} pl-8 md:pl-16 lg:pl-24`}>
            by the
          </HeroTypography>
          <HeroTypography className={`${TEXT_CLASS} pl-12 md:pl-24 lg:pl-36`}>
            fortress
          </HeroTypography>
          <HeroTypography className={`${TEXT_CLASS} pl-18 md:pl-36 lg:pl-54`}>
            walls
          </HeroTypography>
        </div>
      </div>
    </div>
  );
}
