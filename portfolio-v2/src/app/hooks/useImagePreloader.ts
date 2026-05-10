"use client";

import { useState, useEffect } from "react";

export function useImagePreloader(imageUrls: string[]) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(loadedCount / totalImages);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(loadedCount / totalImages);
          resolve();
        };
        img.src = url;
      });
    });

    Promise.all(promises).then(() => {
      setLoaded(true);
    });
  }, [imageUrls]);

  return { loaded, progress };
}
