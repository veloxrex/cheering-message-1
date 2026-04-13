import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trí & Quỳnh",
  description: "Lời chúc của mọi người",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="alternate"
          type="application/json+oembed"
          href="https://cheering-message-1.vercel.app/api/oembed"
          title="Trí & Quỳnh"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
