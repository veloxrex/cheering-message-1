import { fetchWishes } from "@/lib/sheets";
import WishCard from "@/components/WishCard";
import AutoRefresh from "@/components/AutoRefresh";
import FloatingHearts from "@/components/FloatingHearts";

export const revalidate = 30;

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
      <AutoRefresh interval={30000} />
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
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "12px",
            letterSpacing: "0.35em",
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
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "14px",
            color: "#b0929e",
            margin: 0,
          }}
        >
          {wishes.length} lời chúc từ mọi người
        </p>
      </header>

      {/* ── SCROLLABLE WISH LIST ── */}
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
        {wishes.length === 0 ? (
          <p
            style={{
              color: "#ccc",
              textAlign: "center",
              marginTop: "80px",
              fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Chưa có lời chúc nào.
          </p>
        ) : (
          <div style={{ borderTop: "1px solid #ead8e1" }}>
            {wishes.map((entry, i) => (
              <WishCard
                key={i}
                index={i}
                name={entry.name}
                wish={entry.wish}
                timestamp={entry.timestamp}
              />
            ))}
          </div>
        )}

        {/* Bottom padding inside scroll */}
        <div style={{ height: "40px" }} />
      </div>
    </main>
  );
}


