"use client";
import EatSipColumn from "./EatSipColumn";

export default function EatSipSection() {
  return (
    <section className="flex flex-col md:flex-row w-full h-auto md:h-screen mt-4">
      <EatSipColumn
        key="eat"
        title="Eat"
        mediaSrc="/images/IntroSection/intro1.png"
      />

      <EatSipColumn key="sip" title="Sip" mediaSrc="/video/sipvideo.mp4" />
    </section>
  );
}
