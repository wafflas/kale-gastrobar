"use client";

import { useState } from "react";
import Button from "../../shared/Button";
import { useMenu } from "../../../context/MenuContext";
import { useReservation } from "../../../context/ReservationContext";

export default function Header() {
  const [language, setLanguage] = useState<"el" | "en">("el");
  const { openMenu } = useMenu();
  const { openReservation } = useReservation();

  return (
    <header className="absolute top-0 left-0 w-full z-20 px-6 py-8 md:px-12 md:py-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-ubuntu text-cream text-shadow-lg">
          <button
            onClick={() => setLanguage("el")}
            className={`text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer ${
              language === "el" ? "opacity-100" : "opacity-50"
            }`}
            aria-label="Switch to Greek"
          >
            ΕΛ
          </button>
          <span className="text-cream opacity-50">|</span>
          <button
            onClick={() => setLanguage("en")}
            className={`text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 cursor-pointer ${
              language === "en" ? "opacity-100" : "opacity-50"
            }`}
            aria-label="Switch to English"
          >
            ENG
          </button>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            className="group transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Open menu"
            onClick={openMenu}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 71 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-auto drop-shadow-lg transition-transform duration-300"
            >
              <path
                d="M71 2.21237C71 0.990499 69.4863 0 67.619 0H3.38098C1.51368 0 3.05176e-05 0.990499 3.05176e-05 2.21237C3.05176e-05 3.43423 1.51368 4.42473 3.38098 4.42473H67.619C69.4863 4.42473 71 3.43423 71 2.21237Z"
                fill="#FEF9E5"
                className="transition-all duration-300"
              />
              <path
                d="M71 17.6985C71 16.4766 69.4863 15.4859 67.619 15.4859L30.4286 15.4866C28.5613 15.4866 27.0476 16.4771 27.0476 17.699C27.0476 18.9209 28.5613 19.9113 30.4286 19.9113L67.619 19.9109C69.4863 19.9109 71 18.9202 71 17.6985Z"
                fill="#FEF9E5"
                className="transition-all duration-300"
              />
              <path
                d="M67.619 30.9727C69.4863 30.9727 71 31.9632 71 33.1851C71 34.4067 69.4863 35.3972 67.619 35.3972H10.1429C8.27559 35.3972 6.76193 34.4067 6.76193 33.1851C6.76193 31.9632 8.27559 30.9727 10.1429 30.9727H67.619Z"
                fill="#FEF9E5"
                className="transition-all duration-300"
              />
            </svg>
          </button>

          <Button
            variant="primary"
            size="md"
            aria-label="Make a reservation"
            onClick={openReservation}
          >
            RESERVE
          </Button>
        </div>
      </div>
    </header>
  );
}
