import React from "react";
import { motion } from "framer-motion";
import Hero from "../../components/Hero";
import Particles from "../../components/Particles";

export default function Main() {
  return (
    <div>
      <div className="flex justify-between items-center width-80 h-150 pt-50 mb-20">
        {/* Particles Background */}
        <Particles />
        <div>
          <Hero
            heading="Mohammad Irfan"
            description="A Frontend Developer crafting clean, creative, and interactive web experiences."
            imageSrc="/Images/irfan.png"
            imageAlt="Mohammad Irfan - Frontend Developer"
          />
        </div>
        {/* <Image src={irfan} alt="Irfan" className="irfan_image" /> */}
        <img
          src="/Images/irfan.png"
          className="irfan_image animate-fade-in-up"
          alt="Irfan"
        />
      </div>
    </div>
  );
}
