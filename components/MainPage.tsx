"use client";
import { useState } from "react";
import Image from "next/image";
import WishCard from "./WishCard";
import FloatingHearts from "./FloatingHearts";
import AutoRefresh from "./AutoRefresh";

interface Entry {
  name: string;
  wish: string;
  timestamp: string;
}

const IMAGES = [
  "4S8A2312.JPG","4S8A2490.JPG","4S8A2511.JPG","4S8A2565.JPG","4S8A2593.JPG",
  "4S8A2634.JPG","4S8A2639.JPG","4S8A2665.JPG","4S8A2719.JPG","4S8A2749.JPG",
  "4S8A2841.JPG","4S8A2865.JPG","4S8A2898.JPG","4S8A2960.JPG","4S8A3054.JPG",
  "4S8A3070 bia.JPG","4S8A3074.JPG","4S8A3138.JPG","4S8A3156.JPG","4S8A3185.JPG",
  "4S8A3194.JPG","4S8A3212.JPG","4S8A3235.JPG","4S8A3293.JPG","4S8A3383.JPG",
  "4S8A3417.JPG","4S8A3733.JPG","4S8A3839.JPG","4S8A3855.JPG","4S8A3885.JPG",
  "4S8A3915.JPG","4S8A3995.JPG","4S8A4044 cong.JPG","4S8A4068.JPG","4S8A4077.JPG",
  "4S8A4093.JPG","4S8A4113.JPG","4S8A4172.JPG","4S8A4204.JPG","4S8A4264.JPG",
  "4S8A4471.JPG","4S8A4511.JPG",
];

function parseDate(ts: string): number {
  if (!ts) return 0;
  const m = ts.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime();
}

export default function MainPage({ wishes }: { wishes: Entry[] }) {
  const [tab, setTab] = useState<"wishes" | "album">("wishes");
  const [preview, setPreview] = useState<number | null>(null);

  const sorted = [...wishes].sort((a, b) => parseDate(b.timestamp) - parseDate(a.timestamp));

  const prevImg = () => setPreview((i) => ((i ?? 0) + IMAGES.length - 1) % IMAGES.length);
  const nextImg = () => setPreview((i) => ((i ?? 0) + 1) % IMAGES.length);

  return (
    <main
      style={{
        background: "#fdf8f6",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <AutoRefresh interval={10000} />
      <FloatingHearts />

      {/* ── HEADER ── */}
      <header
        style={{
          flexShrink: 0,
          textAlign: "center",
          padding: "28px 24px 16px",
          background: "linear-gradient(180deg, #fff5f7 0%, #fdf8f6 100%)",
          borderBottom: "1px solid #ead8e1",
        }}
      >
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c9829c",
            marginBottom: "8px",
          }}
        >
          ✦ &nbsp; Khoảnh khắc &nbsp; ✦
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 5vw, 34px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#4a2038",
            margin: "0 0 16px",
          }}
        >
          {tab === "wishes" ? "Lời Chúc Mừng" : "Album Ảnh"}
        </h1>

        {/* Tab Switch */}
        <div
          style={{
            display: "inline-flex",
            background: "#f0e4e9",
            borderRadius: "999px",
            padding: "4px",
            gap: "4px",
          }}
        >
          <button
            onClick={() => setTab("wishes")}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: tab === "wishes" ? "#fff" : "transparent",
              color: tab === "wishes" ? "#c9829c" : "#b0929e",
              boxShadow: tab === "wishes" ? "0 1px 4px rgba(201,130,156,0.2)" : "none",
            }}
          >
            💌 Lời chúc
          </button>
          <button
            onClick={() => setTab("album")}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              background: tab === "album" ? "#fff" : "transparent",
              color: tab === "album" ? "#c9829c" : "#b0929e",
              boxShadow: tab === "album" ? "0 1px 4px rgba(201,130,156,0.2)" : "none",
            }}
          >
            📷 Album ảnh
          </button>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            color: "#b0929e",
            margin: "10px 0 0",
          }}
        >
          {tab === "wishes"
            ? `${wishes.length} lời chúc từ mọi người`
            : `${IMAGES.length} khoảnh khắc đáng nhớ`}
        </p>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>

        {/* WISHES TAB */}
        {tab === "wishes" && (
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
        )}

        {/* ALBUM TAB */}
        {tab === "album" && (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 16px 40px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                maxWidth: "1100px",
                margin: "0 auto",
                columns: "4 160px",
                columnGap: "10px",
                columnFill: "balance",
              }}
            >
              {IMAGES.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`/album_compressed/${encodeURIComponent(img)}`}
                  alt={`Ảnh ${i + 1}`}
                  onClick={() => setPreview(i)}
                  style={{
                    width: "100%",
                    display: "block",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    breakInside: "avoid",
                    boxShadow: "0 2px 10px rgba(201,130,156,0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                    (e.currentTarget as HTMLImageElement).style.boxShadow = "0 6px 20px rgba(201,130,156,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLImageElement).style.boxShadow = "0 2px 10px rgba(201,130,156,0.1)";
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── SMALL PREVIEW MODAL ── */}
      {preview !== null && (
        <div
          onClick={() => setPreview(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,8,15,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              maxWidth: "min(640px, 92vw)",
              width: "100%",
            }}
          >
            {/* X button */}
            <button
              onClick={() => setPreview(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                background: "rgba(0,0,0,0.45)",
                border: "none",
                borderRadius: "50%",
                width: 34,
                height: 34,
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
              aria-label="Đóng"
            >
              ×
            </button>

            {/* Image */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
              <Image
                src={`/album_compressed/${encodeURIComponent(IMAGES[preview])}`}
                alt={`Ảnh ${preview + 1}`}
                fill
                style={{ objectFit: "contain", background: "#111" }}
                sizes="640px"
              />
            </div>

            {/* Footer: prev / counter / next */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                background: "#fdf8f6",
                borderTop: "1px solid #ead8e1",
              }}
            >
              <button
                onClick={prevImg}
                style={{
                  background: "#f0e4e9",
                  border: "none",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "13px",
                  color: "#c9829c",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                ‹ Trước
              </button>

              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "13px",
                  color: "#b0929e",
                }}
              >
                {preview + 1} / {IMAGES.length}
              </span>

              <button
                onClick={nextImg}
                style={{
                  background: "#f0e4e9",
                  border: "none",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "13px",
                  color: "#c9829c",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Sau ›
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
