import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomeClosing101",
  description:
    "HomeClosing101 — your independent guide to the home closing process.",
};

export default function LoginRedirect() {
  redirect("/");
}
