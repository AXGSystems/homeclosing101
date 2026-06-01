import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Disclosure | HomeClosing101",
  description:
    "Learn how to read, verify, and compare your Closing Disclosure before signing.",
};

export default function ClosingDisclosureRedirect() {
  redirect("/document-checklist");
}
