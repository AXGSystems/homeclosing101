import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understanding Your Appraisal | HomeClosing101",
  description:
    "How home appraisals work, how to prepare, and what to do if yours comes in low.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
