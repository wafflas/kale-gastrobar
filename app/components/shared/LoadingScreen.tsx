"use client";

import { useRef, useEffect, useState } from "react";
import Logo from "./Logo";

const MOBILE_BREAKPOINT = 768;
const MIN_DURATION_MS = 1200;
const MAX_WAIT_MS = 5000;
const FADE_OUT_MS = 600;

const DEFAULT_VIDEO_SRCS = {
  mobile: "/video/introvideo_mobile.mp4",
  desktop: "/video/introvideo_desktop.mp4",
};

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const minReachedRef = useRef(false);
  const videoReadyRef = useRef(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const src = isMobile ? videoSrcs.mobile : videoSrcs.desktop;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.src = src;
    videoRef.current = video;

    const tryComplete = () => {
      if (completedRef.current) return;
      if (!minReachedRef.current || !videoReadyRef.current) return;
      completedRef.current = true;
      setIsExiting(true);
    };

    const onVideoReady = () => {
      videoReadyRef.current = true;
      tryComplete();
    };

    video.addEventListener("canplaythrough", onVideoReady, { once: true });
    video.addEventListener("error", onVideoReady, { once: true });
    video.load();

    const minTimer = setTimeout(() => {
      minReachedRef.current = true;
      tryComplete();
    }, minDurationMs);

    const maxTimer = setTimeout(() => {
      videoReadyRef.current = true;
      tryComplete();
    }, maxWaitMs);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      video.removeEventListener("canplaythrough", onVideoReady);
      video.removeEventListener("error", onVideoReady);
      video.src = "";
      videoRef.current = null;
    };
  }, [minDurationMs, maxWaitMs, videoSrcs.mobile, videoSrcs.desktop]);

  useEffect(() => {
    if (!isExiting) return;
    const t = setTimeout(() => {
      onComplete();
    }, FADE_OUT_MS);
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
