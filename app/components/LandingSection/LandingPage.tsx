"use client";

import Header from "./components/Header";
import Logo from "../shared/Logo";
import VideoBackground from "./components/VideoBackground";
import { useLoading } from "@/app/context/LoadingContext";

export default function LandingPage() {
  const { shouldPlayVideo } = useLoading();
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-darkbrown flex items-center justify-center"
    >
      <Header />
      <VideoBackground
        shouldPlay={shouldPlayVideo}
        mobileVideoSrc="/video/introvideo_mobile.mp4"
        desktopVideoSrc="/video/introvideo_desktop.mp4"
        overlayColor="bg-darkbrown"
        overlayOpacity="opacity-33"
      />
      <Logo useImage={true} size="md" />
    </section>
  );
}
