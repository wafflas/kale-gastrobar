"use client";

import Header from "../../components/LandingSection/components/Header";

import Footer from "../../components/FooterSection/Footer";
import Button from "../../components/shared/Button";
import { useReservation } from "../../context/ReservationContext";
import { useLanguage } from "../../context/LanguageContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MenuPage() {
  const { openReservation } = useReservation();
  const { t } = useLanguage();

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-cream overflow-x-hidden pt-28">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 max-w-3xl mx-auto w-full text-center">
        <p className="font-ubuntu text-xs md:text-sm tracking-[0.25em] uppercase text-darkbrown/60 mb-3 animate-fadeIn">
          {t("menu.the_menu")}
        </p>

        <h1 className="font-vollkorn text-[clamp(48px,7.5vw,96px)] leading-tight text-darkbrown font-medium tracking-tight mb-4 animate-fadeInScale">
          {t("menu.coming_soon")}
        </h1>

        <div className="w-12 h-[1px] bg-darkbrown/20 my-6" />

        <p className="font-ubuntu text-sm md:text-base tracking-[0.2em] uppercase text-darkbrown/85 mb-14 max-w-lg leading-relaxed animate-fadeIn">
          {t("menu.symphony")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full animate-fadeIn">
          <Button
            variant="primary"
            size="md"
            className="rounded-full px-10 py-2 text-[12px] tracking-[0.18em] w-full sm:w-auto"
            onClick={openReservation}
          >
            {t("menu.reserve_table")}
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              className="rounded-full flex flex-row items-center justify-center gap-2 px-10 py-2 text-[12px] tracking-[0.18em] w-full sm:w-auto !border-darkbrown/20 border-2"
            >
              <ArrowLeft className="flex" size={13} />
              {t("menu.return_home")}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

