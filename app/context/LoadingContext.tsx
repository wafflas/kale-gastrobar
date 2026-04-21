"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import LoadingScreen from "../components/shared/LoadingScreen";

interface LoadingContextValue {
  shouldPlayVideo: boolean;
}

const LoadingContext = createContext<LoadingContextValue>({
  shouldPlayVideo: true,
});

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  return (
    <LoadingContext value={{ shouldPlayVideo }}>
      {showLoading && (
        <LoadingScreen
          onStartExit={() => setShouldPlayVideo(true)}
          onComplete={() => setShowLoading(false)}
        />
      )}
      {children}
    </LoadingContext>
  );
}
