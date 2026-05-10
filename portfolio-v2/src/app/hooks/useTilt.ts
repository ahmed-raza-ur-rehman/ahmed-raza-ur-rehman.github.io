"use client";

import { useState, useCallback } from "react";

interface TiltValues {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

export function useTilt(maxTilt: number = 15) {
  const [tilt, setTilt] = useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEventEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setTilt({
        rotateX: (y - 0.5) * -maxTilt,
        rotateY: (x - 0.5) * maxTilt,
        glareX: x * 100,
        glareY: y * 100,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
    });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
}
