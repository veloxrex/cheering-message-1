"use client";
import { useState } from "react";
import Image from "next/image";

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

export default function AlbumPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i! + IMAGES.length - 1) % IMAGES.length);
  const next = () => setLightbox((i) => (i! + 1) % IMAGES.length);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9e8ef 0%, #fdf8f6 40%, #f3e8f5 100%)",
        padding: "32px 24px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Card container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1160px",
          background: "#fdf8f6",
          borderRadius: "28px",
          boxShadow: "0 8px 40px rgba(201,130,156,0.13), 0 2px 8px rgba(74,32,56,0.06)",
          padding: "40px 32px 50px",
          minHeight: "80vh",
        }}
      >

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#c9829c",
          marginBottom: "10px",
        }}>
          ✦ &nbsp; Khoảnh khắc &nbsp; ✦
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 400,
          fontStyle: "italic",
          color: "#4a2038",
          margin: "0 0 8px",
        }}>
          Album ảnh
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", color: "#b0929e" }}>
          {IMAGES.length} khoảnh khắc đáng nhớ
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "12px",
        }}
      >
        {IMAGES.map((img, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              height: "200px",
              borderRadius: "12px",
              cursor: "pointer",
              backgroundImage: `url('/album/${encodeURIComponent(img)}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#f5eff2",
              boxShadow: "0 2px 12px rgba(201,130,156,0.08)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(201,130,156,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(201,130,156,0.08)";
            }}
          />
        ))}
      </div>

      </div>{/* /card */}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,8,15,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 20,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >‹</button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(95vw, 1200px)",
              height: "min(90vh, 900px)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Image
              src={`/album/${encodeURIComponent(IMAGES[lightbox])}`}
              alt={`Ảnh ${lightbox + 1}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="95vw"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 20,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              width: 48,
              height: 48,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >›</button>

          {/* Counter */}
          <div style={{
            position: "absolute",
            bottom: 20,
            fontFamily: "'Nunito', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
          }}>
            {lightbox + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </main>
  );
}
