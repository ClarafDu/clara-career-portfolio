import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Clara｜出海运营负责人 & Fractional COO",
  description:
    "Clara的AI产品职业与合作档案：以8年出海运营、商业化与Fractional COO经验，参与AI产品从0到1和规模化增长。",
  icons: {
    icon: "/avatar.png",
    shortcut: "/avatar.png",
  },
  openGraph: {
    title: "Clara｜出海运营负责人 & Fractional COO",
    description: "8年出海运营与商业化经验，寻找值得长期共创的AI产品。",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 942, alt: "Clara的职业网站" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clara｜出海运营负责人 & Fractional COO",
    description: "8年出海运营与商业化经验，寻找值得长期共创的AI产品。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
