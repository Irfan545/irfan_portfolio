import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const GAME_TIME = 20; // seconds
const DOT_SIZE = 48;

export default function CatchTheDot() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [dotPos, setDotPos] = useState({ x: 100, y: 100 });
  const [playing, setPlaying] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Move dot to a random position within the game area
  const moveDot = () => {
    const area = gameAreaRef.current;
    if (!area) return;
    const areaRect = area.getBoundingClientRect();
    const maxX = areaRect.width - DOT_SIZE;
    const maxY = areaRect.height - DOT_SIZE;
    setDotPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setPlaying(true);
    moveDot();
  };

  // Handle dot click
  const handleDotClick = () => {
    setScore((s) => s + 1);
    moveDot();
  };

  // Timer effect
  useEffect(() => {
    if (!playing) return;
    if (timeLeft === 0) {
      setPlaying(false);
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current!);
  }, [playing, timeLeft]);

  // Reset dot position on resize
  useEffect(() => {
    if (!playing) return;
    const handleResize = () => moveDot();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [playing]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">
        Catch the Dot!
      </h2>
      <p className="mb-4 text-gray-400">
        Click the moving dot as many times as you can in 20 seconds.
      </p>
      <div className="flex items-center gap-8 mb-4">
        <span className="text-lg">
          Score: <span className="font-bold text-purple-400">{score}</span>
        </span>
        <span className="text-lg">
          Time: <span className="font-bold text-purple-400">{timeLeft}s</span>
        </span>
      </div>
      <div
        ref={gameAreaRef}
        className="relative bg-[#18171c] rounded-xl border border-gray-700 shadow-lg"
        style={{ width: 400, height: 400, maxWidth: "90vw", maxHeight: "60vw" }}
      >
        {playing && (
          <motion.button
            className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 shadow-lg border-2 border-white focus:outline-none"
            style={{ left: dotPos.x, top: dotPos.y }}
            whileTap={{ scale: 0.8 }}
            animate={{ left: dotPos.x, top: dotPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={handleDotClick}
            aria-label="Catch the dot"
          />
        )}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition mb-2"
              onClick={startGame}
            >
              {score > 0 ? "Play Again" : "Start Game"}
            </button>
            {score > 0 && (
              <div className="text-lg text-gray-300">
                Final Score:{" "}
                <span className="font-bold text-purple-400">{score}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
