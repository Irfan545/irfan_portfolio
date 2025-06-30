"use client";

import { motion } from "framer-motion";
import { LoadingState } from "@/types";

interface LoadingProps {
  loadingState: LoadingState;
}

export default function Loading({
  loadingState,
}: LoadingProps): React.JSX.Element | null {
  const { isLoading, progress } = loadingState;

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="w-4 h-4 bg-purple-400 rounded-full"
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-purple-400 rounded-full"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-lg font-medium"
        >
          Loading Portfolio...
        </motion.p>

        {/* Progress Percentage */}
        <p className="text-gray-400 text-sm mt-2">{progress}%</p>
      </div>
    </motion.div>
  );
}
