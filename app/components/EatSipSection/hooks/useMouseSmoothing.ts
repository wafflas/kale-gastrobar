"use client";

import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

/**
 * Custom hook for smooth mouse position tracking using linear interpolation (lerp)
 */
export function useMouseSmoothing(lerpFactor: number = 0.15) {
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const targetPos = useRef<Position>({ x: 0, y: 0 });
  const currentPosRef = useRef<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const animate = () => {
      currentPosRef.current.x = lerp(
        currentPosRef.current.x,
        targetPos.current.x,
        lerpFactor,
      );
      currentPosRef.current.y = lerp(
        currentPosRef.current.y,
        targetPos.current.y,
        lerpFactor,
      );

      setCurrentPos({ ...currentPosRef.current });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [lerpFactor]);

  const updateTarget = (newTarget: Position) => {
    targetPos.current = newTarget;
  };

  return { currentPos, updateTarget };
}
