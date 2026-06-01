import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DTI Calculator | HomeClosing101",
  description:
    "Calculate your debt-to-income ratio and see how it affects mortgage approval chances.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
