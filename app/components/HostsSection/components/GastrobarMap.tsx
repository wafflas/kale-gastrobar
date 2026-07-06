"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";

export default function GastrobarMap() {
  const { t } = useLanguage();
  const [osmUrl, setOsmUrl] = useState("");
  const [isResolving, setIsResolving] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const isLoading = isResolving || !isMapLoaded;

  useEffect(() => {
    const address =
      "Ταμιωλάκη 2, Community of Ierapetra, Ierapetra Municipal Unit, Municipality of Ierapetra, Lasithi Regional Unit, Region of Crete, 722 00, Greece";

    function useFallback() {
      const lat = 35.0075;
      const lon = 25.7383;
      const minLng = 25.7343;
      const minLat = 35.0045;
      const maxLng = 25.7423;
      const maxLat = 35.0105;
      setOsmUrl(
        `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}`,
      );
    }

    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          const deltaLng = 0.004;
          const deltaLat = 0.003;
          const minLng = lon - deltaLng;
          const minLat = lat - deltaLat;
          const maxLng = lon + deltaLng;
          const maxLat = lat + deltaLat;

          setOsmUrl(
            `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}`,
          );
        } else {
          useFallback();
        }
      })
      .catch(() => {
        useFallback();
      })
      .finally(() => {
        setIsResolving(false);
      });
  }, []);

  return (
    <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] rounded-2xl overflow-hidden border border-darkbrown/15 shadow-[inset_0_4px_12px_rgba(93,62,50,0.05)] transition-all duration-300 bg-cream/50">
      <div
        className={`absolute inset-0 bg-cream/70 backdrop-blur-sm flex flex-col items-center justify-center z-30 transition-opacity duration-300 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isLoading}
      >
        <div className="w-8 h-8 rounded-full border-2 border-darkbrown/25 border-t-darkbrown animate-spin mb-3" />
        <span className="font-ubuntu text-xs tracking-wider text-darkbrown/60 uppercase">
          {t("hosts.map_loading")}
        </span>
      </div>
      {osmUrl && (
        <iframe
          src={osmUrl}
          className={`earthy-map-iframe absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
            isMapLoaded ? "opacity-100" : "opacity-0"
          }`}
          allowFullScreen={false}
          loading="lazy"
          title="Kalè Gastrobar Location Map"
          onLoad={() => setIsMapLoaded(true)}
        />
      )}
    </div>
  );
}
