"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserAuthClient } from "@/lib/auth-browser";

function MicrosoftLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden style={{ flex: "none" }}>
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function LoginInner() {
  const params = useSearchParams();
  const denied = params.get("denied") === "1";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A denied (non-ultra-admin) session lands here — sign it out so the next
  // attempt is clean and the account chooser can offer a different account.
  useEffect(() => {
    if (denied) createBrowserAuthClient().auth.signOut();
  }, [denied]);

  async function signIn() {
    setBusy(true);
    setError(null);
    const { error } = await createBrowserAuthClient().auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "openid profile email",
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
      setBusy(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "linear-gradient(160deg,#0a1a3a 0%,#04122b 55%,#020b1c 100%)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "36px 30px",
          textAlign: "center",
          borderRadius: 18,
          background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.10)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 24px 60px rgba(0,0,0,.45)",
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "#C4972A",
            fontWeight: 800,
            marginBottom: 10,
          }}
        >
          Restricted
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px", color: "#eef4fb" }}>
          Private Application
        </h1>
        <p style={{ color: "#9fb3c8", fontSize: 13, lineHeight: 1.6, margin: "0 0 22px" }}>
          This environment is restricted to authorized ALTA administrators.
          Sign in with your ALTA account to continue.
        </p>

        {denied && (
          <div
            style={{
              background: "rgba(178,94,0,.16)",
              color: "#ffca7a",
              border: "1px solid rgba(240,160,60,.35)",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 12.5,
              marginBottom: 14,
              textAlign: "left",
            }}
          >
            That account isn&rsquo;t authorized for this environment. Sign in with
            an authorized administrator account.
          </div>
        )}
        {error && (
          <div
            style={{
              background: "rgba(179,38,30,.16)",
              color: "#ff9a93",
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: 12.5,
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={signIn}
          disabled={busy}
          style={{
            width: "100%",
            padding: "13px 16px",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            borderRadius: 10,
            border: "none",
            cursor: busy ? "default" : "pointer",
            background: "#C4972A",
            color: "#0a1a3a",
            fontWeight: 700,
          }}
        >
          <MicrosoftLogo />
          {busy ? "Redirecting…" : "Sign in with Microsoft"}
        </button>
        <p style={{ fontSize: 11.5, color: "#7e8ea3", marginTop: 14 }}>
          ALTA single sign-on — same as the Staff Hub
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
