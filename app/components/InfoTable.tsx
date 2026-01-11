import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";

export default function InfoTable() {
  return (
    <div className="w-full border-t border-b border-cream/50">
      <div className="grid grid-cols-2 md:grid-cols-4 text-center font-ubuntu">
        {/* Hours */}
        <div className="py-3 flex items-center justify-center px-1 md:px-3 border-r border-b md:border-b-0 border-cream/50">
          <span className="text-xs md:text-sm lg:text-base tracking-tight md:tracking-wider whitespace-nowrap">
            Everyday | 20:00-24:00
          </span>
        </div>

        {/* Address */}
        <div className="py-3 flex items-center justify-center px-1 md:px-3 border-b md:border-b-0 md:border-r border-cream/50">
          <span className="text-xs md:text-sm lg:text-base tracking-tight md:tracking-wider whitespace-nowrap">
            Tamiolaki 2 | Ierapetra, Crete
          </span>
        </div>

        {/* Phone */}
        <div className="py-3 flex items-center justify-center px-1 md:px-3 border-r border-cream/50">
          <a
            href="tel:+302842020140"
            className="text-xs md:text-sm lg:text-base tracking-tight md:tracking-wider hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            +30 28420 20140
          </a>
        </div>

        {/* Socials */}
        <div className="py-3 flex items-center justify-center px-1 md:px-3 gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TripAdvisor"
            className="hover:scale-110 transition-transform"
          >
            <SiTripadvisor size={22} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <FaFacebook size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
