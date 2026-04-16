"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ── Lưới căn chỉnh ──────────────────────────────────────────────────────────
const LX = [15, 60, 105];
const RX = [188, 233, 278];
const RY = [94, 144, 185, 225, 265, 307, 350, 396, 435];

// Nhà trai = bên trái (LX), nhà gái = bên phải (RX)
const NHA_TRAI_IDS = new Set([3,7,8,9,13,14,15,18,19,22,23,24,28,29,30,35,36,37,41,42,43]);
const BAN_PHU_IDS = new Set([1, 2]);

const TABLES = [
  { id: 1,  cx: LX[0], cy: RY[0], r: 15 },
  { id: 2,  cx: LX[1], cy: RY[0], r: 15 },
  { id: 3,  cx: LX[2], cy: RY[0], r: 15 },
  { id: 4,  cx: RX[0], cy: RY[0], r: 15 },
  { id: 5,  cx: RX[1], cy: RY[0], r: 15 },
  { id: 6,  cx: RX[2], cy: RY[0], r: 15 },
  { id: 7,  cx: LX[0], cy: RY[1], r: 15 },
  { id: 8,  cx: LX[1], cy: RY[1], r: 15 },
  { id: 9,  cx: LX[2], cy: RY[1], r: 15 },
  { id: 10, cx: RX[0], cy: RY[1], r: 15 },
  { id: 11, cx: RX[1], cy: RY[1], r: 15 },
  { id: 12, cx: RX[2], cy: RY[1], r: 15 },
  { id: 13, cx: LX[0], cy: RY[2], r: 15 },
  { id: 14, cx: LX[1], cy: RY[2], r: 15 },
  { id: 15, cx: LX[2], cy: RY[2], r: 15 },
  { id: 16, cx: RX[0], cy: RY[2], r: 15 },
  { id: 17, cx: RX[1], cy: RY[2], r: 15 },
  { id: 18, cx: LX[1], cy: RY[3], r: 15 },
  { id: 19, cx: LX[2], cy: RY[3], r: 15 },
  { id: 20, cx: RX[0], cy: RY[3], r: 15 },
  { id: 21, cx: RX[1], cy: RY[3], r: 15 },
  { id: 22, cx: LX[0], cy: RY[4], r: 15 },
  { id: 23, cx: LX[1], cy: RY[4], r: 15 },
  { id: 24, cx: LX[2], cy: RY[4], r: 15 },
  { id: 25, cx: RX[0], cy: RY[4], r: 15 },
  { id: 26, cx: RX[1], cy: RY[4], r: 15 },
  { id: 27, cx: RX[2], cy: RY[4], r: 15 },
  { id: 28, cx: LX[0], cy: RY[5], r: 15 },
  { id: 29, cx: LX[1], cy: RY[5], r: 15 },
  { id: 30, cx: LX[2], cy: RY[5], r: 15 },
  { id: 31, cx: RX[0], cy: RY[5], r: 15 },
  { id: 32, cx: RX[1], cy: RY[5], r: 15 },
  { id: 33, cx: RX[2], cy: RY[5], r: 15 },
  { id: 34, cx: RX[2], cy: RY[6], r: 15 },
  { id: 35, cx: LX[0], cy: RY[7], r: 15 },
  { id: 36, cx: LX[1], cy: RY[7], r: 15 },
  { id: 37, cx: LX[2], cy: RY[7], r: 15 },
  { id: 38, cx: RX[0], cy: RY[7], r: 15 },
  { id: 39, cx: RX[1], cy: RY[7], r: 15 },
  { id: 40, cx: RX[2], cy: RY[7], r: 15 },
  { id: 41, cx: LX[0], cy: RY[8], r: 15 },
  { id: 42, cx: LX[1], cy: RY[8], r: 15 },
  { id: 43, cx: LX[2], cy: RY[8], r: 15 },
  { id: 44, cx: RX[0], cy: RY[8], r: 15 },
  { id: 45, cx: RX[1], cy: RY[8], r: 15 },
  { id: 46, cx: RX[2], cy: RY[8], r: 15 },
];

export default function PositionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathParam = searchParams.get("path");
  const initialTab = pathParam === "position" ? "seating" : pathParam === "agenda" ? "agenda" : pathParam === "menu" ? "menu" : "seating";
  const [tab, setTab] = useState<"seating" | "agenda" | "menu">(initialTab);

  const switchTab = (t: "seating" | "agenda" | "menu") => {
    setTab(t);
    const paramVal = t === "seating" ? "position" : t;
    router.replace(`/information?path=${paramVal}`, { scroll: false });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf8f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 20px 56px",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* ── Tab bar ── */}
      <div style={{
        display: "flex",
        background: "#f0e4e9",
        borderRadius: 999,
        padding: "4px",
        marginBottom: "24px",
        width: "100%",
        maxWidth: 480,
        boxSizing: "border-box",
        gap: "4px",
      }}>
        {(["seating", "agenda", "menu"] as const).map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                flex: 1,
                padding: "8px 0",
                border: "none",
                borderRadius: 999,
                background: active ? "white" : "transparent",
                color: active ? "#c9829c" : "#b0929e",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Manrope', sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: active ? "0 1px 4px rgba(201,130,156,0.2)" : "none",
              }}
            >
              {t === "seating" ? "Sơ đồ chỗ ngồi" : t === "agenda" ? "Lịch trình" : "Thực đơn"}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Sơ đồ chỗ ngồi ── */}
      {tab === "seating" && (
      <>
      <div style={{
        background: "white",
        borderRadius: 28,
        boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 8px 40px rgba(0,0,0,0.06)",
        padding: "28px 20px 28px",
        width: "100%",
        maxWidth: 480,
        boxSizing: "border-box",
      }}>
        <svg viewBox="0 0 330 480" width="100%" style={{ display: "block", height: "auto" }}>
          <defs>
            <linearGradient id="stageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2f50" />
              <stop offset="100%" stopColor="#0d1f3c" />
            </linearGradient>
            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#00000018" />
            </filter>
            <filter id="selShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0d1f3c" floodOpacity="0.4" />
            </filter>
          </defs>

          <g transform="translate(16, 0)">
            {/* White SVG bg */}
            <rect x="-16" y="0" width="330" height="480" fill="white" />

            {/* ── Lối đi dọc (đường ngăn cách giữa) ── */}
            <line x1="146" y1="72" x2="146" y2="460" stroke="#b0b8c8" strokeWidth="2" strokeDasharray="6 3" />

            {/* ── Lối đi ngang (hàng ngang phân cách) ── */}
            <line x1="1" y1="352" x2="129" y2="352" stroke="#b0b8c8" strokeWidth="2" strokeDasharray="6 3" />

            {/* ── Nhà vệ sinh ── */}
            <rect x="261" y="192" width="33" height="24" rx="6" fill="#f0f2f5" stroke="#dde0e5" strokeWidth="1" />
            <text x="277.5" y="201" textAnchor="middle" fontSize="5" fontWeight="700" fill="#8a9bb0" fontFamily="Helvetica" letterSpacing="0.3">NHÀ</text>
            <text x="277.5" y="210" textAnchor="middle" fontSize="5" fontWeight="700" fill="#8a9bb0" fontFamily="Helvetica" letterSpacing="0.3">VỆ SINH</text>

            {/* ── Máy lạnh ── */}
            <rect x="1" y="215.2" width="21.7" height="19.57" rx="4" fill="#eff8ff" stroke="#bae0ff" strokeWidth="1" />
            <line x1="4" y1="221" x2="19.7" y2="221" stroke="#60b8f5" strokeWidth="1" />
            <line x1="6" y1="226" x2="17.7" y2="226" stroke="#60b8f5" strokeWidth="0.8" />
            <line x1="6" y1="229" x2="17.7" y2="229" stroke="#60b8f5" strokeWidth="0.8" />
            <text x="11.85" y="219.5" textAnchor="middle" fontSize="5" fill="#60b8f5" fontFamily="Helvetica">❄</text>

            {/* ── Sân khấu ── */}
            <rect x="66" y="10" width="160" height="46" rx="10" fill="url(#stageGrad)" filter="url(#cardShadow)" />
            {/* Triangle pointer */}
            <polygon points="137,56 146,68 155,56" fill="#0d1f3c" />
            <text x="146" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="Helvetica" letterSpacing="3">
              S T A G E
            </text>
            <text x="146" y="46" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Helvetica" letterSpacing="1">
              Sân khấu
            </text>

            {/* ── 46 bàn ── */}
            {TABLES.map((t) => {
              const isPhu  = BAN_PHU_IDS.has(t.id);
              const isTrai = !isPhu && NHA_TRAI_IDS.has(t.id);
              const bg     = isPhu ? "#f0f0f0" : isTrai ? "#e8f5e9" : "#fde8ec";
              const stroke = isPhu ? "#bdbdbd" : isTrai ? "#81c784" : "#f4a0b4";
              const color  = isPhu ? "#757575" : isTrai ? "#1b5e20" : "#8b2252";
              return (
                <g key={t.id} filter="url(#cardShadow)">
                  <rect
                    x={t.cx - t.r}
                    y={t.cy - t.r}
                    width={t.r * 2}
                    height={t.r * 2}
                    rx={6}
                    ry={6}
                    fill={bg}
                    stroke={stroke}
                    strokeWidth="1"
                  />
                  <text
                    x={t.cx}
                    y={t.cy + 4}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={color}
                    fontWeight="700"
                    fontFamily="'Manrope', sans-serif"
                  >
                    {t.id}
                  </text>
                </g>
              );
            })}

            {/* ── Chữ lối đi (render sau bàn để không bị đè) ── */}
            <text x="159" y="270" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b0b8c8" fontFamily="'Manrope', sans-serif" letterSpacing="1" transform="rotate(-90, 159, 270)">L Ố I  Đ I</text>
            <text x="65" y="348" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b0b8c8" fontFamily="'Manrope', sans-serif" letterSpacing="1">L Ố I  Đ I</text>
          </g>
        </svg>

        {/* ── Nhà trai / Nhà gái labels ── */}
        <div style={{ display: "flex", marginTop: 10 }}>
          <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Manrope', sans-serif" }}>Nhà trai</div>
          <div style={{ width: 36 }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Manrope', sans-serif" }}>Nhà gái</div>
        </div>
      </div>

      {/* ── Chú thích ── */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {[
          { fill: "#e8f5e9", stroke: "#81c784", label: "Nhà trai" },
          { fill: "#fde8ec", stroke: "#f4a0b4", label: "Nhà gái" },
          { fill: "#f0f0f0", stroke: "#bdbdbd", label: "Bàn phụ" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#b0929e", fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, background: l.fill, border: `2px solid ${l.stroke}`, flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
      </>
      )}

      {/* ── Tab: Lịch trình ── */}
      {tab === "agenda" && (<>
        <div style={{
          width: "100%",
          maxWidth: 480,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          {[
            { time: "5:30 – 7:00", title: "Đón khách", desc: "Tiếp đón và hướng dẫn chỗ ngồi", emoji: "🎉" },
            { time: "7:00 – 7:30", title: "Làm lễ", desc: "Nghi lễ cưới chính thức", emoji: "💍" },
            { time: "7:30 – 9:00", title: "Tiệc mừng", desc: "Tiệc chung vui cùng gia đình và bạn bè", emoji: "🥂" },
            { time: "9:00", title: "Kết thúc", desc: "Cảm ơn và tiễn khách", emoji: "🙏" },
          ].map((item, i) => (
            <div key={i} style={{
              background: "white",
              borderRadius: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              {/* Emoji icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "#fff0f4",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", flexShrink: 0,
              }}>
                {item.emoji}
              </div>
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontSize: "11px", fontWeight: 700,
                  color: "#c9829c", letterSpacing: "0.05em",
                  fontFamily: "'Manrope', sans-serif",
                }}>
                  {item.time}
                </p>
                <p style={{
                  margin: "2px 0 0",
                  fontSize: "16px", fontWeight: 700,
                  color: "#4a2038",
                  fontFamily: "'Manrope', sans-serif",
                }}>
                  {item.title}
                </p>
                <p style={{
                  margin: "2px 0 0",
                  fontSize: "12px", color: "#b0929e",
                  fontFamily: "'Manrope', sans-serif",
                }}>
                  {item.desc}
                </p>
              </div>
              {/* Step indicator */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "#f0e4e9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "12px", fontWeight: 800, color: "#c9829c",
                flexShrink: 0, fontFamily: "'Manrope', sans-serif",
              }}>
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </>
      )}

      {/* ── Tab: Thực đơn ── */}
      {tab === "menu" && (
        <div style={{
          background: "white",
          borderRadius: 28,
          boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 8px 40px rgba(0,0,0,0.06)",
          padding: "28px 24px",
          width: "100%",
          maxWidth: 480,
          boxSizing: "border-box",
        }}>
          {[
            { section: "Bánh Khai Vị", items: ["Sandwich Ham Cheese"] },
            { section: "Soup", items: ["Súp Thịt Cua Ngân Nhĩ"] },
            { section: "Khai Vị Hai Món", items: ["Gỏi Củ Hũ Dừa Tôm Thịt – Bánh Phồng Tôm", "Tôm Sốt Trứng Muối"] },
            { section: "Món Chính", items: ["Sườn Nướng Lá Hương Thảo – Bánh Bao Hấp", "Bò Hầm Tiêu Tỏi – Bánh Mì", "Lẩu Thái Hải Sản – Bún"] },
            { section: "Tráng Miệng", items: ["Chè Khúc Bạch Trái Vải"] },
            { section: "Thức Uống", items: ["Bia Tiger Bạc, Nước Ngọt, Nước Suối"] },
          ].map((block, bi) => (
            <div key={bi} style={{ marginBottom: bi < 5 ? 20 : 0 }}>
              <p style={{
                margin: "0 0 8px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4a2038",
                fontFamily: "'Manrope', sans-serif",
                textAlign: "center",
              }}>
                {block.section}
              </p>
              {block.items.map((item, ii) => (
                <p key={ii} style={{
                  margin: ii < block.items.length - 1 ? "0 0 4px" : 0,
                  fontSize: "14px",
                  color: "#b0929e",
                  fontFamily: "'Manrope', sans-serif",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}>
                  {item}
                </p>
              ))}
              {bi < 5 && <div style={{ height: 1, background: "#f0f2f5", marginTop: 16 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
