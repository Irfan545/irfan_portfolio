import { useState, useEffect, useRef } from "react";

const WIDTH = 400;
const HEIGHT = 300;
const PADDLE_W = 70;
const PADDLE_H = 12;
const BALL_SIZE = 12;
const BRICK_ROWS = 4;
const BRICK_COLS = 8;
const BRICK_W = 44;
const BRICK_H = 18;
const BALL_SPEED = 4;

function createBricks() {
  return Array.from({ length: BRICK_ROWS * BRICK_COLS }, (_, i) => ({
    x: (i % BRICK_COLS) * (BRICK_W + 4) + 8,
    y: Math.floor(i / BRICK_COLS) * (BRICK_H + 4) + 30,
    broken: false,
  }));
}

export default function Breakout() {
  const [paddleX, setPaddleX] = useState(WIDTH / 2 - PADDLE_W / 2);
  const [ball, setBall] = useState({
    x: WIDTH / 2,
    y: HEIGHT - 40,
    dx: BALL_SPEED,
    dy: -BALL_SPEED,
  });
  const [bricks, setBricks] = useState(createBricks());
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const keys = useRef({ left: false, right: false });

  useEffect(() => {
    if (!playing) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keys.current.left = e.type === "keydown";
      if (e.key === "ArrowRight") keys.current.right = e.type === "keydown";
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      // Paddle movement
      setPaddleX((x) => {
        let nx = x;
        if (keys.current.left) nx -= 7;
        if (keys.current.right) nx += 7;
        return Math.max(0, Math.min(WIDTH - PADDLE_W, nx));
      });
      // Ball movement
      setBall((b) => {
        let { x, y, dx, dy } = b;
        x += dx;
        y += dy;
        // Wall collision
        if (x <= 0 || x + BALL_SIZE >= WIDTH) dx = -dx;
        if (y <= 0) dy = -dy;
        // Paddle collision
        if (
          y + BALL_SIZE >= HEIGHT - PADDLE_H &&
          x + BALL_SIZE > paddleX &&
          x < paddleX + PADDLE_W
        ) {
          dy = -Math.abs(dy);
        }
        // Brick collision
        setBricks((prev) => {
          let hit = false;
          const newBricks = prev.map((brick) => {
            if (
              !brick.broken &&
              x + BALL_SIZE > brick.x &&
              x < brick.x + BRICK_W &&
              y + BALL_SIZE > brick.y &&
              y < brick.y + BRICK_H
            ) {
              hit = true;
              setScore((s) => s + 1);
              dy = -dy;
              return { ...brick, broken: true };
            }
            return brick;
          });
          return newBricks;
        });
        // Lose
        if (y > HEIGHT) setPlaying(false);
        return { x, y, dx, dy };
      });
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [playing, paddleX]);

  // Win
  useEffect(() => {
    if (bricks.every((b) => b.broken) && playing) setPlaying(false);
  }, [bricks, playing]);

  const restart = () => {
    setPaddleX(WIDTH / 2 - PADDLE_W / 2);
    setBall({ x: WIDTH / 2, y: HEIGHT - 40, dx: BALL_SPEED, dy: -BALL_SPEED });
    setBricks(createBricks());
    setScore(0);
    setPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">Breakout</h2>
      <p className="mb-4 text-gray-400">
        Move paddle with ←/→. Break all bricks to win!
      </p>
      <div className="mb-4 text-lg">
        Score: <span className="font-bold text-purple-400">{score}</span>
      </div>
      <div
        className="relative bg-[#18171c] border border-gray-700 rounded-2xl shadow-lg"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        {/* Bricks */}
        {bricks.map((b, i) =>
          !b.broken ? (
            <div
              key={i}
              className="absolute bg-purple-400 border border-purple-700 rounded-md"
              style={{ left: b.x, top: b.y, width: BRICK_W, height: BRICK_H }}
            />
          ) : null
        )}
        {/* Paddle */}
        <div
          className="absolute"
          style={{
            left: paddleX,
            top: HEIGHT - PADDLE_H,
            width: PADDLE_W,
            height: PADDLE_H,
            background: "#a855f7",
            borderRadius: 6,
          }}
        />
        {/* Ball */}
        <div
          className="absolute"
          style={{
            left: ball.x,
            top: ball.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
            background: "#fff",
            borderRadius: 9999,
          }}
        />
      </div>
      {!playing && (
        <div className="flex flex-col items-center mt-6">
          <div className="text-lg text-gray-300 mb-2 font-bold">
            {bricks.every((b) => b.broken) ? "You Win!" : "Game Over!"}
          </div>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
            onClick={restart}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
