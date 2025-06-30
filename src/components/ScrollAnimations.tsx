"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to various animation values
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 1], [100, -100]);
  const x = useTransform(smoothProgress, [0, 0.5, 1], [-100, 0, 100]);

  // Parallax effect for background elements
  const backgroundY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const backgroundScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1, 1.1, 1]
  );

  return (
    <div ref={containerRef} className="relative min-h-[200vh] overflow-hidden">
      {/* Background parallax elements */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-xl" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-500 rounded-full blur-xl" />
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-pink-500 rounded-full blur-xl" />
      </motion.div>

      {/* Main content section */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left column - Scale and rotate animation */}
            <motion.div
              style={{ scale, rotate }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  Scale & Rotate
                </span>
              </div>
              <p className="text-gray-400 text-center">
                This element scales and rotates based on scroll position
              </p>
            </motion.div>

            {/* Center column - Fade and slide animation */}
            <motion.div
              style={{ opacity, y }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  Fade & Slide
                </span>
              </div>
              <p className="text-gray-400 text-center">
                This element fades in/out and slides vertically
              </p>
            </motion.div>

            {/* Right column - Horizontal slide animation */}
            <motion.div
              style={{ x }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Slide X</span>
              </div>
              <p className="text-gray-400 text-center">
                This element slides horizontally across the screen
              </p>
            </motion.div>
          </div>

          {/* Progress indicator */}
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="fixed bottom-8 left-8 right-8 h-2 bg-gray-700 rounded-full origin-left"
          >
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
          </motion.div>

          {/* Floating elements with individual scroll tracking */}
          <FloatingElements />
        </div>
      </div>
    </div>
  );
}

// Component for floating elements with individual scroll tracking
function FloatingElements() {
  const elements = [
    { id: 1, color: "from-purple-400 to-purple-600", delay: 0 },
    { id: 2, color: "from-pink-400 to-pink-600", delay: 0.2 },
    { id: 3, color: "from-blue-400 to-blue-600", delay: 0.4 },
    { id: 4, color: "from-green-400 to-green-600", delay: 0.6 },
  ];

  return (
    <>
      {elements.map((element) => (
        <FloatingElement key={element.id} {...element} />
      ))}
    </>
  );
}

function FloatingElement({
  id,
  color,
  delay,
}: {
  id: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
        left: `${20 + (id - 1) * 15}%`,
        top: `${30 + (id - 1) * 10}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      className={`absolute w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
    >
      {id}
    </motion.div>
  );
}
