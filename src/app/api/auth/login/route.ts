import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  for (let i = 1; i <= 6; i++) {
    const envUser = process.env[`USER_${i}_USERNAME`];
    const envPass = process.env[`USER_${i}_PASSWORD`];
    const envName = process.env[`USER_${i}_NAME`];

    if (envUser === username && envPass === password) {
      const res = NextResponse.json({
        success: true,
        user: { name: envName, username: envUser },
      });
      res.cookies.set("hc101_session", `${envUser}:${envName}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
