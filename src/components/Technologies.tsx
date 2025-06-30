import { useRef } from "react";
import { motion } from "framer-motion";
import { FaReact, FaFigma, FaNodeJs, FaGithub, FaDocker } from "react-icons/fa";
import {
  SiNextdotjs,
  SiJest,
  SiTestinglibrary,
  SiTypescript,
  SiJavascript,
  SiNginx,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
} from "react-icons/si";

const techData = [
  {
    title: "Front-end Engineer Design",
    items: [
      { icon: <FaReact className="text-cyan-400" />, label: "React JS" },
      { icon: <SiNextdotjs className="text-gray-200" />, label: "Next.JS" },
      { icon: <FaFigma className="text-pink-400" />, label: "Figma" },
      { icon: <SiJest className="text-pink-600" />, label: "Jest" },
      {
        icon: <SiTestinglibrary className="text-red-400" />,
        label: "React Testing Library",
      },
    ],
  },
  {
    title: "Languages",
    items: [
      {
        icon: <SiJavascript className="text-yellow-300" />,
        label: "Javascript",
      },
      { icon: <SiTypescript className="text-blue-400" />, label: "Typescript" },
    ],
  },
  {
    title: "Devops",
    items: [
      { icon: <FaGithub className="text-gray-200" />, label: "Github Actions" },
      { icon: <SiNginx className="text-green-500" />, label: "Nginx" },
      { icon: <FaDocker className="text-blue-400" />, label: "Docker" },
    ],
  },
  {
    title: "Back-end",
    items: [
      { icon: <FaNodeJs className="text-green-400" />, label: "Node.js" },
      { icon: <SiPostgresql className="text-blue-500" />, label: "PostgreSQL" },
      { icon: <SiMongodb className="text-green-600" />, label: "MongoDB" },
      { icon: <SiFirebase className="text-yellow-400" />, label: "Firebase" },
    ],
  },
];

export default function Technologies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-24 px-4">
      <h2 className="text-5xl md:text-6xl font-light text-center mb-20 text-gray-100">
        These are the{" "}
        <span className="block">technologies I&apos;ve been using</span>
      </h2>
      <div
        ref={scrollRef}
        style={{ overflowX: "auto", overflowY: "visible", maxWidth: "100vw" }}
        className="scrollbar-hide"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {techData.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ root: scrollRef, once: true, amount: 0.3 }}
              className="bg-[#18171c] border border-gray-700 rounded-2xl p-8 flex flex-col min-h-[220px]"
            >
              <h3 className="text-lg font-medium text-gray-200 mb-6">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-300 text-base">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
