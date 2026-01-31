"use client";

import { useRef, useState, useEffect } from "react";
import HeroTypography from "../shared/HeroTypography";
import { useMouseSmoothing } from "./hooks/useMouseSmoothing";

interface EatSipColumnProps {
  title: "Eat" | "Sip";
  mediaSrc: string;
}

export default function EatSipColumn({ title, mediaSrc }: EatSipColumnProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // For mobile tap
  const columnRef = useRef<HTMLDivElement>(null);
  const { currentPos, updateTarget } = useMouseSmoothing(0.15);

  // Auto-detect if media is video based on file extension
  const isVideo = mediaSrc.match(/\.(mp4|webm|ogg)$/i);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!columnRef.current) return;

    const rect = columnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateTarget({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTap = () => {
    setIsRevealed((prev) => !prev);
  };

  // Update CSS variables for clip-path
  useEffect(() => {
    if (columnRef.current) {
      columnRef.current.style.setProperty("--mouse-x", `${currentPos.x}px`);
      columnRef.current.style.setProperty("--mouse-y", `${currentPos.y}px`);
    }
  }, [currentPos]);

  return (
    <div
      ref={columnRef}
      className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen overflow-hidden cursor-pointer md:cursor-default"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap} // Mobile tap interaction
    >
      {/* Solid background layer (fallback) */}
      <div className="absolute inset-0 bg-cream z-0" />

      {/* Media layer - always visible at the bottom Z-index */}
      {isVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          src={mediaSrc}
          className="absolute inset-0 w-full h-full object-cover z-1"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-1"
          style={{
            backgroundImage: `url(${mediaSrc})`,
          }}
        />
      )}

      {/* OVERLAY MASK LAYER (Desktop) */}
      <div
        className="absolute inset-0 hidden md:block z-20 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse 300px 250px at var(--mouse-x) var(--mouse-y), transparent 100%, #fef9e5 100%)`
            : `#fef9e5`,
        }}
      />

      {/* Mobile overlay (fades out on tap) */}
      <div
        className="absolute inset-0 bg-cream z-30 md:hidden transition-opacity duration-500"
        style={{ opacity: isRevealed ? 0 : 1 }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none">
        <HeroTypography size={150}>{title}</HeroTypography>

        {/* Mobile tap hint */}
        <p
          className="md:hidden mt-4 text-darkbrown text-sm font-ubuntu transition-opacity duration-500"
          style={{ opacity: isRevealed ? 0 : 1 }}
        >
          Tap to reveal
        </p>
      </div>
    </div>
  );
}
