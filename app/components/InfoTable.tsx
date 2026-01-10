export default function InfoTable() {
  return (
    <div className="w-full border-t border-b border-cream/50">
      <div className="grid grid-cols-2 md:grid-cols-4 text-center font-ubuntu text-xs lg:text-sm tracking-wider">
        {/* Hours */}
        <div className="py-3 flex items-center justify-center px-4 border-r border-b md:border-b-0 border-cream/50">
          <span>Everyday | 20:00-24:00</span>
        </div>

        {/* Address */}
        <div className="py-3 flex items-center justify-center px-4 border-b md:border-b-0 md:border-r border-cream/50">
          <span>Tamiolaki 2 | Ierapetra, Crete</span>
        </div>

        {/* Phone */}
        <div className="py-3 flex items-center justify-center px-4 border-r border-cream/50">
          <a
            href="tel:+302842020140"
            className="hover:opacity-70 transition-opacity"
          >
            +30 28420 20140
          </a>
        </div>

        {/* Socials */}
        <div className="py-3 flex items-center justify-center px-8 gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a
            href="https://tripadvisor.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TripAdvisor"
            className="hover:scale-110 transition-transform"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
              <circle cx="8" cy="12" r="3" />
              <circle cx="16" cy="12" r="3" />
              <path d="M12 12v1" />
              <path d="M8 12c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:scale-110 transition-transform"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
