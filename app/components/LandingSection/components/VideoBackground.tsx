"use client";

import { useEffect, useState, useMemo, useRef } from "react";

interface VideoBackgroundProps {
  mobileVideoSrc?: string;
  desktopVideoSrc?: string;
  overlayColor?: string;
  overlayOpacity?: string;
}

const MOBILE_BREAKPOINT = 768;

export default function VideoBackground({
  mobileVideoSrc = "/video/introvideo_mobile.mp4",
  desktopVideoSrc = "/video/introvideo_desktop.mp4",
  overlayColor = "bg-darkbrown",
  overlayOpacity = "opacity-33",
}: VideoBackgroundProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = useMemo(
    () => (isMobile ? mobileVideoSrc : desktopVideoSrc),
    [isMobile, mobileVideoSrc, desktopVideoSrc],
  );

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Force video to play on mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        // Set properties again to ensure they're applied
        video.muted = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "true");
        video.setAttribute("webkit-playsinline", "true");

        await video.play();
      } catch (error) {
        console.warn("Video autoplay failed:", error);
        // Retry on user interaction
        const playOnInteraction = async () => {
          try {
            await video.play();
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("click", playOnInteraction);
          } catch (e) {
            console.warn("Video play on interaction failed:", e);
          }
        };
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
        document.addEventListener("click", playOnInteraction, { once: true });
      }
    };

    // Small delay to ensure video is loaded
    const timer = setTimeout(attemptPlay, 100);

    return () => clearTimeout(timer);
  }, [videoSrc]);

  if (isMobile === null) {
    return (
      <>
        <div
          className={`absolute top-0 left-0 w-full h-full ${overlayColor} ${overlayOpacity}`}
        />
      </>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        key={videoSrc} // force re-render when source changes
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-full ${overlayColor} ${overlayOpacity}`}
        aria-hidden="true"
      />
    </>
  );
}
