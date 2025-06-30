import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CatchTheDot from "./games/CatchTheDot";

const GAMES = [
  { key: "catch", name: "Catch the Dot", component: <CatchTheDot /> },
  // Add more games here later
];

export default function GamesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#18171c] rounded-2xl shadow-2xl p-6 w-full max-w-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 text-2xl font-bold focus:outline-none"
              onClick={onClose}
              aria-label="Close games modal"
            >
              &times;
            </button>
            {!selected ? (
              <>
                <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
                  Mini Games
                </h2>
                <div className="flex flex-col gap-4">
                  {GAMES.map((game) => (
                    <button
                      key={game.key}
                      className="w-full px-6 py-3 bg-purple-700/80 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition shadow-md"
                      onClick={() => setSelected(game.key)}
                    >
                      {game.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button
                  className="mb-4 px-4 py-1 bg-gray-800 text-purple-300 rounded-full text-sm hover:bg-gray-700 transition"
                  onClick={() => setSelected(null)}
                >
                  ← Back to Games
                </button>
                {GAMES.find((g) => g.key === selected)?.component}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
