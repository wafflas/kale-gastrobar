import { useMemo } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { useReservation } from "../../context/ReservationContext";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../shared/Button";
import HeroTypography from "../shared/HeroTypography";
import EmblaCarousel, { MenuGalleryItem } from "./components/EmblaCarousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
  dragFree: false,
};

function MenuSection() {
  const { openReservation } = useReservation();
  const { language, t } = useLanguage();

  const galleryItems = useMemo(
    (): MenuGalleryItem[] => [
      {
        src: "/images/MenuSection/menu1.webp",
        alt: t("menu.items.truffle_risotto.description"),
        title: t("menu.items.truffle_risotto.title"),
      },
      {
        src: "/images/MenuSection/menu2.webp",
        alt: t("menu.items.glazed_chicken.description"),
        title: t("menu.items.glazed_chicken.title"),
      },
      {
        src: "/images/MenuSection/menu3.webp",
        alt: t("menu.items.pappardelle_ragu.description"),
        title: t("menu.items.pappardelle_ragu.title"),
      },
      {
        src: "/images/MenuSection/menu4.webp",
        alt: t("menu.items.shrimp_ceviche.description"),
        title: t("menu.items.shrimp_ceviche.title"),
      },
      {
        src: "/images/MenuSection/menu5.webp",
        alt: t("menu.items.prawn_fregola.description"),
        title: t("menu.items.prawn_fregola.title"),
      },
    ],
    [language, t],
  );

  return (
    <section
      id="menu"
      className="relative w-full bg-darkbrown overflow-hidden px-4 sm:px-6 lg:px-10 py-14 sm:py-18 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1540px]">
        <header className="max-w-5xl mx-auto text-center">
          <HeroTypography size={100} className="text-cream">
            {t("menu.title")}
          </HeroTypography>
          <p className="mt-4 font-ubuntu text-[clamp(13px,1.2vw,15px)] leading-relaxed text-cream/70">
            {t("menu.description")}
          </p>
        </header>

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <EmblaCarousel slides={galleryItems} options={CAROUSEL_OPTIONS} />

          <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col gap-4 sm:flex-row items-center justify-center">
            <Link href="/menu">
              <Button
                variant="outline"
                size="md"
                className="w-[200px] md:w-[300px] rounded-full py-2 text-[12px] tracking-[0.18em] flex justify-center items-center gap-2"
              >
                {t("menu.see_menu")} <ArrowRight size={13} />
              </Button>
            </Link>
            <Button
              variant="secondary"
              size="md"
              className="w-[200px] md:w-[300px] rounded-full py-2 text-[12px] tracking-[0.18em]"
              onClick={openReservation}
            >
              {t("menu.reserve_now")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
