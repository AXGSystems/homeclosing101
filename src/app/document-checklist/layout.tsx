import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Document Checklist | HomeClosing101",
  description:
    "Every document you will encounter at closing, explained in plain English.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
