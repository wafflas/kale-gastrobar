import { useRef, useState, useEffect } from "react";
import HeroTypography from "../shared/HeroTypography";
import { useMouseSmoothing } from "./hooks/useMouseSmoothing";
import { useLanguage } from "../../context/LanguageContext";

export default function EatSipSection() {
  const [hoveredSection, setHoveredSection] = useState<"eat" | "sip" | null>(
    null,
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { currentPos, updateTarget } = useMouseSmoothing(0.15);
  const { t } = useLanguage();

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

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--mouse-x", `${currentPos.x}px`);
      sectionRef.current.style.setProperty("--mouse-y", `${currentPos.y}px`);
    }
  }, [currentPos]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden md:flex md:flex-row gap-0 w-full h-auto md:h-screen mt-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cream z-0" />

        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video/eatvideo.webm"
          className="absolute inset-0 w-full h-full object-cover bg-center z-1 [mask-image:linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_85%,transparent_100%)] md:[mask-image:linear-gradient(to_right,black_0%,black_85%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_right,black_0%,black_85%,transparent_100%)]"
        />

        {/* Text overlay */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center select-none">
          <HeroTypography size={150}>{t("eat_sip.eat")}</HeroTypography>
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
          src="/video/sipvideo.webm"
          className="absolute inset-0 w-full h-full object-cover z-1 [mask-image:linear-gradient(to_top,black_0%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_85%,transparent_100%)] md:[mask-image:linear-gradient(to_left,black_0%,black_85%,transparent_100%)] md:[-webkit-mask-image:linear-gradient(to_left,black_0%,black_85%,transparent_100%)]"
        />

        {/* Text overlay */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center select-none">
          <HeroTypography size={150}>{t("eat_sip.sip")}</HeroTypography>
        </div>
      </div>

      {/* UNIFIED OVERLAY MASK LAYER (Desktop) - Spans entire section */}
      <div
        className="absolute inset-0 hidden md:block z-20 pointer-events-none"
        style={{
          background: hoveredSection
            ? `radial-gradient(ellipse 270px 320px at var(--mouse-x) var(--mouse-y), transparent 80%, #fef9e5 100%)`
            : `#fef9e5`,
        }}
      />
    </section>
  );
}

