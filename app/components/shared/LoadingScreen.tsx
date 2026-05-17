"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import LogoSVG from "./LogoSVG";

const MOBILE_BREAKPOINT = 768;
const MIN_DURATION_MS = 1200;
const MAX_WAIT_MS = 6000;
const FADE_OUT_MS = 600;

const DEFAULT_VIDEO_SRCS = {
  mobile: "/video/introvideo_mobile.webm",
  desktop: "/video/introvideo_desktop.webm",
};

const ASSET_IMAGE_URLS = [
  "/logos/logo.png",
  "/logos/logo2.png",
  "/images/PlaceSection/fortress2.webp",
  "/images/IntroSection/intro1.webp",
  "/images/IntroSection/intro2.webp",
  "/images/IntroSection/intro3.webp",
  "/images/IntroSection/intro4.webp",
  "/images/PlaceSection/place1.webp",
  "/images/PlaceSection/place2.webp",
  "/images/PlaceSection/place4.webp",
  "/images/PlaceSection/place6.webp",
  "/images/PlaceSection/place5.webp",
  "/images/MenuSection/menu1.webp",
  "/images/MenuSection/menu2.webp",
  "/images/MenuSection/menu3.webp",
  "/images/MenuSection/menu4.webp",
  "/images/MenuSection/menu5.webp",
];

const ASSET_IMAGE_URLS_MOBILE = [
  "/logos/logo.png",
  "/logos/logo2.png",
  "/images/PlaceSection/fortress2.webp",
];

const MAX_WAIT_MS_MOBILE = 4000;

interface LoadingScreenProps {
  onComplete: () => void;
  onStartExit?: () => void;
  minDurationMs?: number;
  maxWaitMs?: number;
  videoSrcs?: { mobile: string; desktop: string };
}

function AnimatedLogo({ onComplete }: { onComplete?: () => void }) {
  const pathRef = useRef<SVGPathElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const image = imageRef.current;
    if (!path || !image) return;

    const pathLength = path.getTotalLength();

    const isMobile = window.innerWidth < 768;
    const blurStart = isMobile ? 10 : 20; // Reduced blur on mobile
    const blurEnd = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      fillOpacity: 0,
    });
    gsap.set(image, {
      opacity: 0,
      filter: `blur(${blurStart}px)`,
      force3D: true,
    });

    // Stage 1: Draw the stroke
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.8,
      ease: "power2.inOut",
    });

    // Stage 2: Fade in the fill
    tl.to(path, {
      fillOpacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });

    // Stage 3: Fade in the image with blur reveal (optimized for mobile)
    tl.to(image, {
      opacity: 1,
      filter: `blur(${blurEnd}px)`,
      duration: 2,
      ease: "power2.out",
      force3D: true,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center">
      <LogoSVG ref={pathRef} />
      <img
        ref={imageRef}
        src="/logos/logo-semi.png"
        alt="Kàlè Gastrobar Logo"
        className="w-40 h-auto md:w-48 lg:w-56 object-contain drop-shadow-2xl select-none will-change-[filter,opacity]"
        style={{ opacity: 0, filter: "blur(10px)", transform: "translateZ(0)" }}
      />
    </div>
  );
}

export default function LoadingScreen({
  onComplete,
  onStartExit,
  minDurationMs = MIN_DURATION_MS,
  maxWaitMs = MAX_WAIT_MS,
  videoSrcs = DEFAULT_VIDEO_SRCS,
}: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const minReachedRef = useRef(false);
  const videoReadyRef = useRef(false);
  const imagesReadyRef = useRef(false);
  const animationReadyRef = useRef(false);
  const completedRef = useRef(false);
  const tryCompleteRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const imageUrls = isMobile ? ASSET_IMAGE_URLS_MOBILE : ASSET_IMAGE_URLS;
    const effectiveMaxWait = isMobile ? MAX_WAIT_MS_MOBILE : maxWaitMs;

    const tryComplete = () => {
      if (completedRef.current) return;
      if (
        !minReachedRef.current ||
        !videoReadyRef.current ||
        !imagesReadyRef.current ||
        !animationReadyRef.current
      )
        return;
      completedRef.current = true;
      onStartExit?.();
      setIsExiting(true);
    };

    // Store tryComplete in ref so it can be accessed by handleAnimationComplete
    tryCompleteRef.current = tryComplete;

    // Preload landing video (same as VideoBackground)
    const videoSrc = isMobile ? videoSrcs.mobile : videoSrcs.desktop;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.src = videoSrc;

    const onVideoReady = () => {
      videoReadyRef.current = true;
      tryComplete();
    };
    video.addEventListener("canplaythrough", onVideoReady, { once: true });
    video.addEventListener("error", onVideoReady, { once: true });
    video.load();

    // Preload key site images (fewer on mobile for performance)
    let imagesLoaded = 0;
    const totalImages = imageUrls.length;
    const checkImagesReady = () => {
      imagesLoaded += 1;
      if (imagesLoaded >= totalImages) {
        imagesReadyRef.current = true;
        tryComplete();
      }
    };
    imageUrls.forEach((url) => {
      const img = new Image();
      img.onload = checkImagesReady;
      img.onerror = checkImagesReady;
      img.src = url;
    });

    const minTimer = setTimeout(() => {
      minReachedRef.current = true;
      tryComplete();
    }, minDurationMs);

    const maxTimer = setTimeout(() => {
      videoReadyRef.current = true;
      imagesReadyRef.current = true;
      tryComplete();
    }, effectiveMaxWait);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      video.removeEventListener("canplaythrough", onVideoReady);
      video.removeEventListener("error", onVideoReady);
      video.src = "";
    };
  }, [minDurationMs, maxWaitMs, videoSrcs.mobile, videoSrcs.desktop]);

  useEffect(() => {
    if (!isExiting) return;
    const t = setTimeout(onComplete, FADE_OUT_MS);
    return () => clearTimeout(t);
  }, [isExiting, onComplete]);

  const handleAnimationComplete = () => {
    animationReadyRef.current = true;
    if (tryCompleteRef.current) {
      tryCompleteRef.current();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center bg-darkbrown transition-opacity duration-600 ease-out ${isExiting ? "pointer-events-none" : ""}`}
      style={{ opacity: isExiting ? 0 : 1 }}
      aria-hidden="true"
      aria-busy={!isExiting}
    >
      <AnimatedLogo onComplete={handleAnimationComplete} />
    </div>
  );
}
