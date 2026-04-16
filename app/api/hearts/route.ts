import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// GET /api/hearts?id=xxx → { count: number }
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const count = (await redis.get<number>(`hearts:${id}`)) ?? 0;
  return NextResponse.json({ count });
}

// POST /api/hearts  body: { id: string } → { count: number }
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("id" in body) ||
    typeof (body as { id: unknown }).id !== "string"
  ) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { id } = body as { id: string };

  // Sanitize: chỉ cho phép ký tự an toàn
  if (!/^[\w\-:.]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }

  const count = await redis.incr(`hearts:${id}`);
  return NextResponse.json({ count });
}
