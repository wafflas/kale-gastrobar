"use client";
import { AnimatePresence } from "framer-motion";
import { useMenu } from "../../context/MenuContext";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
  const { isOpen } = useMenu();

  return <AnimatePresence mode="wait">{isOpen && <NavBar />}</AnimatePresence>;
}
