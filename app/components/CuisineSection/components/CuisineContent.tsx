import React from "react";
import HeroTypography from "../../shared/HeroTypography";
import Button from "../../shared/Button";
import { useReservation } from "../../../context/ReservationContext";

export default function CuisineContent() {
  const { openReservation } = useReservation();

  return (
    <div className="flex flex-col justify-center items-center">
      <HeroTypography
        size={100}
        color="var(--color-darkbrown)"
        stroke="var(--color-cream)"
        className="pb-2"
      >
        Our Cuisine
      </HeroTypography>
      <div className="space-y-5 md:space-y-8 px-2 flex flex-col justify-center items-center">
        <HeroTypography
          size={20}
          color="var(--color-cream)"
          stroke="var(--color-darkbrown)"
        >
          The art of the plate
        </HeroTypography>
        <p className="font-ubuntu text-center text-[13px] md:text-[18px] lg:text-[22px] text-cream/80 leading-relaxed font-normal max-w-lg mx-auto">
          We believe excellence is found in the smallest details. From seasonal
          sourcing to the final garnish, our sharing plates are crafted with
          unwavering precision and served with impeccable care.
        </p>
      </div>
      <div className="pt-2 md:pt-5">
        <Button
          variant="secondary"
          size="md"
          className=" rounded-full px-8 md:px-10"
          onClick={openReservation}
        >
          RESERVE NOW
        </Button>
      </div>
    </div>
  );
}
