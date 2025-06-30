"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SKILLS_DATA } from "@/lib/constants";
import { SkillCardProps } from "@/types";
import { cn, formatExperience } from "@/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const { icon: Icon, title, backgroundColor, iconColor, description } = skill;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-2xl h-48 flex flex-col justify-center items-center p-6",
        "transition-all duration-300 cursor-pointer",
        "hover:shadow-xl hover:shadow-purple-500/20",
        backgroundColor
      )}
    >
      <Icon size={60} color={iconColor} className="mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 text-center">{description}</p>
      )}
    </motion.div>
  );
};

export default function Skills(): React.JSX.Element {
  const experienceYears = 2;

  return (
    <section
      id="skills"
      className="bg-transparent text-white py-16 px-4 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-12 mb-12 pt-6">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:w-1/3"
          >
            <p className="text-sm text-gray-400 mb-1">
              {formatExperience(experienceYears)} of
            </p>
            <h2 className="text-4xl font-bold mb-2">Experience</h2>
            <p className="text-sm text-gray-500">
              with the most popular frontend ecosystem technologies.
            </p>
          </motion.div>

          {/* Skills Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3 pb-10 "
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              spaceBetween={30}
              slidesPerView={1.2}
              speed={500}
              breakpoints={{
                640: {
                  slidesPerView: 2.2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3.5,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              className="skills-swiper"
            >
              {SKILLS_DATA.map((skill) => (
                <SwiperSlide key={skill.id}>
                  <SkillCard skill={skill} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .skills-swiper .swiper-pagination {
          height: 20px;
          margin-top: 20px;
          position: static !important;
        }
      `}</style>
    </section>
  );
}
