"use client";
import WishCard from "./WishCard";

interface Entry {
  name: string;
  wish: string;
  timestamp: string;
}

interface Props {
  wishes: Entry[];
}

function parseDate(ts: string): number {
  const m = ts.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/);
  if (!m) return 0;
  return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime();
}

export default function WishList({ wishes }: Props) {
  const sorted = [...wishes].sort((a, b) => parseDate(b.timestamp) - parseDate(a.timestamp));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 24px",
          maxWidth: "960px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {sorted.length === 0 ? (
          <p style={{ color: "#ccc", textAlign: "center", marginTop: "80px", fontStyle: "italic", fontFamily: "'Nunito', sans-serif" }}>
            Chưa có lời chúc nào.
          </p>
        ) : (
          <div style={{ borderTop: "1px solid #ead8e1" }}>
            {sorted.map((entry, i) => (
              <WishCard key={i} index={i} name={entry.name} wish={entry.wish} timestamp={entry.timestamp} />
            ))}
          </div>
        )}
        <div style={{ height: "40px" }} />
      </div>
    </div>
  );
}
