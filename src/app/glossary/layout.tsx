import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Glossary | HomeClosing101",
  description:
    "450+ real estate, closing, and title insurance terms defined in plain English.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
