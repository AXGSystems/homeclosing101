import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Library | HomeClosing101",
  description:
    "Sample Closing Disclosure, Loan Estimate, deeds, and title commitments with plain-English annotations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
