import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    version: "1.0",
    type: "rich",
    width: 800,
    height: 600,
    title: "Lời Chúc Năm Mới",
    provider_name: "Cheering",
    provider_url: "https://cheering-message-1.vercel.app",
    html: `<iframe src="https://cheering-message-1.vercel.app/embed" width="800" height="600" frameborder="0" scrolling="yes" allowfullscreen></iframe>`,
  });
}
