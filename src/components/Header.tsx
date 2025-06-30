"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/utils";

export default function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = NAVIGATION_ITEMS.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "hidden md:flex nav-container fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-[#18171c]/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full transition-all duration-300",
          isScrolled && "bg-[#18171c]/90 backdrop-blur-2xl border-white/30"
        )}
      >
        <nav className="flex justify-center items-center h-12">
          <ul className="flex items-center space-x-12">
            {NAVIGATION_ITEMS.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "text-white font-medium transition-all duration-300 relative",
                    "hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent",
                    activeSection === item.id && "text-purple-400"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "flex md:hidden fixed top-4 left-1/2 m-nav-container -translate-x-1/2 w-[95vw] px-2 py-2 bg-[#18171c]/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full justify-center z-50"
        )}
      >
        <nav className="flex justify-center items-center h-12">
          <ul className="flex items-center space-x-6">
            {NAVIGATION_ITEMS.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "text-white font-medium transition-all duration-300 relative",
                    "hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent",
                    activeSection === item.id && "text-purple-400"
                  )}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.header>
    </>
  );
}
