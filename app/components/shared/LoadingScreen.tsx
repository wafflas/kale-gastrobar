"use client";

import { useRef, useEffect, useState } from "react";
import Logo from "./Logo";

const MOBILE_BREAKPOINT = 768;
const MIN_DURATION_MS = 1200;
const MAX_WAIT_MS = 6000;
const FADE_OUT_MS = 600;

const DEFAULT_VIDEO_SRCS = {
  mobile: "/video/introvideo_mobile.mp4",
  desktop: "/video/introvideo_desktop.mp4",
};

/** Key images used across the site; preloaded so they're ready when the loader hides. */
const ASSET_IMAGE_URLS = [
  "/logo.png",
  "/logo2.png",
  "/images/PlaceSection/fortress2.png",
  "/images/IntroSection/intro1.png",
  "/images/IntroSection/intro2.png",
  "/images/IntroSection/intro3.png",
  "/images/IntroSection/intro4.png",
  "/images/PlaceSection/place1.png",
  "/images/PlaceSection/place2.png",
  "/images/PlaceSection/place3.png",
  "/images/PlaceSection/place4.png",
  "/images/PlaceSection/place5.png",
  "/images/MenuSection/menu1.png",
  "/images/MenuSection/menu2.png",
  "/images/MenuSection/menu3.png",
  "/images/MenuSection/menu4.png",
  "/images/MenuSection/menu5.png",
];

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
  maxWaitMs?: number;
  videoSrcs?: { mobile: string; desktop: string };
}


export default function LoadingScreen({
  onComplete,
  minDurationMs = MIN_DURATION_MS,
  maxWaitMs = MAX_WAIT_MS,
  videoSrcs = DEFAULT_VIDEO_SRCS,
}: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const minReachedRef = useRef(false);
  const videoReadyRef = useRef(false);
  const imagesReadyRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tryComplete = () => {
      if (completedRef.current) return;
      if (!minReachedRef.current || !videoReadyRef.current || !imagesReadyRef.current)
        return;
      completedRef.current = true;
      setIsExiting(true);
    };

    // Preload landing video (same as VideoBackground)
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
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

    // Preload key site images
    let imagesLoaded = 0;
    const totalImages = ASSET_IMAGE_URLS.length;
    const checkImagesReady = () => {
      imagesLoaded += 1;
      if (imagesLoaded >= totalImages) {
        imagesReadyRef.current = true;
        tryComplete();
      }
    };
    ASSET_IMAGE_URLS.forEach((url) => {
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
    }, maxWaitMs);

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

  return (
    <div
      className={`fixed inset-0 z-200 flex items-center justify-center bg-darkbrown transition-opacity duration-600 ease-out ${isExiting ? "pointer-events-none" : ""}`}
      style={{ opacity: isExiting ? 0 : 1 }}
      aria-hidden="true"
      aria-busy={!isExiting}
    >
      <Logo useImage={true} imageSrc="/logo.png" size="md" />
    </div>
  );
}
