import { NextRequest, NextResponse } from "next/server";

// Known crawler/unfurl bot user-agent keywords
const BOT_PATTERNS = [
  "canva",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "telegrambot",
  "whatsapp",
  "google-structured-data",
  "googlebot",
  "bingbot",
  "crawler",
  "spider",
  "unfurl",
  "preview",
  "embedly",
  "iframely",
];

export function middleware(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const isBot = BOT_PATTERNS.some((p) => ua.includes(p));

  if (isBot) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title></title></head><body></body></html>`,
      {
        status: 200,
        headers: { "content-type": "text/html" },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
