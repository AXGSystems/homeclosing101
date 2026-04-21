import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your State Insurance Department | HomeClosing101",
  description:
    "Locate your state insurance department — verify licenses, file complaints, or confirm filed title insurance rates.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
