"use client";

import { useMemo } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { useReservation } from "../../context/ReservationContext";
import Button from "../shared/Button";
import HeroTypography from "../shared/HeroTypography";
import EmblaCarousel, { MenuGalleryItem } from "./components/EmblaCarousel";
import { ArrowRight } from "lucide-react";

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
  dragFree: false,
};

function MenuSection() {
  const { openReservation } = useReservation();

  const galleryItems = useMemo(
    (): MenuGalleryItem[] => [
      {
        src: "/images/MenuSection/menu1.webp",
        alt: "Creamy risotto with crispy shallots and roasted tomato",
        title: "Truffle Risotto",
      },
      {
        src: "/images/MenuSection/menu2.webp",
        alt: "Glazed chicken breast with jus and roasted garnish",
        title: "Glazed Chicken",
      },
      {
        src: "/images/MenuSection/menu3.webp",
        alt: "Pappardelle with slow-cooked ragù and stracciatella",
        title: "Pappardelle Ragù",
      },
      {
        src: "/images/MenuSection/menu4.webp",
        alt: "Shrimp ceviche with burrata and crostini",
        title: "Shrimp Ceviche",
      },
      {
        src: "/images/MenuSection/menu5.webp",
        alt: "Prawn fregola with herbs and cocktail",
        title: "Prawn Fregola",
      },
    ],
    [],
  );

  return (
    <section
      id="menu"
      className="relative w-full bg-darkbrown overflow-hidden px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1540px]">
        <header className="max-w-5xl mx-auto text-center">
          <HeroTypography size={100} className="text-cream">
            Our Menu
          </HeroTypography>
          <p className="mt-4 font-ubuntu text-[clamp(13px,1.2vw,15px)] leading-relaxed text-cream/70">
            At Kalè Gastrobar, every plate is a celebration of bold flavors and
            seasonal ingredients. Our menu fuses Mediterranean roots with modern
            culinary craft designed to be shared, savored, and remembered.
          </p>
        </header>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <EmblaCarousel slides={galleryItems} options={CAROUSEL_OPTIONS} />

          <div className="mt-8 flex flex-col gap-4 md:flex-row items-center justify-center">
            <Button
              variant="outline"
              size="md"
              className="rounded-full px-10 py-2 text-[12px] tracking-[0.18em] flex justify-center items-center gap-2"
            >
              SEE MENU <ArrowRight size={13} />
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="rounded-full px-10 py-2 text-[12px] tracking-[0.18em]"
              onClick={openReservation}
            >
              RESERVE NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
