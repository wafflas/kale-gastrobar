import React from "react";
import Header from "../Header";
import Logo from "../Logo";
import VideoBackground from "../VideoBackground";

export default function LandingPage() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-cream flex items-center justify-center">
      <Header />
      <VideoBackground
        mobileVideoSrc="/video/introvideo_mobile.mp4"
        desktopVideoSrc="/video/introvideo_desktop.mp4"
        overlayColor="bg-darkbrown"
        overlayOpacity="opacity-33"
      />
      <Logo useImage={true} imageSrc="/logo.png" size="md" />
    </section>
  );
}
