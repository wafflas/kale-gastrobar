"use client";

import { useEffect, useState } from "react";

interface VideoBackgroundProps {
  mobileVideoSrc?: string;
  desktopVideoSrc?: string;
  overlayColor?: string;
  overlayOpacity?: string;
}

export default function VideoBackground({
  mobileVideoSrc = "/video/introvideo_mobile.mp4",
  desktopVideoSrc = "/video/introvideo_desktop.mp4",
  overlayColor = "bg-darkbrown",
  overlayOpacity = "opacity-33",
}: VideoBackgroundProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // Tailwind md breakpoint
      setIsMobile(mobile);
      setVideoSrc(mobile ? mobileVideoSrc : desktopVideoSrc);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [mobileVideoSrc, desktopVideoSrc]);

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
        autoPlay
        loop
        muted
        playsInline
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
