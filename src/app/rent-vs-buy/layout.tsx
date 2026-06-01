import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator | HomeClosing101",
  description:
    "Compare the true cost of renting vs buying over 5, 10, or 30 years with personalized numbers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
