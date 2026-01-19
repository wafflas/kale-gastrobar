"use client";

import Image from "next/image";
import FortressScroll from "./components/FortressScroll";

export default function PlaceSection() {
  return (
    <section className="relative min-h-screen lg:min-h-[150vh] w-full bg-cream flex items-center overflow-visible">
      {/* Single container for both text and image with overflow-visible */}
      <div className="relative w-full max-w-7xl aspect-4/3">
        
        {/* Image */}
        <Image
          src="/images/PlaceSection/fortress.png"
          alt="Kale Gastrobar by the fortress"
          fill
          className="object-cover"
          priority
        />
        
        {/* SVG Text Overlay - significantly extended to prevent any clipping */}
        <div className="absolute -inset-24 pointer-events-none ">
          <FortressScroll />
        </div>
      </div>
    </section>
  );
}
