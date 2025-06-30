import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CatchTheDot from "./games/CatchTheDot";
import TypingSpeedTest from "./games/TypingSpeedTest";
import Snake from "./games/Snake";
import RockPaperScissors from "./games/RockPaperScissors";
import Pong from "./games/Pong";
import Breakout from "./games/Breakout";

const GAMES = [
  {
    key: "catch",
    name: "Catch the Dot",
    description:
      "Test your reflexes! Click the moving dot before it disappears. The faster you are, the higher your score.",
    difficulty: "Easy",
    controls: "Mouse Click",
    maxScore: "∞",
    icon: "🎯",
    color: "from-red-500 to-pink-500",
    component: <CatchTheDot />,
  },
  {
    key: "typing",
    name: "Typing Speed Test",
    description:
      "Improve your typing skills! Type the displayed words as quickly and accurately as possible.",
    difficulty: "Medium",
    controls: "Keyboard",
    maxScore: "∞",
    icon: "⌨️",
    color: "from-blue-500 to-cyan-500",
    component: <TypingSpeedTest />,
  },
  {
    key: "snake",
    name: "Snake Game",
    description:
      "Classic Snake! Control the snake to eat food and grow longer. Avoid hitting walls or yourself.",
    difficulty: "Medium",
    controls: "Arrow Keys",
    maxScore: "∞",
    icon: "🐍",
    color: "from-green-500 to-emerald-500",
    component: <Snake />,
  },
  {
    key: "rps",
    name: "Rock Paper Scissors",
    description:
      "Challenge the AI in this classic game! Choose rock, paper, or scissors and see who wins.",
    difficulty: "Easy",
    controls: "Mouse Click",
    maxScore: "∞",
    icon: "✂️",
    color: "from-purple-500 to-violet-500",
    component: <RockPaperScissors />,
  },
  {
    key: "pong",
    name: "Pong",
    description:
      "Retro Pong! Control your paddle with W/S keys to beat the AI. First to 5 points wins!",
    difficulty: "Hard",
    controls: "W/S Keys",
    maxScore: "5",
    icon: "🏓",
    color: "from-yellow-500 to-orange-500",
    component: <Pong />,
  },
  {
    key: "breakout",
    name: "Breakout",
    description:
      "Break all the bricks! Control the paddle to keep the ball in play and clear the screen.",
    difficulty: "Hard",
    controls: "Arrow Keys",
    maxScore: "∞",
    icon: "🧱",
    color: "from-indigo-500 to-purple-500",
    component: <Breakout />,
  },
];

export default function GamesSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-24">
      <h2 className="text-4xl font-bold text-purple-400 mb-8 text-center">
        Mini Games
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Take a break and enjoy these interactive mini-games! Each game tests
        different skills from reflexes to strategy.
      </p>

      <div className="flex flex-col items-center">
        {!selected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {GAMES.map((game) => (
              <motion.button
                key={game.key}
                className="group relative overflow-hidden bg-[#18171c] border border-gray-700 rounded-2xl shadow-lg hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(game.key)}
              >
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative p-6 text-left">
                  {/* Game icon and title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            game.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : game.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Game description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Game details */}
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Controls:</span>
                      <span className="text-gray-300">{game.controls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Score:</span>
                      <span className="text-gray-300">{game.maxScore}</span>
                    </div>
                  </div>

                  {/* Play button */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                      Click to Play →
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto"
            >
              <button
                className="mb-6 px-4 py-2 bg-gray-800 text-purple-300 rounded-full text-sm hover:bg-gray-700 transition flex items-center gap-2"
                onClick={() => setSelected(null)}
              >
                ← Back to Games
              </button>

              {/* Game header with info */}
              {(() => {
                const game = GAMES.find((g) => g.key === selected);
                if (!game) return null;

                return (
                  <div className="mb-6 p-4 bg-[#18171c] rounded-xl border border-gray-700">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-4xl">{game.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {game.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              game.difficulty === "Easy"
                                ? "bg-green-500/20 text-green-400"
                                : game.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {game.difficulty}
                          </span>
                          <span className="text-gray-400 text-sm">
                            • {game.controls}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{game.description}</p>
                  </div>
                );
              })()}

              {GAMES.find((g) => g.key === selected)?.component}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
