import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: " ",
  description: " ",
  openGraph: {
    title: " ",
    description: " ",
    siteName: " ",
  },
  twitter: {
    title: " ",
    description: " ",
  },
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
          title="Lời Chúc Năm Mới"
        />
      </head>
      <body>
        {/* Navbar */}
        <header className="bg-white border-b border-[#e8dde3] px-6 py-3 flex items-center justify-between">
          <span className="text-[#b8829c] font-semibold text-sm tracking-wide italic">Ethereal Wishes</span>
          <button className="text-[#b8829c] text-xl leading-none hover:text-[#8c4f70] transition-colors">+</button>
        </header>
        {children}
      </body>
    </html>
  );
}
