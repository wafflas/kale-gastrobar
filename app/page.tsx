import VideoBackground from "./components/VideoBackground";
import Header from "./components/Header";
import Logo from "./components/Logo";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-cream">
      {/* Video Background with Overlay */}
      <VideoBackground
        mobileVideoSrc="/video/introvideo_mobile.mp4"
        desktopVideoSrc="/video/introvideo_desktop.mp4"
        overlayColor="bg-darkbrown"
        overlayOpacity="opacity-33"
      />

      <Header />

      <Logo useImage={true} imageSrc="/logo.png" />
    </main>
  );
}
