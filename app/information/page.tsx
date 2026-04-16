"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ── Lưới căn chỉnh ──────────────────────────────────────────────────────────
const LX = [15, 60, 105];
const RX = [188, 233, 278];
const RY = [94, 144, 185, 225, 265, 307, 350, 396, 435];

// Nhà trai = bên trái (LX), nhà gái = bên phải (RX)
const NHA_TRAI_IDS = new Set([4,10,16,17,20,21,25,28,29,30,38,39,40,44,45,46]);
const KITS_IDS        = new Set([31]);
const HOI_ACE_CAULONG_IDS = new Set([5,6,11,12]);
const ZOI_IDS         = new Set([26,27,32,33,34]);
const BAN_PHU_IDS = new Set([1, 2]);
const PHU_HUYNH_TRAI_IDS = new Set([16, 17, 20, 21, 25]);
const HO_HANG_GAI_IDS    = new Set([3, 8, 9]);
const HOI_CA_SAU_IDS     = new Set([7]);
const BAN_BE_PTSC_IDS    = new Set([13, 14]);
const GIA_DINH_VUI_VE_IDS = new Set([15]);
const GIA_DINH_LAU5_IDS  = new Set([18]);
const GIA_DINH_BAC_IDS   = new Set([4, 10]);

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

function InformationContent() {
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

            {/* ── Lối thoát hiểm ── */}
            <rect x="257" y="192" width="37" height="24" rx="6" fill="#f0f0f0" stroke="#bdbdbd" strokeWidth="1" />
            <text x="275.5" y="201" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#757575" fontFamily="Helvetica" letterSpacing="0.2">LỐI THOÁT</text>
            <text x="275.5" y="210" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#757575" fontFamily="Helvetica" letterSpacing="0.2">HIỂM</text>

           

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
              // Mỗi nhóm = 1 màu nền riêng biệt, viền đồng nhất
              // Nguyên tắc: 1 tín hiệu màu duy nhất per bàn → không rối mắt
              const bg =
                BAN_PHU_IDS.has(t.id)       ? "#f2f2f2" :  // xám rất nhạt
                HO_HANG_GAI_IDS.has(t.id)   ? "#fce8f0" :  // hồng nhạt
                HOI_CA_SAU_IDS.has(t.id)    ? "#ede0f8" :  // tím rất nhạt
                BAN_BE_PTSC_IDS.has(t.id)   ? "#fdefd8" :  // cam đào nhạt
                GIA_DINH_VUI_VE_IDS.has(t.id) ? "#f6f4c0" : // vàng rất nhạt
                GIA_DINH_LAU5_IDS.has(t.id) ? "#fde6dc" :  // hồng cam nhạt
                GIA_DINH_BAC_IDS.has(t.id)   ? "#d4eeff" :  // xanh dương nhạt
                PHU_HUYNH_TRAI_IDS.has(t.id) ? "#cceedd" :  // xanh lá nhạt
                ZOI_IDS.has(t.id)            ? "#e8f8ff" :  // xanh lơ nhạt - Zoi
                KITS_IDS.has(t.id)           ? "#fff3e0" :  // cam nhạt - KITS
                HOI_ACE_CAULONG_IDS.has(t.id) ? "#e8f0ff" :  // tím xanh nhạt - cầu lông
                NHA_TRAI_IDS.has(t.id)      ? "#ffffff" :  // trắng - nhà trai chưa xếp
                "#ffffff";                                   // trắng - chưa xếp
              const textColor =
                BAN_PHU_IDS.has(t.id)       ? "#666666" :
                HO_HANG_GAI_IDS.has(t.id)   ? "#8b3a5a" :
                HOI_CA_SAU_IDS.has(t.id)    ? "#5c3880" :
                BAN_BE_PTSC_IDS.has(t.id)   ? "#8b5020" :
                GIA_DINH_VUI_VE_IDS.has(t.id) ? "#6b6010" :
                GIA_DINH_LAU5_IDS.has(t.id) ? "#8b4030" :
                GIA_DINH_BAC_IDS.has(t.id)   ? "#1a4070" :
                PHU_HUYNH_TRAI_IDS.has(t.id) ? "#1a5c38" :
                ZOI_IDS.has(t.id)            ? "#1a5878" :
                KITS_IDS.has(t.id)           ? "#7a4010" :
                HOI_ACE_CAULONG_IDS.has(t.id) ? "#2a3080" :
                NHA_TRAI_IDS.has(t.id)      ? "#555555" :
                "#555555";
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
                    stroke="rgba(0,0,0,0.14)"
                    strokeWidth="1.2"
                  />
                  <text
                    x={t.cx}
                    y={t.cy + 4}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={textColor}
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
          <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Manrope', sans-serif" }}>Nhà gái</div>
          <div style={{ width: 36 }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Manrope', sans-serif" }}>Nhà trai</div>
        </div>
      </div>

      {/* ── Chú thích ── */}
      <div style={{
        marginTop: "16px",
        width: "100%",
        maxWidth: 480,
        fontFamily: "'Manrope', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {/* Legend: 2 cột - nhà gái / nhà trai */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {/* Nhà gái */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #eedde6", overflow: "hidden" }}>
            <div style={{ background: "#fdf0f5", padding: "8px 12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#8b3060" }}>Nhà gái</span>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { fill: "#ffffff", label: "Bạn bè cô dâu" },
                { fill: "#fce8f0", label: "Họ hàng ba mẹ cô dâu", tables: "3,8,9" },
                { fill: "#ede0f8", label: "Hội cá sấu hoa cà", tables: "7" },
                { fill: "#fdefd8", label: "Bạn bè PTSC", tables: "13,14" },
                { fill: "#f6f4c0", label: "GĐ vui vẻ", tables: "15" },
                { fill: "#fde6dc", label: "GĐ lầu 5", tables: "18" },
                { fill: "#f2f2f2", label: "Bàn phụ", tables: "1,2" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: l.fill, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#6b4055", flex: 1, lineHeight: 1.3 }}>{l.label}</span>
                  {l.tables && <span style={{ fontSize: "12px", fontWeight: 700, color: "#8b3060", background: "#fce8f0", borderRadius: 6, padding: "1px 5px", flexShrink: 0 }}>{l.tables}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Nhà trai */}
          <div style={{ background: "white", borderRadius: 16, border: "1px solid #c8e4d0", overflow: "hidden" }}>
            <div style={{ background: "#f0faf4", padding: "8px 12px" }}>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#1a5c38" }}>Nhà trai</span>
            </div>
            <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { fill: "#ffffff", label: "Bạn bè chú rể" },
                { fill: "#d4eeff", label: "GĐ các bác & bạn bè của ba", tables: "4,10" },
                { fill: "#cceedd", label: "Bạn bè của mẹ", tables: "16,17,20,21,25" },
                { fill: "#e8f8ff", label: "Công ty Zoi", tables: "26,27,32-34" },
                { fill: "#fff3e0", label: "Anh em Kaizen team", tables: "31" },
                { fill: "#e8f0ff", label: "Hội ACE + nhóm cầu lông", tables: "5,6,11,12" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: l.fill, border: "1px solid rgba(0,0,0,0.12)", flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#1a5c38", flex: 1, lineHeight: 1.3 }}>{l.label}</span>
                  {l.tables && <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a5c38", background: "#ddf0e4", borderRadius: 6, padding: "1px 5px", flexShrink: 0 }}>{l.tables}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
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

export default function PositionPage() {
  return (
    <Suspense>
      <InformationContent />
    </Suspense>
  );
}
