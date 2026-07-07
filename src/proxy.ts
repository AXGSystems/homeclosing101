// HC101 — HARD LOCKDOWN (Next 16 `proxy`, formerly `middleware`).
// The entire site is private:
//   1. Microsoft Entra SSO (shared staff-hub Supabase auth project), AND
//   2. an ULTRA-ADMIN allowlist. A signed-in ALTA user who is not ultra-admin
//      never sees a single page — they are bounced to /login?denied=1.
//   3. Zero search footprint — every response carries X-Robots-Tag: noindex so
//      Google/Bing/AI crawlers drop it (they only ever reach /login anyway).
//
// To reopen the site publicly: restore a trivial pass-through proxy and flip the
// layout metadata robots back to index:true.
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { isUltraAdmin } from "@/lib/ultraAdmin";

const NOINDEX =
  "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate";

function withNoIndex(res: NextResponse): NextResponse {
  res.headers.set("X-Robots-Tag", NOINDEX);
  return res;
}

export async function proxy(req: NextRequest) {
  const res = withNoIndex(NextResponse.next({ request: req }));
  const path = req.nextUrl.pathname;

  // Auth round-trip + the login page itself must stay reachable while signed out.
  if (path === "/login" || path.startsWith("/auth/")) return res;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY!,
    {
      cookieOptions: { sameSite: "lax", secure: true, path: "/" },
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (
          cookies: { name: string; value: string; options?: CookieOptions }[],
        ) =>
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          ),
      },
    },
  );

  // getUser() also refreshes the session cookie when needed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not signed in → send to SSO login.
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return withNoIndex(NextResponse.redirect(url));
  }

  // Signed in but NOT ultra-admin → hard denial (no content ever renders).
  if (!isUltraAdmin(user.email)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "?denied=1";
    return withNoIndex(NextResponse.redirect(url));
  }

  return res;
}

export const config = {
  // Gate everything except Next internals, static assets, and the crawler
  // directives themselves (robots.txt / sitemap.xml must serve their real
  // "Disallow: /" / empty bodies rather than redirect to /login).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)",
  ],
};
