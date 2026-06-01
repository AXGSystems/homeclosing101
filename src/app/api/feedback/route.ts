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

type FeedbackType = "bug" | "suggestion" | "feedback" | "question" | "support";

const typeConfig: Record<FeedbackType, {
  label: string;
  accentColor: string;
  accentGradient: string;
  icon: string;
  recipients: string[];
}> = {
  bug: {
    label: "Bug Report",
    accentColor: "#c0392b",
    accentGradient: "linear-gradient(135deg, #c0392b 0%, #96281b 100%)",
    icon: "🐛",
    recipients: ["vscott@alta.org"],
  },
  suggestion: {
    label: "Suggestion",
    accentColor: "#0a8ebc",
    accentGradient: "linear-gradient(135deg, #0a8ebc 0%, #077a9e 100%)",
    icon: "💡",
    recipients: ["vscott@alta.org"],
  },
  feedback: {
    label: "General Feedback",
    accentColor: "#2d8f5e",
    accentGradient: "linear-gradient(135deg, #2d8f5e 0%, #1e6b42 100%)",
    icon: "💬",
    recipients: ["vscott@alta.org"],
  },
  question: {
    label: "Question / Support",
    accentColor: "#8b5cf6",
    accentGradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    icon: "❓",
    recipients: ["vscott@alta.org", "eblosser@alta.org"],
  },
  support: {
    label: "Question / Support",
    accentColor: "#2d8f5e",
    accentGradient: "linear-gradient(135deg, #2d8f5e 0%, #1e6b42 100%)",
    icon: "❓",
    recipients: ["vscott@alta.org", "eblosser@alta.org"],
  },
};

function buildEmailHtml(type: FeedbackType, name: string, email: string, message: string, topic?: string): string {
  const config = typeConfig[type];

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f4f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f4f7fa; padding: 32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

        <!-- Header with gradient banner -->
        <tr><td style="background: ${config.accentGradient}; border-radius: 16px 16px 0 0; padding: 0;">
          <!-- Top bar with logo area -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding: 24px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 8px 12px;">
                    <span style="color: white; font-weight: 800; font-size: 16px; letter-spacing: -0.5px;">HomeClosing</span><span style="color: rgba(255,255,255,0.8); font-weight: 800; font-size: 16px;">101</span>
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding: 12px 32px 28px 32px;">
              <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                ${config.icon}&nbsp;&nbsp;${config.label}
              </h1>
              <p style="margin: 6px 0 0 0; color: rgba(255,255,255,0.7); font-size: 13px;">
                Submitted via HomeClosing101 &mdash; ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Body -->
        <tr><td style="background: white; padding: 32px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
          <!-- Contact info cards -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
              <td width="50%" style="padding-right: 8px; vertical-align: top;">
                <div style="background: #f8fafc; border-radius: 10px; padding: 14px 16px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">From</p>
                  <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a2744;">${name || "Anonymous"}</p>
                </div>
              </td>
              <td width="50%" style="padding-left: 8px; vertical-align: top;">
                <div style="background: #f8fafc; border-radius: 10px; padding: 14px 16px; border: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 4px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Email</p>
                  <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1a2744;">${email ? `<a href="mailto:${email}" style="color: ${config.accentColor}; text-decoration: none;">${email}</a>` : "Not provided"}</p>
                </div>
              </td>
            </tr>
          </table>

          ${topic ? `
          <!-- Topic -->
          <div style="margin-bottom: 20px;">
            <span style="display: inline-block; background: ${config.accentColor}15; color: ${config.accentColor}; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${topic}
            </span>
          </div>
          ` : ""}

          <!-- Message -->
          <div style="border-left: 4px solid ${config.accentColor}; background: #fafbfc; border-radius: 0 10px 10px 0; padding: 20px 24px; margin-bottom: 8px;">
            <p style="margin: 0 0 8px 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background: #1a2744; border-radius: 0 0 16px 16px; padding: 20px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.5);">
                  <span style="font-weight: 700; color: rgba(255,255,255,0.8);">HomeClosing101</span> &mdash; An ALTA Educational Initiative
                </p>
                <p style="margin: 4px 0 0 0; font-size: 11px; color: rgba(255,255,255,0.35);">
                  homeclosing101.vercel.app
                </p>
              </td>
              <td align="right" style="vertical-align: middle;">
                <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 12px; display: inline-block;">
                  <span style="color: rgba(255,255,255,0.6); font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Find. Buy. Protect.</span>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const { type, name, email, message, topic } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!typeConfig[type as FeedbackType]) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const feedbackType = type as FeedbackType;
    const config = typeConfig[feedbackType];

    const subject = `[HomeClosing101] ${config.label}${topic ? `: ${topic}` : ""}`;
    const htmlBody = buildEmailHtml(feedbackType, name || "", email || "", message, topic);

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
            toRecipients: config.recipients.map((addr) => ({
              emailAddress: { address: addr },
            })),
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
