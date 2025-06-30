import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHOICES = [
  { key: "rock", label: "✊ Rock" },
  { key: "paper", label: "✋ Paper" },
  { key: "scissors", label: "✌️ Scissors" },
];

function getResult(user: string, ai: string) {
  if (user === ai) return "draw";
  if (
    (user === "rock" && ai === "scissors") ||
    (user === "paper" && ai === "rock") ||
    (user === "scissors" && ai === "paper")
  )
    return "win";
  return "lose";
}

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [aiChoice, setAiChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const play = (choice: string) => {
    const ai = CHOICES[Math.floor(Math.random() * 3)].key;
    setUserChoice(choice);
    setAiChoice(ai);
    const res = getResult(choice, ai);
    setResult(res);
    if (res === "win") setScore((s) => s + 1);
  };

  const reset = () => {
    setUserChoice(null);
    setAiChoice(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">
        Rock Paper Scissors
      </h2>
      <p className="mb-4 text-gray-400">
        Choose your move and play against the AI!
      </p>
      <div className="mb-4 text-lg">
        Score: <span className="font-bold text-purple-400">{score}</span>
      </div>
      <div className="flex gap-8 mb-8">
        {CHOICES.map((c) => (
          <motion.button
            key={c.key}
            className={`text-4xl px-6 py-4 rounded-xl border-2 border-purple-400 bg-[#18171c] hover:bg-purple-700/30 transition font-bold focus:outline-none ${
              userChoice === c.key ? "ring-4 ring-purple-400" : ""
            }`}
            whileTap={{ scale: 0.85 }}
            onClick={() => !userChoice && play(c.key)}
            disabled={!!userChoice}
          >
            {c.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {userChoice && aiChoice && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center">
                <span className="text-lg text-gray-400 mb-1">You</span>
                <span className="text-5xl">
                  {CHOICES.find((c) => c.key === userChoice)?.label}
                </span>
              </div>
              <span className="text-3xl text-purple-400 font-bold">vs</span>
              <div className="flex flex-col items-center">
                <span className="text-lg text-gray-400 mb-1">AI</span>
                <span className="text-5xl">
                  {CHOICES.find((c) => c.key === aiChoice)?.label}
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold mt-2">
              {result === "win" && (
                <span className="text-green-400">You Win!</span>
              )}
              {result === "lose" && (
                <span className="text-red-400">You Lose!</span>
              )}
              {result === "draw" && (
                <span className="text-yellow-400">Draw!</span>
              )}
            </div>
            <button
              className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
              onClick={reset}
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
