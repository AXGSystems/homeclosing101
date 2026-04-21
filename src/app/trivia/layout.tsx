import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeClosing101 Trivia | HomeClosing101",
  description:
    "Test your closing knowledge with our trivia challenge and earn achievements as you learn.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
