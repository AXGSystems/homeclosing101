import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Estimate vs Closing Disclosure | HomeClosing101",
  description:
    "Side-by-side comparison of your Loan Estimate and Closing Disclosure — what to check before you sign.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
