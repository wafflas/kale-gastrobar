import React, { forwardRef } from "react";
import Image from "next/image";

const CuisineGrid = forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      // We restrict width to max 85vh so the aspect-square doesn't exceed screen height, but allow it to be larger up to 1200px
      className="relative w-full max-w-[min(1200px,85vh)] aspect-square mx-auto"
    >
      {/* Center Image */}
      <div className="absolute left-[15%] top-[35%] w-[80%] md:left-[20%] md:w-[65%] aspect-[16/9] z-10 shadow-lg">
        <Image
          src="/images/CuisineSection/image1.png"
          alt="Kalè Cuisine"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Left */}
      <div className="side-image absolute left-[2%] top-[15%] w-[35%] md:left-[5%] md:w-[28%] aspect-square z-20 shadow-lg opacity-0 will-change-transform">
        <Image
          src="/images/CuisineSection/image2.png"
          alt="Chef plating"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Left */}
      <div className="side-image absolute left-[5%] top-[55%] w-[32%] md:left-[8%] md:w-[25%] aspect-[2/3] z-20 shadow-lg opacity-0 will-change-transform">
        <Image
          src="/images/CuisineSection/image3.png"
          alt="Ingredients"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Right */}
      <div className="side-image absolute right-[2%] top-[15%] w-[35%] md:right-[5%] md:w-[30%] aspect-[3/4] z-20 shadow-lg opacity-0 will-change-transform">
        <Image
          src="/images/CuisineSection/image4.png"
          alt="Chef cutting"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Right */}
      <div className="side-image absolute right-[5%] top-[60%] w-[35%] md:right-[8%] md:w-[28%] aspect-[4/5] z-20 shadow-lg opacity-0 will-change-transform">
        <Image
          src="/images/CuisineSection/image5.png"
          alt="Herbs"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
});

CuisineGrid.displayName = "CuisineGrid";

export default CuisineGrid;
