"use client";

import Logo from "../shared/Logo";

import Button from "../shared/Button";
import InfoTable from "./components/InfoTable";
import { useReservation } from "../../context/ReservationContext";
import { useLanguage } from "../../context/LanguageContext";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { openReservation } = useReservation();
  const { t } = useLanguage();

  return (
    <footer className="bg-darkbrown text-cream py-12 flex items-center justify-center w-full h-full rounded-t-[70px] relative">
      <div className="w-full mx-auto px-1 h-full flex flex-col justify-center space-y-10">
        <div className="flex flex-col items-center justify-center space-y-8 ">
          <Logo useImage={true} size="md" />
          <p className="w-fit text-center text-[25px] md:text-[40px] lg:text-[50px] font-vollkorn  leading-tight">
            {t("footer.tagline")}
          </p>
          <Button
            variant="secondary"
            size="lg"
            aria-label="Make a reservation"
            onClick={openReservation}
          >
            {t("footer.reserve")}
          </Button>
          <InfoTable />
          <p className="text-center text-sm lg:text-md tracking-wider">
            {t("footer.all_rights").replace("{year}", CURRENT_YEAR.toString())}
          </p>
          <p className="text-center text-xs lg:text-md tracking-wider opacity-30 text-cream">
            This website made by wafflas
          </p>
        </div>
      </div>
    </footer>
  );
}

