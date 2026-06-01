import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Costs Explained | HomeClosing101",
  description:
    "Itemized breakdown of every closing cost — typical ranges, what is negotiable, and how to save.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
