import type { Metadata } from "next";
import ResumeSite from "./ResumeSite";

export const metadata: Metadata = {
  title: "Clara — From AI Products to Business Growth",
  description:
    "Selected projects and expertise in AI product growth, commercialization, operations and AI-assisted website building.",
};

export default function Home() {
  return <ResumeSite />;
}
