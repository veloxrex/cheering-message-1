"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import WishCard from "./WishCard";
import AutoRefresh from "./AutoRefresh";
import FloatingHearts from "./FloatingHearts";

// ── Seating chart data ───────────────────────────────────────────────────────
const LX = [15, 60, 105];
const RX = [188, 233, 278];
const RY = [94, 144, 185, 225, 265, 307, 350, 396, 435];
const NHA_TRAI_IDS = new Set([4,10,16,17,20,21,25,38,39,40,44,45,46]);
const KITS_IDS = new Set([31]);
const HOI_ACE_CAULONG_IDS = new Set([5,6,11,12]);
const ZOI_IDS = new Set([26,27,32,34]);
const CHUBBY_IDS = new Set([33]);
const BAN_PHU_IDS = new Set([1, 2]);
const PHU_HUYNH_TRAI_IDS = new Set([16, 17, 20, 21, 25]);
const HO_HANG_GAI_IDS = new Set([3, 8, 9]);
const HOI_CA_SAU_IDS = new Set([7]);
const BAN_BE_PTSC_IDS = new Set([13, 14]);
const GIA_DINH_VUI_VE_IDS = new Set([15]);
const GIA_DINH_LAU5_IDS = new Set([18]);
const NHAI_MUOI_HOM_IDS = new Set([19]);
const GIA_DINH_BAC_IDS = new Set([4, 10]);
const BAN_DAI_HOC_IDS = new Set([24]);
const BAN_CAP3_IDS = new Set([30]);
const BAN_CAP2_IDS = new Set([29]);
const HYUNDAI_IDS = new Set([35,36,37,41,42,43]);
const BAN_BE_BA_ME_IDS = new Set([22,23,28]);
const SEAT_TABLES = [
  { id: 1,  cx: LX[0], cy: RY[0], r: 15 }, { id: 2,  cx: LX[1], cy: RY[0], r: 15 },
  { id: 3,  cx: LX[2], cy: RY[0], r: 15 }, { id: 4,  cx: RX[0], cy: RY[0], r: 15 },
  { id: 5,  cx: RX[1], cy: RY[0], r: 15 }, { id: 6,  cx: RX[2], cy: RY[0], r: 15 },
  { id: 7,  cx: LX[0], cy: RY[1], r: 15 }, { id: 8,  cx: LX[1], cy: RY[1], r: 15 },
  { id: 9,  cx: LX[2], cy: RY[1], r: 15 }, { id: 10, cx: RX[0], cy: RY[1], r: 15 },
  { id: 11, cx: RX[1], cy: RY[1], r: 15 }, { id: 12, cx: RX[2], cy: RY[1], r: 15 },
  { id: 13, cx: LX[0], cy: RY[2], r: 15 }, { id: 14, cx: LX[1], cy: RY[2], r: 15 },
  { id: 15, cx: LX[2], cy: RY[2], r: 15 }, { id: 16, cx: RX[0], cy: RY[2], r: 15 },
  { id: 17, cx: RX[1], cy: RY[2], r: 15 }, { id: 18, cx: LX[1], cy: RY[3], r: 15 },
  { id: 19, cx: LX[2], cy: RY[3], r: 15 }, { id: 20, cx: RX[0], cy: RY[3], r: 15 },
  { id: 21, cx: RX[1], cy: RY[3], r: 15 }, { id: 22, cx: LX[0], cy: RY[4], r: 15 },
  { id: 23, cx: LX[1], cy: RY[4], r: 15 }, { id: 24, cx: LX[2], cy: RY[4], r: 15 },
  { id: 25, cx: RX[0], cy: RY[4], r: 15 }, { id: 26, cx: RX[1], cy: RY[4], r: 15 },
  { id: 27, cx: RX[2], cy: RY[4], r: 15 }, { id: 28, cx: LX[0], cy: RY[5], r: 15 },
  { id: 29, cx: LX[1], cy: RY[5], r: 15 }, { id: 30, cx: LX[2], cy: RY[5], r: 15 },
  { id: 31, cx: RX[0], cy: RY[5], r: 15 }, { id: 32, cx: RX[1], cy: RY[5], r: 15 },
  { id: 33, cx: RX[2], cy: RY[5], r: 15 }, { id: 34, cx: RX[2], cy: RY[6], r: 15 },
  { id: 35, cx: LX[0], cy: RY[7], r: 15 }, { id: 36, cx: LX[1], cy: RY[7], r: 15 },
  { id: 37, cx: LX[2], cy: RY[7], r: 15 }, { id: 38, cx: RX[0], cy: RY[7], r: 15 },
  { id: 39, cx: RX[1], cy: RY[7], r: 15 }, { id: 40, cx: RX[2], cy: RY[7], r: 15 },
  { id: 41, cx: LX[0], cy: RY[8], r: 15 }, { id: 42, cx: LX[1], cy: RY[8], r: 15 },
  { id: 43, cx: LX[2], cy: RY[8], r: 15 }, { id: 44, cx: RX[0], cy: RY[8], r: 15 },
  { id: 45, cx: RX[1], cy: RY[8], r: 15 }, { id: 46, cx: RX[2], cy: RY[8], r: 15 },
];

const TABLE_GUESTS: Record<number, { name: string; count: number }[]> = {
  16: [
    { name: "Bác An và gia đình Quang Anh", count: 1 },
    { name: "Gia đình ông bà Nghiêm-Thu", count: 2 },
    { name: "Gia đình em Huy-Nhung", count: 2 },
    { name: "Gia đình bạn Ngọc Lan", count: 1 },
    { name: "Gia đình bạn Bích Liên", count: 1 },
    { name: "Bạn Thu Nga", count: 1 },
    { name: "Bạn Tấn Thanh", count: 1 },
    { name: "Bạn Thanh Hoàng", count: 1 },
  ],
  17: [
    { name: "Vợ chồng bạn Hoàng Phi", count: 1 },
    { name: "Bạn Xuân Dung", count: 1 },
    { name: "Vợ chồng bạn Hiền NH", count: 1 },
    { name: "Bạn Sơn NH", count: 1 },
    { name: "Bạn Hoài NH", count: 1 },
    { name: "Anh Khang NH", count: 1 },
    { name: "Bạn Uyên Phương và con gái", count: 2 },
    { name: "Vợ chồng bạn LyNa", count: 1 },
    { name: "Bạn Loan (PT)", count: 1 },
  ],
  20: [
    { name: "Anh Quảng", count: 1 },
    { name: "Anh Nam-Mai", count: 1 },
    { name: "Bạn Đan Hà (Bảo Công Lý)", count: 1 },
    { name: "Anh Chị Thu (Sacombank)", count: 1 },
    { name: "Chị Lê NH", count: 1 },
    { name: "Em Bảo (trường VTS)", count: 1 },
    { name: "Chị Nữ", count: 1 },
    { name: "Vợ chồng bạn Đoan Hạnh", count: 1 },
    { name: "Em Hường (VPĐKĐ)", count: 1 },
    { name: "Gia đình chị Nga (bác Toản)", count: 1 },
  ],
  21: [
    { name: "Vợ chồng em Hồng Phương", count: 1 },
    { name: "Em Loan", count: 1 },
    { name: "Em Tiến", count: 1 },
    { name: "Em Huy", count: 1 },
    { name: "Gia đình Chị Thị", count: 1 },
    { name: "Gia đình Chị Hóa", count: 1 },
    { name: "Gia đình Chị Đào", count: 1 },
    { name: "Em Lan y tế", count: 1 },
    { name: "Gia đình bạn Hương Hoa", count: 1 },
  ],
  25: [
    { name: "Anh chị Điện (gd ban)", count: 1 },
    { name: "Anh chị Thùy Tuyến", count: 1 },
    { name: "Vợ chồng Bảo Phương (gd ban)", count: 1 },
    { name: "Vợ chồng Minh Quân (pgd ban)", count: 1 },
    { name: "Vợ chồng Tạo (pgd ban)", count: 1 },
    { name: "Vợ chồng Thanh (tổ TC)", count: 1 },
    { name: "Vợ chồng Lâm (tổ TC)", count: 1 },
    { name: "Vợ chồng Đạt (tổ TC)", count: 1 },
    { name: "Em Nguyên (KT3)", count: 1 },
    { name: "Em Thùy (ban bồi thường)", count: 1 },
    { name: "Em Linh (ban bồi thường)", count: 1 },
  ],
  31: [
    { name: "Gia đình anh Nghĩa", count: 1 },
    { name: "Gia đình anh Nguyên", count: 1 },
    { name: "Gia đình anh Đô", count: 1 },
    { name: "Gia đình anh Quân", count: 1 },
    { name: "Gia đình bạn Hưng", count: 1 },
  ],
  33: [
    { name: "Gia đình anh Khánh", count: 1 },
    { name: "Gia đình bạn An", count: 1 },
    { name: "Em Vinh Lâm (2 em)", count: 1 },
    { name: "Em Bảo", count: 1 },
    { name: "Gia đình em Trương", count: 1 },
    { name: "Em Duy", count: 1 },
  ],
};

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

const VALID_TABS = ["seating", "agenda", "menu", "wishes", "album"] as const;
type Tab = typeof VALID_TABS[number];

export default function MainPage({ wishes }: { wishes: Entry[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [tab, setTab] = useState<Tab>(VALID_TABS.includes(tabParam as Tab) ? tabParam! : "seating");
  const [preview, setPreview] = useState<number | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  useEffect(() => {
    const t = searchParams.get("tab") as Tab | null;
    if (t && VALID_TABS.includes(t)) setTab(t);
  }, [searchParams]);

  const switchTab = (t: Tab) => {
    setTab(t);
    router.replace(`?tab=${t}`, { scroll: false });
  };

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

      {/* ── CONTENT ── */}
      <div style={{ flex: 1, overflowY: "auto", background: "#fdf8f6" }}>

        {/* WISHES TAB */}
        {tab === "wishes" && (
          <div
            style={{
              padding: "16px 24px 40px",
              maxWidth: "960px",
              width: "100%",
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>✦ Lời Chúc ✦</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>Tiệc cưới Trí – Quỳnh</p>
            </div>
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
              padding: "20px 16px 40px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>✦ Album ✦</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>Tiệc cưới Trí – Quỳnh</p>
            </div>
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

        {/* SEATING TAB */}
        {tab === "seating" && (
        <div style={{ padding: "20px 16px 40px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 16, width: "100%" }}>
            <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>✦ Chỗ Ngồi ✦</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>Tiệc cưới Trí – Quỳnh</p>
          </div>
          <div style={{ background: "white", borderRadius: 28, boxShadow: "0 2px 24px rgba(0,0,0,0.07)", padding: "28px 20px", width: "100%", maxWidth: 480, boxSizing: "border-box" }}>
            <svg viewBox="0 0 330 480" width="100%" style={{ display: "block", height: "auto" }}>
              <defs>
                <linearGradient id="stageGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a2f50" /><stop offset="100%" stopColor="#0d1f3c" />
                </linearGradient>
                <filter id="cShadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#00000018" />
                </filter>
              </defs>
              <g transform="translate(16, 0)">
                <rect x="-16" y="0" width="330" height="480" fill="white" />
                <line x1="146" y1="72" x2="146" y2="460" stroke="#b0b8c8" strokeWidth="2" strokeDasharray="6 3" />
                <line x1="1" y1="352" x2="129" y2="352" stroke="#b0b8c8" strokeWidth="2" strokeDasharray="6 3" />
                <rect x="257" y="192" width="37" height="24" rx="6" fill="#f0f0f0" stroke="#bdbdbd" strokeWidth="1" />
                <text x="275.5" y="201" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#757575" fontFamily="Helvetica" letterSpacing="0.2">LỐI THOÁT</text>
                <text x="275.5" y="210" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#757575" fontFamily="Helvetica" letterSpacing="0.2">HIỂM</text>
                <rect x="1" y="215.2" width="21.7" height="19.57" rx="4" fill="#eff8ff" stroke="#bae0ff" strokeWidth="1" />
                <line x1="4" y1="221" x2="19.7" y2="221" stroke="#60b8f5" strokeWidth="1" />
                <line x1="6" y1="226" x2="17.7" y2="226" stroke="#60b8f5" strokeWidth="0.8" />
                <line x1="6" y1="229" x2="17.7" y2="229" stroke="#60b8f5" strokeWidth="0.8" />
                <text x="11.85" y="219.5" textAnchor="middle" fontSize="5" fill="#60b8f5" fontFamily="Helvetica">❄</text>
                <rect x="66" y="10" width="160" height="46" rx="10" fill="url(#stageGrad2)" filter="url(#cShadow)" />
                <polygon points="137,56 146,68 155,56" fill="#0d1f3c" />
                <text x="146" y="30" textAnchor="middle" fontSize="9" fontWeight="800" fill="white" fontFamily="Helvetica" letterSpacing="3">S T A G E</text>
                <text x="146" y="46" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="Helvetica" letterSpacing="1">Sân khấu</text>
                {SEAT_TABLES.map((t) => {
                  const bg =
                    BAN_PHU_IDS.has(t.id) ? "#f2f2f2" : HO_HANG_GAI_IDS.has(t.id) ? "#fce8f0" :
                    HOI_CA_SAU_IDS.has(t.id) ? "#ede0f8" : BAN_BE_PTSC_IDS.has(t.id) ? "#fdefd8" :
                    GIA_DINH_VUI_VE_IDS.has(t.id) ? "#f6f4c0" : GIA_DINH_LAU5_IDS.has(t.id) ? "#fde6dc" :
                    NHAI_MUOI_HOM_IDS.has(t.id) ? "#c8f0e4" : GIA_DINH_BAC_IDS.has(t.id) ? "#d4eeff" :
                    PHU_HUYNH_TRAI_IDS.has(t.id) ? "#cceedd" : ZOI_IDS.has(t.id) ? "#e8f8ff" :
                    CHUBBY_IDS.has(t.id) ? "#fce8d8" :
                    KITS_IDS.has(t.id) ? "#fff3e0" : HOI_ACE_CAULONG_IDS.has(t.id) ? "#e8f0ff" :
                    BAN_DAI_HOC_IDS.has(t.id) ? "#ffd6b0" :
                    BAN_CAP3_IDS.has(t.id) ? "#d8f0c8" :
                    BAN_CAP2_IDS.has(t.id) ? "#c8e8f8" :
                    HYUNDAI_IDS.has(t.id) ? "#e8d8f8" :
                    BAN_BE_BA_ME_IDS.has(t.id) ? "#f8e8c8" :
                    NHA_TRAI_IDS.has(t.id) ? "#ffffff" : "#ffffff";
                  const textColor =
                    BAN_PHU_IDS.has(t.id) ? "#666666" : HO_HANG_GAI_IDS.has(t.id) ? "#8b3a5a" :
                    HOI_CA_SAU_IDS.has(t.id) ? "#5c3880" : BAN_BE_PTSC_IDS.has(t.id) ? "#8b5020" :
                    GIA_DINH_VUI_VE_IDS.has(t.id) ? "#6b6010" : GIA_DINH_LAU5_IDS.has(t.id) ? "#8b4030" :
                    NHAI_MUOI_HOM_IDS.has(t.id) ? "#1a6b50" : GIA_DINH_BAC_IDS.has(t.id) ? "#1a4070" :
                    PHU_HUYNH_TRAI_IDS.has(t.id) ? "#1a5c38" : ZOI_IDS.has(t.id) ? "#1a5878" :
                    CHUBBY_IDS.has(t.id) ? "#7a3010" :
                    KITS_IDS.has(t.id) ? "#7a4010" : HOI_ACE_CAULONG_IDS.has(t.id) ? "#2a3080" :
                    BAN_DAI_HOC_IDS.has(t.id) ? "#7a4010" :
                    BAN_CAP3_IDS.has(t.id) ? "#2a6010" :
                    BAN_CAP2_IDS.has(t.id) ? "#1a5070" :
                    HYUNDAI_IDS.has(t.id) ? "#502080" :
                    BAN_BE_BA_ME_IDS.has(t.id) ? "#705010" : "#555555";
                  return (
                    <g
                      key={t.id}
                      filter="url(#cShadow)"
                      onClick={() => TABLE_GUESTS[t.id] ? setSelectedTable(t.id) : undefined}
                      style={TABLE_GUESTS[t.id] ? { cursor: "pointer" } : undefined}
                    >
                      <rect x={t.cx - t.r} y={t.cy - t.r} width={t.r * 2} height={t.r * 2} rx={6} fill={bg} stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" />
                      <text x={t.cx} y={t.cy + 4} textAnchor="middle" fontSize="9.5" fill={textColor} fontWeight="700" fontFamily="'Nunito', sans-serif">{t.id}</text>
                      {TABLE_GUESTS[t.id] && (
                        <circle cx={t.cx + t.r - 3} cy={t.cy - t.r + 3} r={3.5} fill="#c9829c" />
                      )}
                    </g>
                  );
                })}
                <text x="159" y="270" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b0b8c8" fontFamily="'Nunito', sans-serif" letterSpacing="1" transform="rotate(-90, 159, 270)">L Ố I  Đ I</text>
                <text x="65" y="348" textAnchor="middle" fontSize="7" fontWeight="700" fill="#b0b8c8" fontFamily="'Nunito', sans-serif" letterSpacing="1">L Ố I  Đ I</text>
              </g>
            </svg>
            <div style={{ display: "flex", marginTop: 10 }}>
              <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Nunito', sans-serif" }}>Nhà gái</div>
              <div style={{ width: 36 }} />
              <div style={{ flex: 1, textAlign: "center", fontSize: "11px", fontWeight: 800, color: "#c9829c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Nunito', sans-serif" }}>Nhà trai</div>
            </div>
          </div>

          {/* Legend */}
          <div style={{ marginTop: 16, width: "100%", maxWidth: 480, fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #eedde6", overflow: "hidden" }}>
                <div style={{ background: "#fdf0f5", padding: "8px 12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#8b3060" }}>Nhà gái</span>
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {[
                    { fill: "#fce8f0", label: "Họ hàng ba mẹ cô dâu", tables: "3,8,9" },
                    { fill: "#ede0f8", label: "Hội cá sấu hoa cà", tables: "7" },
                    { fill: "#fdefd8", label: "Bạn bè PTSC", tables: "13,14" },
                    { fill: "#f6f4c0", label: "GĐ vui vẻ", tables: "15" },
                    { fill: "#fde6dc", label: "GĐ lầu 5", tables: "18" },
                    { fill: "#c8f0e4", label: "Nhái Mười Hom", tables: "19" },
                    { fill: "#f8e8c8", label: "Bạn bè ba mẹ cô dâu", tables: "22,23,28" },
                    { fill: "#ffd6b0", label: "Bạn Đại học", tables: "24" },
                    { fill: "#c8e8f8", label: "Bạn cấp 2", tables: "29" },
                    { fill: "#d8f0c8", label: "Bạn cấp 3", tables: "30" },
                    { fill: "#e8d8f8", label: "Anh Chị đồng nghiệp Hyundai", tables: "35-43" },
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
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #c8e4d0", overflow: "hidden" }}>
                <div style={{ background: "#f0faf4", padding: "8px 12px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, color: "#1a5c38" }}>Nhà trai</span>
                </div>
                <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {[
                    { fill: "#ffffff", label: "Bạn bè chú rể" },
                    { fill: "#d4eeff", label: "GĐ các bác & bạn bè của ba", tables: "4,10" },
                    { fill: "#cceedd", label: "Bạn bè của mẹ", tables: "16,17,20,21,25" },
                    { fill: "#e8f8ff", label: "Công ty Zoi", tables: "26,27,32,34" },
                    { fill: "#fce8d8", label: "Hội Chubby", tables: "33" },
                    { fill: "#fff3e0", label: "Anh em Kaizen team + Smart Fun", tables: "31" },
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
        </div>
      )}

      {/* AGENDA TAB */}
      {tab === "agenda" && (
        <div style={{ padding: "20px 16px 40px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 4, width: "100%" }}>
            <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>✦ Lịch Trình ✦</p>
            <p style={{ margin: 0, fontSize: "13px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>Tiệc cưới Trí – Quỳnh</p>
          </div>
          {[
            { time: "5:30 – 7:00", title: "Đón khách", desc: "Tiếp đón và hướng dẫn chỗ ngồi", emoji: "🎉" },
            { time: "7:00 – 7:30", title: "Làm lễ", desc: "Nghi lễ cưới chính thức", emoji: "💍" },
            { time: "7:30 – 9:00", title: "Tiệc mừng", desc: "Tiệc chung vui cùng gia đình và bạn bè", emoji: "🥂" },
            { time: "9:00", title: "Kết thúc", desc: "Cảm ơn và tiễn khách", emoji: "🙏" },
          ].map((item, i) => (
            <div key={i} style={{ background: "white", borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, width: "100%", maxWidth: 480, boxSizing: "border-box" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "#fff0f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#c9829c", letterSpacing: "0.05em", fontFamily: "'Nunito', sans-serif" }}>{item.time}</p>
                <p style={{ margin: "2px 0 0", fontSize: "16px", fontWeight: 700, color: "#4a2038", fontFamily: "'Nunito', sans-serif" }}>{item.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>{item.desc}</p>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#f0e4e9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: "#c9829c", flexShrink: 0, fontFamily: "'Nunito', sans-serif" }}>{i + 1}</div>
            </div>
          ))}
        </div>
      )}

      {/* MENU TAB */}
      {tab === "menu" && (
        <div style={{ padding: "20px 16px 40px", boxSizing: "border-box", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 480, boxSizing: "border-box" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <p style={{ margin: "0 0 2px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>✦ Thực Đơn ✦</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#b0929e", fontFamily: "'Nunito', sans-serif" }}>Tiệc cưới Trí – Quỳnh</p>
            </div>

            {/* Menu sections */}
            {[
              { emoji: "🥐", section: "Bánh Khai Vị", items: ["Sandwich Ham Cheese"] },
              { emoji: "🍲", section: "Soup", items: ["Súp Thịt Cua Ngân Nhĩ"] },
              { emoji: "🥗", section: "Khai Vị", items: ["Gỏi Củ Hũ Dừa Tôm Thịt – Bánh Phồng Tôm", "Tôm Sốt Trứng Muối"] },
              { emoji: "🍖", section: "Món Chính", items: ["Sườn Nướng Lá Hương Thảo – Bánh Bao Hấp", "Bò Hầm Tiêu Tỏi – Bánh Mì", "Lẩu Thái Hải Sản – Bún"] },
              { emoji: "🍮", section: "Tráng Miệng", items: ["Chè Khúc Bạch Trái Vải"] },
              { emoji: "🥂", section: "Thức Uống", items: ["Bia Tiger Bạc, Nước Ngọt, Nước Suối"] },
            ].map((block, bi) => (
              <div key={bi} style={{
                background: "white",
                borderRadius: 20,
                boxShadow: "0 2px 12px rgba(201,130,156,0.08)",
                marginBottom: 10,
                overflow: "hidden",
                border: "1px solid #f5e8ee",
              }}>
                {/* Section header */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: "linear-gradient(90deg, #fff5f8 0%, #fff 100%)",
                  borderBottom: "1px solid #f5e8ee",
                }}>
                  <span style={{ fontSize: "20px", lineHeight: 1 }}>{block.emoji}</span>
                  <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>{block.section}</span>
                </div>
                {/* Items */}
                <div style={{ padding: "10px 16px 12px" }}>
                  {block.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: ii > 0 ? "7px 0 0" : "0",
                      borderTop: ii > 0 ? "1px dashed #f0e4ea" : "none",
                      marginTop: ii > 0 ? 7 : 0,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e8c0cf", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: "14px", color: "#6b4055", fontFamily: "'Nunito', sans-serif", lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div
        style={{
          flexShrink: 0,
          padding: "8px 16px",
          paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
          background: "transparent",
        }}
      >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f2e6ec",
          borderRadius: 999,
          padding: "5px",
          gap: 2,
        }}
      >
        {([
          { key: "seating", label: "Chỗ ngồi" },
          { key: "agenda",  label: "Lịch trình" },
          { key: "menu",    label: "Thực đơn" },
          { key: "wishes",  label: "Lời chúc" },
          { key: "album",   label: "Album" },
        ] as const).map(({ key, label }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => switchTab(key)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 6px",
                border: "none",
                borderRadius: 999,
                background: active ? "#fff" : "transparent",
                boxShadow: active ? "0 1px 4px rgba(180,100,130,0.18)" : "none",
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                transition: "background 0.2s ease, box-shadow 0.2s ease",
                minWidth: 0,
              }}
            >
              <span style={{
                fontSize: "12px",
                fontWeight: active ? 800 : 500,
                color: active ? "#c9829c" : "#b89aaa",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}>{label}</span>
            </button>
          );
        })}
      </nav>
      </div>

      {/* ── GUEST LIST MODAL ── */}
      {selectedTable !== null && TABLE_GUESTS[selectedTable] && (
        <div
          onClick={() => setSelectedTable(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,8,15,0.6)",
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
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              width: "100%",
              maxWidth: 400,
              overflow: "hidden",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #fdf0f5, #fff5f8)", padding: "16px 20px", borderBottom: "1px solid #ead8e1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9829c", fontFamily: "'Nunito', sans-serif" }}>Danh sách khách</p>
                <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 800, color: "#4a2038", fontFamily: "'Nunito', sans-serif" }}>Bàn {selectedTable}</p>
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                style={{ background: "rgba(201,130,156,0.12)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#c9829c", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >×</button>
            </div>
            {/* Guest list */}
            <div style={{ overflowY: "auto", padding: "12px 20px 20px" }}>
              {TABLE_GUESTS[selectedTable].map((g, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < TABLE_GUESTS[selectedTable].length - 1 ? "1px dashed #f0e4ea" : "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#fce8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#c9829c", flexShrink: 0, fontFamily: "'Nunito', sans-serif" }}>{i + 1}</span>
                    <span style={{ fontSize: "14px", color: "#4a2038", fontFamily: "'Nunito', sans-serif" }}>{g.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
              maxWidth: "min(1100px, 96vw)",
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
            <div style={{ position: "relative", width: "100%", height: "82vh" }}>
              <Image
                src={`/album_compressed/${encodeURIComponent(IMAGES[preview])}`}
                alt={`Ảnh ${preview + 1}`}
                fill
                style={{ objectFit: "contain", background: "#111" }}
                sizes="96vw"
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
