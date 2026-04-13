# Lời Chúc

Deploy-ready Next.js app đọc dữ liệu từ Google Sheets và hiển thị lời chúc.

## Setup

```bash
npm install
npm run dev
```

## Deploy Vercel

1. Push code lên GitHub
2. Import repo vào [vercel.com](https://vercel.com)
3. Deploy (không cần config gì thêm)

## Yêu cầu Google Sheet

Sheet phải được share **"Anyone with the link can view"** (public).

Cột trong sheet cần có header chứa từ:
- `Tên` hoặc `name` → cột tên người gửi
- `Lời chúc` hoặc `wish` hoặc `message` → cột nội dung

Nếu không có header phù hợp, hệ thống sẽ dùng cột đầu tiên = tên, cột thứ hai = lời chúc.
