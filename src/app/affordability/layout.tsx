import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordability Calculator | HomeClosing101",
  description:
    "Calculate what home price you can comfortably afford based on your income, debts, and down payment.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
