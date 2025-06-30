import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 12;
const INITIAL_SNAKE = [
  { x: 5, y: 6 },
  { x: 4, y: 6 },
];
const INITIAL_DIR = { x: 1, y: 0 };
const INITIAL_SPEED = 200;
const MIN_SPEED = 50;
const SPEED_STEP = 10;

function getRandomFood(snake: { x: number; y: number }[]) {
  let food: { x: number; y: number };
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [dir, setDir] = useState(INITIAL_DIR);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED); // initial slow speed
  const moveRef = useRef(dir);
  const playingRef = useRef(playing);

  useEffect(() => {
    moveRef.current = dir;
  }, [dir]);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowUp" && moveRef.current.y !== 1)
        setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && moveRef.current.y !== -1)
        setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && moveRef.current.x !== 1)
        setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && moveRef.current.x !== -1)
        setDir({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        // Check collision
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE ||
          prev.some((s) => s.x === head.x && s.y === head.y)
        ) {
          setPlaying(false);
          return prev;
        }
        let newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomFood(newSnake));
          setScore((s) => s + 1);
          setSpeed((sp) => Math.max(MIN_SPEED, sp - SPEED_STEP)); // speed up
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, speed);
    return () => clearInterval(interval);
  }, [dir, food, playing, speed]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIR);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setPlaying(true);
    setSpeed(INITIAL_SPEED); // reset speed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">Snake Game</h2>
      <p className="mb-4 text-gray-400">
        Use arrow keys to move. Eat food, avoid walls and yourself!
      </p>
      <div className="mb-4 text-lg">
        Score: <span className="font-bold text-purple-400">{score}</span>
      </div>
      <div className="bg-[#18171c] border border-gray-700 rounded-2xl shadow-lg p-4 flex flex-col items-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1.5rem)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1.5rem)`,
            gap: 2,
          }}
        >
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.some(
              (s, idx) => idx !== 0 && s.x === x && s.y === y
            );
            const isFood = food.x === x && food.y === y;
            return (
              <motion.div
                key={i}
                className={
                  "rounded-md border border-gray-800 " +
                  (isHead
                    ? "bg-purple-500"
                    : isBody
                    ? "bg-purple-300"
                    : isFood
                    ? "bg-green-400"
                    : "bg-[#232228]")
                }
                animate={{ scale: isFood ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: 22, height: 22 }}
              />
            );
          })}
        </div>
        {!playing && (
          <div className="flex flex-col items-center mt-6">
            <div className="text-lg text-gray-300 mb-2">Game Over!</div>
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
              onClick={restart}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
