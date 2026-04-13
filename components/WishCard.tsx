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
      className="card-fadein py-6 border-b border-[#e5d8de]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs font-semibold tracking-widest uppercase text-[#9e6882]">
          {name || "Ẩn danh"}
        </span>
        {time && (
          <span className="text-xs text-[#bda8b1] ml-4 shrink-0">{time}</span>
        )}
      </div>
      <p className="text-[#3a2030] text-base leading-relaxed">{wish || "Chúc mừng!"}</p>
    </div>
  );
}
