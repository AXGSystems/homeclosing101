import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | HomeClosing101",
  description:
    "Answers to 250+ of the most common questions about closing, title insurance, and homebuying.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
