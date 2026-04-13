import { fetchWishes } from "@/lib/sheets";
import WishList from "@/components/WishList";
import AutoRefresh from "@/components/AutoRefresh";
import FloatingHearts from "@/components/FloatingHearts";

export const revalidate = 10;

export default async function Home() {
  let wishes = await fetchWishes().catch(() => []);

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
          padding: "32px 24px 20px",
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
          ✦ &nbsp; Những lời yêu thương &nbsp; ✦
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 400,
            fontStyle: "italic",
            color: "#4a2038",
            margin: "0 0 6px",
          }}
        >
          Lời Chúc Mừng
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "14px",
            color: "#b0929e",
            margin: 0,
          }}
        >
          {wishes.length} lời chúc từ mọi người
        </p>
      </header>

      {/* ── SCROLLABLE WISH LIST ── */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <WishList wishes={wishes} />
      </div>
    </main>
  );
}


