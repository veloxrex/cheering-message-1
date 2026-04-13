"use client";
import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  char: string;
}

const CHARS = ["♥", "♡", "❤", "💕", "💗", "💓"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 12 + 12,
      delay: Math.random() * 14,
      opacity: Math.random() * 0.1 + 0.04,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
    }));
    setHearts(initial);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(100vh) scale(0.8) rotate(-10deg); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-10vh) scale(1.1) rotate(10deg); opacity: 0; }
        }
        .floating-heart {
          position: fixed;
          pointer-events: none;
          animation: floatUp linear infinite;
          z-index: 0;
          user-select: none;
        }
      `}</style>

      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            color: "#c9829c",
          }}
        >
          {h.char}
        </span>
      ))}
    </>
  );
}
