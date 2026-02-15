import Image from "next/image";
import LogoSVG from "./LogoSVG";

interface LogoProps {
  useImage?: boolean;
  imageSrc?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function Logo({
  useImage = false,
  imageSrc = "/logos/logo-semi.png",
  size = "xs",
}: LogoProps) {
  const sizeStyles = {
    xs: "w-20 h-auto md:w-24 lg:w-28",
    sm: "w-24 h-auto md:w-28 lg:w-32",
    md: "w-40 h-auto md:w-48 h-auto lg:w-56",
    lg: "w-64 h-auto md:w-72 lg:w-80",
  };

  if (useImage) {
    return (
      <div className="inset-0 z-10 flex flex-col items-center justify-center pointer-events-none animate-fadeInScale">
        {imageSrc !== "/logos/logo2.png" && imageSrc !== "/logos/logo.png"   && (
          <LogoSVG />
        )}
        <Image
          src={imageSrc}
          alt="Kàlè Gastrobar Logo"
          width={400}
          height={500}
          className={`${sizeStyles[size]} object-contain drop-shadow-2xl pointer-events-auto select-none`}
          priority
          draggable={false}
        />
      </div>
    );
  }

  return null;
}
