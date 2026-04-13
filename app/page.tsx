import { fetchWishes } from "@/lib/sheets";
import WishCard from "@/components/WishCard";
import AutoRefresh from "@/components/AutoRefresh";

export const revalidate = 30;

export default async function Home() {
  let wishes = await fetchWishes().catch(() => []);

  return (
    <main className="min-h-screen px-6 py-14 max-w-2xl mx-auto">
      <AutoRefresh interval={30000} />

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#4a2038] mb-1">
          Lời Chúc Mừng
        </h1>
        <p className="text-[#b0929e] text-sm">{wishes.length} lời chúc từ mọi người</p>
      </div>

      {/* List */}
      {wishes.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          Chưa có lời chúc nào hoặc sheet chưa được public.
        </p>
      ) : (
        <div className="border-t border-[#e5d8de]">
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
