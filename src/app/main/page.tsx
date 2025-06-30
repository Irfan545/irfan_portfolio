import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../animations/hero";
import ParticleAnimation from "../animations/particle";

export const Main = () => {
  return (
    <div>
      <div className="flex justify-between items-center width-80 h-150 pt-50 mb-20 ">
        {/* Particles Background */}
        <ParticleAnimation />
        <div>
          <HeroSection
            para="A Frontend Developer crafting clean, creative, and interactive web
          experiences."
            heading="Mohammad Irfan"
          />
        </div>
        {/* <Image src={irfan} alt="Irfan" className="irfan_image" /> */}
        <motion.img
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="Images/irfan.png"
          className="irfan_image"
          alt="Irfan"
        />
      </div>
    </div>
  );
};
