import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & News | HomeClosing101",
  description:
    "Latest news, analysis, and guides on home closing, title insurance, wire fraud, and real estate trends.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
