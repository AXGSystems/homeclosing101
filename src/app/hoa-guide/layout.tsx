import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOA Guide | HomeClosing101",
  description:
    "Everything about homeowner associations — fees, rules, governing docs, and red flags to watch for.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
