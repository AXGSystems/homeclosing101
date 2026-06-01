import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeowner's Insurance | HomeClosing101",
  description:
    "What homeowner's insurance covers, how to shop for it, and how to file a claim when you need to.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
