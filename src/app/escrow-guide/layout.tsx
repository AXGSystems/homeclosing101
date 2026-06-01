import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Escrow | HomeClosing101",
  description:
    "What escrow is, how escrow accounts work, and why they protect both sides of your closing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
