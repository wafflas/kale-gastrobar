import Image from "next/image";

interface LogoProps {
  useImage?: boolean;
  imageSrc?: string;
}

export default function Logo({
  useImage = false,
  imageSrc = "/logo.png",
}: LogoProps) {
  if (useImage) {
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none animate-fadeInScale mt-20">
        <Image
          src={imageSrc}
          alt="Kàlè Gastrobar Logo"
          width={300}
          height={375}
          className="w-40 h-auto md:w-48 lg:w-56 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 pointer-events-auto select-none"
          priority
          draggable={false}
        />
      </div>
    );
  }

  return null;
}
