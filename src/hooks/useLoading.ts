import { useState, useEffect } from "react";
import { LoadingState } from "@/types";
import { LOADING_DELAY } from "@/lib/constants";

export const useLoading = (): LoadingState => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DELAY);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, LOADING_DELAY / 10);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return { isLoading, progress };
}; 