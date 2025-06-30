"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { HeroSectionProps } from "@/types";
import { ANIMATION_CONFIG } from "@/lib/constants";

interface HeroProps extends HeroSectionProps {
  className?: string;
}

export default function Hero({
  heading,
  description,
  imageSrc,
  imageAlt,
  className = "",
}: HeroProps): React.JSX.Element {
  const words = [
    "Frontend Developer",
    "React Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  return (
    <section
      className={`min-h-screen flex items-center justify-center ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div {...ANIMATION_CONFIG.slideInLeft} className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              {heading}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              <span>I'm a </span>
              <span className="text-purple-400 font-semibold">
                <Typewriter
                  words={words}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-400 max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-purple-600 text-purple-400 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-colors duration-300"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            {...ANIMATION_CONFIG.slideInRight}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-96 h-96 relative">
              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
                    <path d="M0.77,0.59Q0.7,0.78,0.5,0.85Q0.3,0.92,0.18,0.76Q0.06,0.6,0.13,0.39Q0.2,0.18,0.41,0.13Q0.62,0.08,0.77,0.23Q0.92,0.38,0.77,0.59Z" />
                  </clipPath>
                </defs>
                <image
                  href="/Images/irfan.png"
                  width="320"
                  height="320"
                  clipPath="url(#blobClip)"
                  preserveAspectRatio="xMidYMid cover"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
