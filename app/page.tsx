import { fetchWishes } from "@/lib/sheets";
import MainPage from "@/components/MainPage";

export const revalidate = 10;

export default async function Home() {
  const wishes = await fetchWishes().catch(() => []);
  return <MainPage wishes={wishes} />;
}


