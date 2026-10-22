import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://clarafdu.github.io/clara-career-portfolio/"),
  title: "Clara — From AI Products to Business Growth",
  description:
    "Selected projects and expertise in AI product growth, commercialization, operations and AI-assisted website building.",
  icons: {
    icon: "/clara-career-portfolio/favicon.svg",
    shortcut: "/clara-career-portfolio/favicon.svg",
  },
  openGraph: {
    title: "Clara — From AI Products to Business Growth",
    description: "Selected projects and expertise in AI growth, commercialization, operations and AI-assisted website building.",
    type: "website",
    images: [{ url: "/clara-career-portfolio/og.svg", width: 1200, height: 630, alt: "Clara professional portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clara — From AI Products to Business Growth",
    description: "Selected projects and expertise in AI growth, commercialization and operations.",
    images: ["/clara-career-portfolio/og.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
