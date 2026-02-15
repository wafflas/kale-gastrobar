import Header from "./components/Header";
import Logo from "../shared/Logo";
import VideoBackground from "./components/VideoBackground";

interface LandingPageProps {
  shouldPlayVideo?: boolean;
}

export default function LandingPage({
  shouldPlayVideo = true,
}: LandingPageProps) {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-cream flex items-center justify-center"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
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
