"use client";
import Link from "next/link";
import Logo from "../Logo";
import Button from "../Button";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { useMenu } from "../../context/MenuContext";
import { motion } from "framer-motion";

export default function NavBar() {
  const [language, setLanguage] = useState<"el" | "en">("el");
  const { isOpen, closeMenu } = useMenu();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-100 w-full bg-darkbrown text-cream flex flex-col px-8 py-4 md:px-12 md:py-6 overflow-y-auto"
    >
      <div className="flex items-center justify-between w-full px-2 md:px-12">
        <div className="flex-1 flex justify-start">
          <Logo useImage={true} imageSrc="/logo.png" size="xs" />
        </div>

        <div className="flex-1 flex justify-end items-center gap-1">
          <button
            className="p-2 hover:scale-110 transition-transform"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <IoClose size={30} className="text-cream" />
          </button>
          <Button variant="secondary" size="sm">
            RESERVE
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-40 md:space-y-15 py-2">
        <div className="flex justify-center items-center gap-6 font-ubuntu mt-6">
          <button
            onClick={() => setLanguage("en")}
            className={`text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 ${
              language === "en" ? "opacity-100" : "opacity-50"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("el")}
            className={`text-sm md:text-base font-medium transition-all duration-300 hover:opacity-100 hover:scale-110 ${
              language === "el" ? "opacity-100" : "opacity-50"
            }`}
          >
            Ελληνικά
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-8 py-2">
          <div className="flex flex-wrap justify-center gap-x-7 md:gap-x-24 gap-y-4 font-vollkorn text-[30px] md:text-[60px] lg:text-[90px] leading-tight">
            <Link
              href="/"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              href="/menu"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Menu
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 md:gap-x-24 gap-y-4 font-vollkorn text-[30px] md:text-[60px] lg:text-[90px] leading-tight">
            <Link
              href="/place"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Place
            </Link>
            <Link
              href="/cuisine"
              className="hover:opacity-70 transition-opacity"
              onClick={closeMenu}
            >
              Cuisine
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-12 mt-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-sm md:text-lg font-ubuntu tracking-wide opacity-90">
          <a
            href="tel:+302842020140"
            className="hover:opacity-70 transition-opacity"
          >
            +30 28420 20140
          </a>
          <span className="hidden md:block opacity-50">|</span>
          <span>Everyday | 20:00-24:00</span>
          <span className="hidden md:block opacity-50">|</span>
          <span>Tamiolaki 2 | Ierapetra, Crete</span>
        </div>

        <div className="flex items-center gap-10">
          <a
            href="https://www.instagram.com/kale.gastrobar.ier/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
            aria-label="Instagram"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://www.tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
            aria-label="TripAdvisor"
          >
            <SiTripadvisor size={30} />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform opacity-90 hover:opacity-100"
            aria-label="Facebook"
          >
            <FaFacebook size={28} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
