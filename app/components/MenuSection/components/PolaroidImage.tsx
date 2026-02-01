import Image from "next/image";

interface PolaroidImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  rotation?: number;
}

export default function PolaroidImage({
  src,
  alt,
  width,
  height,
  className = "",
  rotation = 0,
}: PolaroidImageProps) {
  return (
    <div
      className={`relative inline-block bg-white p-4 pb-16 shadow-xl  hover:z-10 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
        />
      </div>
    </div>
  );
}
