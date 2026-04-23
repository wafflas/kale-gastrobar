import React from "react";
import CuisineContent from "./components/CuisineContent";
import CuisineGrid from "./components/CuisineGrid";

export default function CuisineSection() {
  return (
    <section className="relative min-h-[95vh] w-full bg-darkbrown overflow-hidden flex flex-col items-center justify-center py-12 px-4 md:py-32 md:px-6 lg:py-72">
      <div className="space-y-3 md:space-y-8 px-2">
        <CuisineContent />
        <CuisineGrid />
      </div>
    </section>
  );
}
