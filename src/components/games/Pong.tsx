import { useState, useEffect, useRef } from "react";

const WIDTH = 400;
const HEIGHT = 240;
const PADDLE_H = 60;
const PADDLE_W = 10;
const BALL_SIZE = 14;
const PADDLE_SPEED = 6;
const BALL_SPEED = 4;

export default function Pong() {
  const [playerY, setPlayerY] = useState(HEIGHT / 2 - PADDLE_H / 2);
  const [aiY, setAiY] = useState(HEIGHT / 2 - PADDLE_H / 2);
  const [ball, setBall] = useState({
    x: WIDTH / 2,
    y: HEIGHT / 2,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
  });
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [playing, setPlaying] = useState(true);
  const keys = useRef({ w: false, s: false });

  useEffect(() => {
    if (!playing) return;
    const handleKey = (e: KeyboardEvent) => {
      const isDown = e.type === "keydown";
      if (e.key === "w" || e.key === "W") keys.current.w = isDown;
      if (e.key === "s" || e.key === "S") keys.current.s = isDown;
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
      // Player paddle
      setPlayerY((y) => {
        let ny = y;
        if (keys.current.w) ny -= PADDLE_SPEED;
        if (keys.current.s) ny += PADDLE_SPEED;
        return Math.max(0, Math.min(HEIGHT - PADDLE_H, ny));
      });
      // AI paddle
      setAiY((y) => {
        const target = ball.y - PADDLE_H / 2 + BALL_SIZE / 2;
        if (y < target)
          return Math.min(y + PADDLE_SPEED * 0.7, HEIGHT - PADDLE_H);
        if (y > target) return Math.max(y - PADDLE_SPEED * 0.7, 0);
        return y;
      });
      // Ball
      setBall((b) => {
        let { x, y, dx, dy } = b;
        x += dx;
        y += dy;
        // Top/bottom collision
        if (y <= 0 || y + BALL_SIZE >= HEIGHT) dy = -dy;
        // Player paddle collision
        if (
          x <= PADDLE_W &&
          y + BALL_SIZE > playerY &&
          y < playerY + PADDLE_H
        ) {
          dx = Math.abs(dx);
        }
        // AI paddle collision
        if (
          x + BALL_SIZE >= WIDTH - PADDLE_W &&
          y + BALL_SIZE > aiY &&
          y < aiY + PADDLE_H
        ) {
          dx = -Math.abs(dx);
        }
        // Score
        if (x < 0) {
          setScore((s) => ({ ...s, ai: s.ai + 1 }));
          return {
            x: WIDTH / 2,
            y: HEIGHT / 2,
            dx: BALL_SPEED,
            dy: BALL_SPEED,
          };
        }
        if (x > WIDTH) {
          setScore((s) => ({ ...s, player: s.player + 1 }));
          return {
            x: WIDTH / 2,
            y: HEIGHT / 2,
            dx: -BALL_SPEED,
            dy: BALL_SPEED,
          };
        }
        return { x, y, dx, dy };
      });
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [playing, playerY, aiY, ball]);

  const restart = () => {
    setPlayerY(HEIGHT / 2 - PADDLE_H / 2);
    setAiY(HEIGHT / 2 - PADDLE_H / 2);
    setBall({ x: WIDTH / 2, y: HEIGHT / 2, dx: BALL_SPEED, dy: BALL_SPEED });
    setScore({ player: 0, ai: 0 });
    setPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">Pong</h2>
      <p className="mb-4 text-gray-400">
        Use <span className="font-bold text-purple-300">W</span> and{" "}
        <span className="font-bold text-purple-300">S</span> to move your
        paddle. First to 5 wins!
      </p>
      <div className="mb-4 text-lg">
        You: <span className="font-bold text-purple-400">{score.player}</span>{" "}
        &nbsp;|&nbsp; AI:{" "}
        <span className="font-bold text-purple-400">{score.ai}</span>
      </div>
      <div
        className="relative bg-[#18171c] border border-gray-700 rounded-2xl shadow-lg"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        {/* Player paddle */}
        <div
          className="absolute left-0"
          style={{
            top: playerY,
            width: PADDLE_W,
            height: PADDLE_H,
            background: "#a855f7",
            borderRadius: 6,
          }}
        />
        {/* AI paddle */}
        <div
          className="absolute right-0"
          style={{
            top: aiY,
            width: PADDLE_W,
            height: PADDLE_H,
            background: "#b292ff",
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
      {(score.player >= 5 || score.ai >= 5) && (
        <div className="flex flex-col items-center mt-6">
          <div className="text-lg text-gray-300 mb-2 font-bold">
            {score.player >= 5 ? "You Win!" : "AI Wins!"}
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
