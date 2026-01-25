"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

interface ReservationContextType {
  isOpen: boolean;
  openReservation: () => void;
  closeReservation: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

const RESERVATION_URL =
  "https://www.i-host.gr/Reservations/New?restaurant=2410&channel=instagram&lang=eng";

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openReservation = useCallback(() => setIsOpen(true), []);
  const closeReservation = useCallback(() => setIsOpen(false), []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeReservation();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeReservation]);

  return (
    <ReservationContext.Provider
      value={{ isOpen, openReservation, closeReservation }}
    >
      {children}
      {isOpen && <ReservationModal onClose={closeReservation} />}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservation must be used within a ReservationProvider"
    );
  }
  return context;
}


function ReservationModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl h-[90vh] max-h-[700px] mx-4 bg-cream rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fadeInScale">
        <div className="flex items-center justify-between px-6 py-4 border-b border-darkbrown/20 bg-darkbrown">
          <h2
            id="reservation-modal-title"
            className="text-xl font-vollkorn text-cream font-medium"
          >
            Reserve a Table
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close reservation modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cream"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 top-[60px] flex items-center justify-center bg-cream">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-darkbrown/20 border-t-darkbrown rounded-full animate-spin" />
              <p className="text-darkbrown/60 font-ubuntu">
                Loading reservation system...
              </p>
            </div>
          </div>
        )}

        <iframe
          src={RESERVATION_URL}
          title="Kalè Gastrobar Reservation"
          className="flex-1 w-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="payment"
        />
      </div>
    </div>
  );
}
