"use client";
// Browser AUTH client — the SHARED staff-hub Supabase project. Microsoft
// Entra/Azure OAuth is enabled ONLY on this project, and it owns the session
// cookie. Same SSO as the Staff Hub and the DASH tools.

import { createBrowserClient } from "@supabase/ssr";

export const SB_COOKIE_OPTIONS = {
  sameSite: "lax" as const,
  secure: true,
  path: "/",
};

export function createBrowserAuthClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY!,
    { cookieOptions: SB_COOKIE_OPTIONS },
  );
}
