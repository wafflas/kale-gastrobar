"use client";
import { useRef, useState, useEffect } from "react";
import HeroTypography from "../shared/HeroTypography";
import { useMouseSmoothing } from "./hooks/useMouseSmoothing";

export default function EatSipSection() {
  const [hoveredSection, setHoveredSection] = useState<"eat" | "sip" | null>(
    null,
  );
  const [revealedMobile, setRevealedMobile] = useState<"eat" | "sip" | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { currentPos, updateTarget } = useMouseSmoothing(0.15);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midpoint = rect.width / 2;
    if (x < midpoint) {
      setHoveredSection("eat");
    } else {
      setHoveredSection("sip");
    }

    updateTarget({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  const handleTapEat = () => {
    setRevealedMobile((prev) => (prev === "eat" ? null : "eat"));
  };

  const handleTapSip = () => {
    setRevealedMobile((prev) => (prev === "sip" ? null : "sip"));
  };

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--mouse-x", `${currentPos.x}px`);
      sectionRef.current.style.setProperty("--mouse-y", `${currentPos.y}px`);
    }
  }, [currentPos]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col md:flex-row gap-0 w-full h-auto md:h-screen mt-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cream z-0" />

        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-1"
          style={{
            backgroundImage: `url(/images/IntroSection/intro1.png)`,
            maskImage:
              "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
          }}
        />

        {/* Mobile overlay */}
        <div
          className="absolute inset-0 bg-cream z-30 md:hidden transition-opacity duration-500"
          style={{ opacity: revealedMobile === "eat" ? 0 : 1 }}
        />

        {/* Text overlay */}
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center cursor-pointer md:cursor-default"
          onClick={handleTapEat}
        >
          <HeroTypography size={150}>Eat</HeroTypography>
          <p
            className="md:hidden mt-4 text-darkbrown text-sm font-ubuntu transition-opacity duration-500"
            style={{ opacity: revealedMobile === "eat" ? 0 : 1 }}
          >
            Tap to reveal
          </p>
        </div>
      </div>

      {/* SIP SECTION */}
      <div className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden">
        {/* Solid background layer */}
        <div className="absolute inset-0 bg-cream z-0" />

        {/* Media layer with blur mask on left edge */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video/sipvideo.mp4"
          className="absolute inset-0 w-full h-full object-cover z-1"
          style={{
            maskImage:
              "linear-gradient(to left, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, black 0%, black 85%, transparent 100%)",
          }}
        />

        {/* Mobile overlay */}
        <div
          className="absolute inset-0 bg-cream z-30 md:hidden transition-opacity duration-500"
          style={{ opacity: revealedMobile === "sip" ? 0 : 1 }}
        />

        {/* Text overlay */}
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center cursor-pointer md:cursor-default"
          onClick={handleTapSip}
        >
          <HeroTypography size={150}>Sip</HeroTypography>
          <p
            className="md:hidden mt-4 text-darkbrown text-sm font-ubuntu transition-opacity duration-500"
            style={{ opacity: revealedMobile === "sip" ? 0 : 1 }}
          >
            Tap to reveal
          </p>
        </div>
      </div>

      {/* UNIFIED OVERLAY MASK LAYER (Desktop) - Spans entire section */}
      <div
        className="absolute inset-0 hidden md:block z-20 pointer-events-none"
        style={{
          background: hoveredSection
            ? `radial-gradient(ellipse 400px 300px at var(--mouse-x) var(--mouse-y), transparent 100%, #fef9e5 100%)`
            : `#fef9e5`,
        }}
      />
    </section>
  );
}
