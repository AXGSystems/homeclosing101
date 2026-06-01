import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Options | HomeClosing101",
  description:
    "In-person, hybrid, mail-away, and Remote Online Notarization (RON) — compare your closing options.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
