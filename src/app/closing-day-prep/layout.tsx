import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Day Prep | HomeClosing101",
  description:
    "Complete pre-closing checklist — what to bring, what to verify, and how to walk in confident.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
