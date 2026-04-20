import { redirect } from "next/navigation";

export const metadata = {
  title: "HomeClosing101",
};

export default function LoginRedirect() {
  redirect("/");
}
