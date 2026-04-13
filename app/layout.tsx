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
     
      <body>
        {/* Corner decorations */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          {/* Top-left */}
          <svg style={{ position: "absolute", top: 0, left: 0, width: 180, height: 180, opacity: 0.12 }} viewBox="0 0 180 180" fill="none">
            <path d="M0 0 Q90 0 90 90 Q90 0 180 0" stroke="#c9829c" strokeWidth="1"/>
            <path d="M0 20 Q70 20 70 90 Q70 20 140 20" stroke="#c9829c" strokeWidth="0.8"/>
            <circle cx="20" cy="20" r="3" fill="#c9829c"/>
            <circle cx="40" cy="12" r="2" fill="#e0b8ca"/>
            <circle cx="12" cy="40" r="2" fill="#e0b8ca"/>
            <text x="55" y="65" fontSize="22" fill="#c9829c" opacity="0.6">✿</text>
          </svg>
          {/* Top-right */}
          <svg style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, opacity: 0.12, transform: "scaleX(-1)" }} viewBox="0 0 180 180" fill="none">
            <path d="M0 0 Q90 0 90 90 Q90 0 180 0" stroke="#c9829c" strokeWidth="1"/>
            <path d="M0 20 Q70 20 70 90 Q70 20 140 20" stroke="#c9829c" strokeWidth="0.8"/>
            <circle cx="20" cy="20" r="3" fill="#c9829c"/>
            <circle cx="40" cy="12" r="2" fill="#e0b8ca"/>
            <circle cx="12" cy="40" r="2" fill="#e0b8ca"/>
            <text x="55" y="65" fontSize="22" fill="#c9829c" opacity="0.6">✿</text>
          </svg>
          {/* Bottom-left */}
          <svg style={{ position: "absolute", bottom: 0, left: 0, width: 180, height: 180, opacity: 0.12, transform: "scaleY(-1)" }} viewBox="0 0 180 180" fill="none">
            <path d="M0 0 Q90 0 90 90 Q90 0 180 0" stroke="#c9829c" strokeWidth="1"/>
            <circle cx="20" cy="20" r="3" fill="#c9829c"/>
            <text x="55" y="65" fontSize="22" fill="#c9829c" opacity="0.6">❀</text>
          </svg>
          {/* Bottom-right */}
          <svg style={{ position: "absolute", bottom: 0, right: 0, width: 180, height: 180, opacity: 0.12, transform: "scale(-1,-1)" }} viewBox="0 0 180 180" fill="none">
            <path d="M0 0 Q90 0 90 90 Q90 0 180 0" stroke="#c9829c" strokeWidth="1"/>
            <circle cx="20" cy="20" r="3" fill="#c9829c"/>
            <text x="55" y="65" fontSize="22" fill="#c9829c" opacity="0.6">❀</text>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
