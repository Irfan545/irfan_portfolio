import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-8 mt-16 border-t border-gray-800">
      <div className="flex space-x-6 mb-2">
        <a
          href="https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-2xl"
        >
          <FaGlobe />
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-2xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-2xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:your.email@example.com"
          className="text-purple-400 hover:text-purple-300 text-2xl"
        >
          <MdEmail />
        </a>
      </div>
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Irfan Mohammed. All rights reserved.
      </p>
    </footer>
  );
}
