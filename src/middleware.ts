import { NextResponse } from "next/server";

// Auth gate DISABLED — site is open access while DNS/login issues are resolved.
// To re-enable: restore the session check and login redirect below.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
