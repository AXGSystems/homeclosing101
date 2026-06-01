import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Negotiation Guide | HomeClosing101",
  description:
    "How to negotiate purchase price, contingencies, and closing costs like a pro.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
