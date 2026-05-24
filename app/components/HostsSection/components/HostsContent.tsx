"use client";

import React from "react";

import HeroTypography from "../../shared/HeroTypography";
import { useLanguage } from "../../../context/LanguageContext";

export default function HostsContent() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6">
      <HeroTypography
        size={110}
        color="var(--color-cream)"
        stroke="var(--color-darkbrown)"
        className="pb-4 text-center leading-tight tracking-tight"
      >
        {t("hosts.title")}
      </HeroTypography>
      <div className="space-y-4 md:space-y-6 px-4 sm:px-6 md:px-8 max-w-2xl flex flex-col justify-center items-center">
        <p className="font-ubuntu text-center text-[13px] md:text-[15px] lg:text-[17px] text-darkbrown/80 leading-relaxed font-normal mx-auto">
          {t("hosts.description")}
        </p>
      </div>
    </div>
  );
}
