"use client";

import React from "react";
import HeroTypography from "../../shared/HeroTypography";
import Button from "../../shared/Button";
import { useReservation } from "../../../context/ReservationContext";

export default function CuisineContent() {
  const { openReservation } = useReservation();

  return (
    <div className="flex flex-col justify-center items-center">
      <HeroTypography
        size={80} // reduced from 100
        color="var(--color-cream)"
        stroke="var(--color-darkbrown)"
        className="pb-2 text-[50px] md:text-[80px]"
      >
        Our Cuisine
      </HeroTypography>
      <div className="space-y-4 md:space-y-6 px-2 flex flex-col justify-center items-center">
        <HeroTypography
          size={18} // reduced from 20
          color="var(--color-darkbrown)"
          stroke="var(--color-darkbrown)"
        >
          The Art of the Plate
        </HeroTypography>
        <p className="font-ubuntu text-center text-[13px] md:text-[15px] lg:text-[18px] text-darkbrown/80 leading-relaxed font-normal max-w-lg mx-auto">
          We believe excellence is found in the smallest details. From seasonal
          sourcing to the final garnish, our sharing plates are crafted with
          unwavering precision and served with impeccable care.
        </p>
      </div>
      <div className="pt-2 md:pt-4">
        <Button
          variant="primary"
          size="sm"
          className="rounded-full px-6 md:px-8"
          onClick={openReservation}
        >
          RESERVE NOW
        </Button>
      </div>
    </div>
  );
}
