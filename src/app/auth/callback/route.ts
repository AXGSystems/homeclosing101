// OAuth callback — exchanges the Entra code for a Supabase session on the SHARED
// auth project, then enforces the ULTRA-ADMIN allowlist server-side. A non-ultra
// account is signed out immediately and bounced to /login?denied=1, so a session
// for an unauthorized user never survives the round-trip.
import { NextResponse } from "next/server";
import { createServerAuthClient } from "@/lib/auth-server";
import { isUltraAdmin } from "@/lib/ultraAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?denied=1`);
  }

  const supabase = await createServerAuthClient(true);
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  const email = data?.user?.email ?? null;
  if (error || !isUltraAdmin(email)) {
    // Kill the just-created session so no unauthorized cookie persists.
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?denied=1`);
  }

  return NextResponse.redirect(`${origin}/`);
}
