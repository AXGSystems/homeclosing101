import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protect Against Deed Fraud | HomeClosing101",
  description:
    "Enroll in county property alerts, freeze your title, and prevent criminals from forging your deed.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
