"use client";

import Header from "./components/Header";
import Logo from "../shared/Logo";
import VideoBackground from "./components/VideoBackground";
import { useLoading } from "@/app/context/LoadingContext";
import ScrollDownIndicator from "../shared/ScrollDownIndicator";

export default function LandingPage() {
  const { shouldPlayVideo } = useLoading();
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-darkbrown flex items-center justify-center"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Header />
      <VideoBackground
        shouldPlay={shouldPlayVideo}
        mobileVideoSrc="/video/introvideo_mobile.webm"
        desktopVideoSrc="/video/introvideo_desktop.webm"
        overlayColor="bg-darkbrown"
        overlayOpacity="opacity-33"
      />
      <Logo useImage={true} size="md" />
      <ScrollDownIndicator />
    </section>
  );
}
