import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questions to Ask Your Title Pro | HomeClosing101",
  description:
    "40+ questions every buyer should ask their title and settlement company before closing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
