import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | HomeClosing101",
  description:
    "Calculate monthly mortgage payments including taxes, insurance, and PMI — with full amortization schedule.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
