import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "react",
  "nextjs",
  "javascript",
  "frontend",
  "developer",
  "portfolio",
  "design",
  "motion",
  "tailwind",
  "typescript",
  "component",
  "cursor",
  "modern",
  "web",
  "challenge",
  "speed",
  "test",
  "keyboard",
  "animation",
  "visual",
];
const GAME_TIME = 30;

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function TypingSpeedTest() {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [totalTyped, setTotalTyped] = useState(0);
  const [correctTyped, setCorrectTyped] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [playing, setPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (playing && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0) setPlaying(false);
  }, [playing, timeLeft]);

  useEffect(() => {
    if (playing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [playing, currentWord]);

  const startGame = () => {
    setScore(0);
    setTotalTyped(0);
    setCorrectTyped(0);
    setTimeLeft(GAME_TIME);
    setPlaying(true);
    setCurrentWord(getRandomWord());
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.trim() === currentWord) {
      setScore((s) => s + 1);
      setCorrectTyped((c) => c + 1);
      setTotalTyped((t) => t + 1);
      setCurrentWord(getRandomWord());
      setInput("");
    } else if (e.target.value.length >= currentWord.length) {
      setTotalTyped((t) => t + 1);
      setCurrentWord(getRandomWord());
      setInput("");
    }
  };

  const wpm = Math.round((score / (GAME_TIME - timeLeft + 1)) * 60);
  const accuracy =
    totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">
        Typing Speed Test
      </h2>
      <p className="mb-4 text-gray-400">
        Type the words as fast as you can in 30 seconds!
      </p>
      <div className="flex items-center gap-8 mb-4">
        <span className="text-lg">
          WPM: <span className="font-bold text-purple-400">{wpm}</span>
        </span>
        <span className="text-lg">
          Accuracy:{" "}
          <span className="font-bold text-purple-400">{accuracy}%</span>
        </span>
        <span className="text-lg">
          Time: <span className="font-bold text-purple-400">{timeLeft}s</span>
        </span>
      </div>
      <div className="bg-[#18171c] border border-gray-700 rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        {playing ? (
          <>
            <motion.div
              key={currentWord}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-3xl font-bold text-gradient mb-6 select-none"
              style={{
                background: "linear-gradient(90deg, #a855f7, #b292ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentWord}
            </motion.div>
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-2 rounded-lg border-2 border-purple-400 bg-black text-white text-xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 text-center"
              value={input}
              onChange={handleInput}
              disabled={!playing}
              autoFocus
            />
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition mb-2"
              onClick={startGame}
            >
              {score > 0 ? "Play Again" : "Start Test"}
            </button>
            {score > 0 && (
              <div className="text-lg text-gray-300 mt-2 text-center">
                <div>
                  Final WPM:{" "}
                  <span className="font-bold text-purple-400">{wpm}</span>
                </div>
                <div>
                  Accuracy:{" "}
                  <span className="font-bold text-purple-400">{accuracy}%</span>
                </div>
                <div>
                  Words Correct:{" "}
                  <span className="font-bold text-purple-400">{score}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
