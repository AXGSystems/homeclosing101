import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Homebuying Journey | HomeClosing101",
  description:
    "Track your progress through the closing process and earn badges along the way.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
