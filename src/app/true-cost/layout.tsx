import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Cost of Homeownership | HomeClosing101",
  description:
    "Beyond the mortgage — property taxes, insurance, maintenance, utilities. See your real monthly cost.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
