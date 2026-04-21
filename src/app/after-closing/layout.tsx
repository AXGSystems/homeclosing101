import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "After Closing Guide | HomeClosing101",
  description:
    "What to do after you close on your home — record the deed, set up utilities, and plan first-year maintenance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
