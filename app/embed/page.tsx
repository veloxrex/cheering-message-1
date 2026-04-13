import { fetchWishes } from "@/lib/sheets";
import WishCard from "@/components/WishCard";
import AutoRefresh from "@/components/AutoRefresh";

export const revalidate = 30;

export default async function EmbedPage() {
  let wishes = await fetchWishes().catch(() => []);

  return (
    <main
      style={{
        fontFamily: "inherit",
        padding: "16px",
        background: "transparent",
        minHeight: "100vh",
      }}
    >
      <AutoRefresh interval={30000} />

      <div style={{ marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#4a2038",
            margin: "0 0 4px 0",
          }}
        >
          💌 Lời Chúc Mừng
        </h2>
        <p style={{ fontSize: "13px", color: "#b0929e", margin: 0 }}>
          {wishes.length} lời chúc từ mọi người
        </p>
      </div>

      {wishes.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center", marginTop: "40px" }}>
          Chưa có lời chúc nào.
        </p>
      ) : (
        <div style={{ borderTop: "1px solid #e5d8de" }}>
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
    </main>
  );
}
