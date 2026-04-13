"use client";
import { useState } from "react";

interface Props {
  name: string;
  wish: string;
  index: number;
  timestamp: string;
}

function formatTime(raw: string): string {
  // Format: DD/MM/YYYY HH:mm:ss
  const match = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);
  if (!match) return raw;
  const [, dd, mm, yyyy, hh, min] = match;
  const date = new Date(+yyyy, +mm - 1, +dd, +hh, +min);
  const now = new Date();
  const diffDays = Math.floor(
    (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      86400000
  );
  const time = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 0) return `Hôm nay, ${time}`;
  if (diffDays === 1) return `Hôm qua, ${time}`;
  return `${dd}/${mm}/${yyyy}, ${time}`;
}

export default function WishCard({ name, wish, index, timestamp }: Props) {
  const time = timestamp ? formatTime(timestamp) : "";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-fadein"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 60}ms`,
        padding: "24px 16px",
        borderBottom: "1px solid #ece4e8",
        borderRadius: "12px",
        marginBottom: "4px",
        transition: "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        background: hovered ? "rgba(233, 192, 210, 0.12)" : "transparent",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        boxShadow: hovered ? "0 2px 20px rgba(201,130,156,0.08)" : "none",
        cursor: "default",
      }}
    >
      {/* Name + time */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "10px" }}>
        <span
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hovered ? "#c9829c" : "#9e6882",
            transition: "color 0.3s ease",
          }}
        >
          {name || "Ẩn danh"}
        </span>
        {time && (
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              color: "#c9a8b8",
            }}
          >
            {time}
          </span>
        )}
      </div>

      {/* Wish text */}
      <p
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(16px, 2vw, 18px)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.8,
          color: hovered ? "#2a1020" : "#3a2030",
          margin: 0,
          transition: "color 0.3s ease",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {wish || "Chúc mừng!"}
      </p>
    </div>
  );
}
