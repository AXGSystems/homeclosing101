import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Title Company | HomeClosing101",
  description:
    "Under federal law (RESPA) you have the right to choose your title company. Search ALTA members by state and city.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
