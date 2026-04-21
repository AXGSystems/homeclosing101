import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | HomeClosing101",
  description:
    "Guides, tools, and trusted resources for every step of the home closing process.",
};

export default function ResourcesRedirect() {
  redirect("/document-library");
}
