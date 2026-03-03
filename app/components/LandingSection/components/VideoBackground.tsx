"use client";

import { useEffect, useState, useMemo, useRef } from "react";

interface VideoBackgroundProps {
  mobileVideoSrc?: string;
  desktopVideoSrc?: string;
  overlayColor?: string;
  overlayOpacity?: string;
  shouldPlay?: boolean;
}

const MOBILE_BREAKPOINT = 768;

export default function VideoBackground({
  mobileVideoSrc = "/video/introvideo_mobile.mp4",
  desktopVideoSrc = "/video/introvideo_desktop.mp4",
  overlayColor = "bg-darkbrown",
  overlayOpacity = "opacity-33",
  shouldPlay = true,
}: VideoBackgroundProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = useMemo(
    () => (isMobile ? mobileVideoSrc : desktopVideoSrc),
    [isMobile, mobileVideoSrc, desktopVideoSrc],
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const listener = () => setIsMobile(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    const play = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");
        await video.play();
      } catch (error) {
        console.warn("Video autoplay failed:", error);
      }
    };
    if (video.readyState >= 3) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
      return () => video.removeEventListener("canplay", play);
    }
  }, [videoSrc, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !shouldPlay) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1, rootMargin: "0px" },
    );
    io.observe(container);
    return () => io.disconnect();
  }, [videoSrc, shouldPlay]);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          key={videoSrc}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full ${overlayColor} ${overlayOpacity}`}
        aria-hidden="true"
      />
    </>
  );
}
