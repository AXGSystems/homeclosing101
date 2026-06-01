import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements | HomeClosing101",
  description:
    "Track your homebuying knowledge milestones and badges earned across the site.",
};

export default function AchievementsRedirect() {
  redirect("/trivia");
}
