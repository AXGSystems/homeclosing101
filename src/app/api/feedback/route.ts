import { NextRequest, NextResponse } from "next/server";

interface GraphTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

async function getAccessToken(): Promise<string> {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Missing Azure AD credentials");
  }

  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status}`);
  }

  const data: GraphTokenResponse = await res.json();
  return data.access_token;
}

const SHARED_MAILBOX = "qa-alerts@alta.org";

export async function POST(request: NextRequest) {
  try {
    const { type, name, email, message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (type !== "bug" && type !== "suggestion") {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const subject =
      type === "bug"
        ? `[HomeClosing101] Bug Report`
        : `[HomeClosing101] Suggestion`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background: ${type === "bug" ? "#c0392b" : "#0a8ebc"}; color: white; padding: 16px 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 18px;">${type === "bug" ? "Bug Report" : "Suggestion"} — HomeClosing101</h2>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: 0; padding: 20px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: bold; color: #6b7a8d; width: 80px; vertical-align: top;">From:</td>
              <td style="padding: 6px 0;">${name || "Anonymous"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: bold; color: #6b7a8d; vertical-align: top;">Email:</td>
              <td style="padding: 6px 0;">${email || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px 6px 0; font-weight: bold; color: #6b7a8d; vertical-align: top;">Type:</td>
              <td style="padding: 6px 0;">${type === "bug" ? "Bug Report" : "Suggestion"}</td>
            </tr>
          </table>
          <div style="background: #f4f7fa; border-radius: 6px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
${message}
          </div>
          <p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">
            Submitted from HomeClosing101 (homeclosing101.vercel.app)
          </p>
        </div>
      </div>
    `;

    const accessToken = await getAccessToken();

    const graphRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${SHARED_MAILBOX}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: {
              contentType: "HTML",
              content: htmlBody,
            },
            toRecipients: [
              { emailAddress: { address: SHARED_MAILBOX } },
            ],
            ...(email
              ? { replyTo: [{ emailAddress: { address: email, name: name || undefined } }] }
              : {}),
          },
        }),
      }
    );

    if (!graphRes.ok) {
      const errorText = await graphRes.text();
      console.error("Graph API error:", graphRes.status, errorText);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
