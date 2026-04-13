import { fetchWishes } from "@/lib/sheets";
import WishCard from "@/components/WishCard";
import AutoRefresh from "@/components/AutoRefresh";

export const revalidate = 30;

export default async function Home() {
  let wishes = await fetchWishes().catch(() => []);

  return (
    <main style={{ background: "#fdf8f6", minHeight: "100vh" }}>
      <AutoRefresh interval={30000} />

      {/* ── HERO SECTION ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
          background: "linear-gradient(160deg, #fff5f7 0%, #fdf0f4 40%, #f7eef5 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner petals */}
        <span style={{ position: "absolute", top: 24, left: 24, fontSize: 40, opacity: 0.25 }}>✿</span>
        <span style={{ position: "absolute", top: 24, right: 24, fontSize: 40, opacity: 0.25, transform: "scaleX(-1)" }}>✿</span>
        <span style={{ position: "absolute", bottom: 40, left: 32, fontSize: 28, opacity: 0.18 }}>❀</span>
        <span style={{ position: "absolute", bottom: 40, right: 32, fontSize: 28, opacity: 0.18 }}>❀</span>
        <span style={{ position: "absolute", top: "30%", left: "5%", fontSize: 20, opacity: 0.12 }}>✦</span>
        <span style={{ position: "absolute", top: "30%", right: "5%", fontSize: 20, opacity: 0.12 }}>✦</span>

        {/* Monogram */}
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(80px, 18vw, 160px)",
            color: "#c9829c",
            lineHeight: 1,
            marginBottom: "8px",
            letterSpacing: "0.02em",
          }}
          className="hero-title"
        >
          T &amp; Q
        </div>

        {/* Names */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 6vw, 52px)",
            fontWeight: 700,
            color: "#4a2038",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "12px 0 6px",
          }}
          className="hero-sub"
        >
          Trí &amp; Quỳnh
        </h1>

        {/* Ornament divider */}
        <div className="divider-ornament" style={{ margin: "20px auto" }}>
          <span style={{ color: "#c9829c", fontSize: 18 }}>✦</span>
        </div>

        {/* Save the date */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(13px, 2.5vw, 17px)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#9e6882",
            marginBottom: "32px",
          }}
          className="hero-date"
        >
          Save the Date
        </p>

        {/* Scroll hint */}
        <a
          href="#wishes"
          style={{
            display: "inline-block",
            marginTop: "16px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "15px",
            letterSpacing: "0.2em",
            color: "#b8829c",
            textDecoration: "none",
            borderBottom: "1px solid #e0b8ca",
            paddingBottom: "2px",
            opacity: 0,
            animation: "fadeup 1s ease 0.8s forwards",
          }}
        >
          Xem lời chúc ↓
        </a>
      </section>

      {/* ── WISHES SECTION ── */}
      <section
        id="wishes"
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "80px 24px 100px",
        }}
      >
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "13px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#c9829c",
              marginBottom: "12px",
            }}
          >
            ✦ &nbsp; Những lời yêu thương &nbsp; ✦
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#4a2038",
              margin: "0 0 8px",
            }}
          >
            Lời Chúc Mừng
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              color: "#b0929e",
            }}
          >
            {wishes.length} lời chúc từ mọi người
          </p>
        </div>

        {/* Wish list */}
        {wishes.length === 0 ? (
          <p style={{ color: "#ccc", textAlign: "center", marginTop: "60px", fontStyle: "italic" }}>
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
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "32px 24px",
          borderTop: "1px solid #ead8e1",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px",
          color: "#c9a0b4",
          letterSpacing: "0.2em",
        }}
      >
        ✦ &nbsp; Trí &amp; Quỳnh &nbsp; ✦
      </footer>
    </main>
  );
}

