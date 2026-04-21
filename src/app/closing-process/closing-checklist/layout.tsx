import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Checklist | HomeClosing101",
  description:
    "Interactive closing-day checklist covering final walkthrough, wire verification, and post-closing filings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
