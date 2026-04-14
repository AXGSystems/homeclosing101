import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("hc101_session")?.value;
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const [username, ...nameParts] = session.split(":");
  const name = nameParts.join(":");

  return NextResponse.json({ user: { username, name } });
}
