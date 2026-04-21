import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | HomeClosing101",
  description:
    "Get help with HomeClosing101, report a bug, or send us feedback.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
