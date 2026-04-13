"use client";

interface Props {
  name: string;
  wish: string;
  index: number;
  timestamp: string;
}

function relativeTime(raw: string): string {
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
  if (diffDays === 0)
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Hôm qua";
  return `${diffDays} ngày trước`;
}

export default function WishCard({ name, wish, index, timestamp }: Props) {
  const time = timestamp ? relativeTime(timestamp) : "";

  return (
    <div
      className="card-fadein"
      style={{
        animationDelay: `${index * 60}ms`,
        padding: "28px 0",
        borderBottom: "1px solid #ead8e1",
      }}
    >
      {/* Name + time row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Avatar initial */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e8b4c8, #c9829c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "14px",
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {(name || "A")[0].toUpperCase()}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#9e6882",
            }}
          >
            {name || "Ẩn danh"}
          </span>
        </div>

        {time && (
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              color: "#c9a8b8",
              letterSpacing: "0.05em",
            }}
          >
            {time}
          </span>
        )}
      </div>

      {/* Quote mark */}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "56px",
          lineHeight: "20px",
          color: "#e0b8ca",
          marginBottom: "12px",
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Wish text */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(18px, 2.5vw, 22px)",
          lineHeight: 1.7,
          color: "#3a2030",
          fontStyle: "italic",
          margin: "0",
        }}
      >
        {wish || "Chúc mừng!"}
      </p>
    </div>
  );
}
