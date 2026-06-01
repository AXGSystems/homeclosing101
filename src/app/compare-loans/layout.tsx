import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Loan Options | HomeClosing101",
  description:
    "Side-by-side comparison of conventional, FHA, VA, and USDA mortgages with personalized numbers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
