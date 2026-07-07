import "server-only";
// Server-side AUTH client (SHARED staff-hub project). Reads/refreshes the Entra
// session cookie. Used by the /auth/callback route handler. Pass writeCookies
// = false from Server Components where Next forbids cookie writes.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SB_COOKIE_OPTIONS } from "./auth-browser";

export async function createServerAuthClient(writeCookies = true) {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY!,
    {
      cookieOptions: SB_COOKIE_OPTIONS,
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (
          toSet: { name: string; value: string; options?: CookieOptions }[],
        ) => {
          if (!writeCookies) return;
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* called from a Server Component — middleware refreshes instead */
          }
        },
      },
    },
  );
}
