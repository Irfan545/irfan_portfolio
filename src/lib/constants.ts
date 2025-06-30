import { 
  FaJsSquare, 
  FaReact, 
  FaHtml5, 
  FaCss3Alt, 
  FaGitAlt, 
  FaNodeJs 
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb, 
  SiPostgresql 
} from "react-icons/si";
import { Skill, NavigationItem } from "@/types";

export const SITE_CONFIG = {
  title: "Mohammad Irfan - Frontend Developer",
  description: "A Frontend Developer crafting clean, creative, and interactive web experiences.",
  author: "Mohammad Irfan",
  url: "https://irfan-portfolio.com",
} as const;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "about",
    label: "About",
    href: "#about",
  },
  {
    id: "education",
    label: "Education", 
    href: "#education",
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
  },
  {
    id: "social",
    label: "Social Media",
    href: "#social",
  },
];

export const SKILLS_DATA: Skill[] = [
  {
    id: "javascript",
    icon: FaJsSquare,
    title: "JavaScript",
    backgroundColor: "bg-lime-200",
    iconColor: "#facc15",
    description: "ES6+, Modern JavaScript features",
  },
  {
    id: "typescript",
    icon: SiTypescript,
    title: "TypeScript",
    backgroundColor: "bg-blue-200",
    iconColor: "#3178c6",
    description: "Type-safe JavaScript development",
  },
  {
    id: "react",
    icon: FaReact,
    title: "React",
    backgroundColor: "bg-sky-800",
    iconColor: "#60a5fa",
    description: "Modern React with Hooks",
  },
  {
    id: "nextjs",
    icon: SiNextdotjs,
    title: "Next.js",
    backgroundColor: "bg-gray-300",
    iconColor: "#111",
    description: "Full-stack React framework",
  },
  {
    id: "html5",
    icon: FaHtml5,
    title: "HTML5",
    backgroundColor: "bg-orange-200",
    iconColor: "#e34f26",
    description: "Semantic HTML markup",
  },
  {
    id: "css3",
    icon: FaCss3Alt,
    title: "CSS3",
    backgroundColor: "bg-blue-200",
    iconColor: "#1572b6",
    description: "Modern CSS with Flexbox/Grid",
  },
  {
    id: "tailwind",
    icon: SiTailwindcss,
    title: "Tailwind CSS",
    backgroundColor: "bg-cyan-200",
    iconColor: "#06b6d4",
    description: "Utility-first CSS framework",
  },
  {
    id: "nodejs",
    icon: FaNodeJs,
    title: "Node.js",
    backgroundColor: "bg-green-200",
    iconColor: "#339933",
    description: "Server-side JavaScript",
  },
  {
    id: "git",
    icon: FaGitAlt,
    title: "Git",
    backgroundColor: "bg-red-200",
    iconColor: "#f05032",
    description: "Version control system",
  },
  {
    id: "mongodb",
    icon: SiMongodb,
    title: "MongoDB",
    backgroundColor: "bg-green-200",
    iconColor: "#47a248",
    description: "NoSQL database",
  },
  {
    id: "postgresql",
    icon: SiPostgresql,
    title: "PostgreSQL",
    backgroundColor: "bg-blue-200",
    iconColor: "#336791",
    description: "Relational database",
  },
];

export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

export const LOADING_DELAY = 2000; // 2 seconds 