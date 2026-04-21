import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Property Rights | HomeClosing101",
  description:
    "What you own when you buy a home — mineral rights, easements, and Fair Housing protections.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
