export interface WishEntry {
  name: string;
  wish: string;
  timestamp: string;
}

const SHEET_ID = "18RBpreqdFstJ0M1Z6c-A0fQc5WIhFiNe7Ii7QG3EEcY";
const GID = "577580239";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\r" && next === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
        i++;
      } else if (ch === "\n" || ch === "\r") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

export async function fetchWishes(): Promise<WishEntry[]> {  const res = await fetch(CSV_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Không thể tải dữ liệu từ Google Sheets");
  }

  const text = await res.text();
  const rows = parseCSV(text);

  if (rows.length < 2) return [];

  // Tìm index cột "Tên" và "Lời chúc" từ header (row đầu tiên)
  const header = rows[0].map((h) => h.trim().toLowerCase());

  const tsIdx = header.findIndex(
    (h) => h.includes("thời gian") || h.includes("timestamp") || h.includes("time")
  );

  const nameIdx = header.findIndex(
    (h) => h.includes("tên") || h.includes("ten") || h.includes("name")
  );
  const wishIdx = header.findIndex(
    (h) =>
      h.includes("lời chúc") ||
      h.includes("loi chuc") ||
      h.includes("wish") ||
      h.includes("chúc") ||
      h.includes("message") ||
      h.includes("nhắn") ||
      h.includes("yêu thương") ||
      h.includes("gửi")
  );

  // Fallback: cột 0 = timestamp, cột 1 = tên, cột 3 = lời chúc
  const ti = tsIdx >= 0 ? tsIdx : 0;
  const ni = nameIdx >= 0 ? nameIdx : 1;
  const wi = wishIdx >= 0 ? wishIdx : 3;

  const entries: WishEntry[] = rows
    .slice(1)
    .map((row) => ({
      name: (row[ni] ?? "").trim(),
      wish: (row[wi] ?? "").trim(),
      timestamp: (row[ti] ?? "").trim(),
    }))
    .filter((e) => e.name || e.wish);

  // Sort mới nhất ở trên
  entries.sort((a, b) => {
    const parse = (ts: string) => {
      if (!ts) return 0;
      const m = ts.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/);
      if (!m) return 0;
      return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime();
    };
    return parse(b.timestamp) - parse(a.timestamp);
  });

  return entries;
}
