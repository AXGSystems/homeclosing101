import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeowner Tax Benefits | HomeClosing101",
  description:
    "Mortgage interest deduction, property tax deduction, and every homeowner tax benefit explained.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
