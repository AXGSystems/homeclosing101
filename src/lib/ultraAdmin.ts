/* ------------------------------------------------------------------ */
/*  Ultra-Admin allowlist — HC101 is locked to ULTRA ADMIN ONLY.        */
/* ------------------------------------------------------------------ */
/*                                                                      */
/*  The entire site sits behind Microsoft Entra SSO (shared staff-hub   */
/*  auth project) AND a hard ultra-admin allowlist. A signed-in ALTA    */
/*  user who is NOT on this list gets bounced to /login?denied=1 — no    */
/*  content is ever rendered for them. Read from                        */
/*  NEXT_PUBLIC_ULTRA_ADMIN_EMAILS (comma-separated); defaults to the    */
/*  IT ultra-admin pair so a missing env can never fail-open to public.  */
/* ------------------------------------------------------------------ */

// Ultra Admin = the Director of IT & Security ONLY (vscott@alta.org). This is a
// deliberately narrower tier than the standard vscott+fnguyen admin pair.
const DEFAULT_ULTRA = "vscott@alta.org";

export const ULTRA_ADMIN_EMAILS: ReadonlySet<string> = new Set(
  (process.env.NEXT_PUBLIC_ULTRA_ADMIN_EMAILS ?? DEFAULT_ULTRA)
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean),
);

/** True only when `email` is on the ultra-admin allowlist (case-insensitive). */
export function isUltraAdmin(email?: string | null): boolean {
  return email ? ULTRA_ADMIN_EMAILS.has(email.toLowerCase()) : false;
}
