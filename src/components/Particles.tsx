"use client";

import { motion } from "framer-motion";

export default function Particles(): React.JSX.Element {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * window.innerWidth],
            y: [0, Math.random() * window.innerHeight],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
