"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

const HostsGrid = forwardRef<HTMLDivElement>(function HostsGrid(_, ref) {
  return (
    <div
      ref={ref}
      // We restrict width to max 95vh so the aspect-square doesn't exceed screen height, but allow it to stretch wide on desktop
      className="relative w-full max-w-[1700px] aspect-square md:aspect-[1.6] mx-auto"
    >
      {/* Center Image */}
      <div className="center-image absolute left-[7.5%] top-[34%] w-[85%] md:left-[20%] md:top-[26%] md:w-[60%] aspect-[16/9] z-20 shadow-lg opacity-0">
        <Image
          src="/images/HostsSection/image.png"
          alt="Kalè Hosts"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Left */}
      <div className="side-image absolute left-[0%] top-[5%] w-[32%] md:left-[0%] md:top-[0%] md:w-[22%] aspect-square z-0 shadow-lg opacity-0">
        <Image
          src="/images/HostsSection/image6.jpg"
          alt="Chef plating"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Left */}
      <div className="side-image absolute left-[1%] top-[65%] w-[28%] md:left-[2%] md:top-[56%] md:w-[20%] aspect-[2/3] z-0 shadow-lg opacity-0">
        <Image
          src="/images/HostsSection/image2.png"
          alt="Ingredients"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Right */}
      <div className="side-image absolute right-[0%] top-[5%] w-[32%] md:right-[0%] md:top-[0%] md:w-[24%] aspect-[3/4] z-0 shadow-lg opacity-0">
        <Image
          src="/images/HostsSection/image7.jpg"
          alt="Wine drinking"
          fill
          className="object-cover"
        />
      </div>

      {/* Bottom Right */}
      <div className="side-image absolute right-[1%] top-[68%] w-[32%] md:right-[2%] md:top-[58%] md:w-[22%] aspect-[4/5] z-0 shadow-lg opacity-0">
        <Image
          src="/images/HostsSection/image5.png"
          alt="Herbs"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
});

export default HostsGrid;
