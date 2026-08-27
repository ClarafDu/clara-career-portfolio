import type { Metadata } from "next";
import ResumeSite from "./ResumeSite";

export const metadata: Metadata = {
  title: "Clara｜出海运营负责人 & Fractional COO",
  description:
    "Clara的AI产品职业与合作档案：以8年出海运营、商业化与Fractional COO经验，参与AI产品从0到1和规模化增长。",
};

export default function Home() {
  return <ResumeSite />;
}
