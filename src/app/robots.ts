import type { MetadataRoute } from "next";

// HC101 is a PRIVATE, ultra-admin-only environment — no crawler of any kind is
// permitted, and there is no sitemap advertised. Named AI/LLM crawlers are
// disallowed explicitly (belt-and-suspenders; the SSO wall already blocks them).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "Diffbot",
  "cohere-ai",
  "YouBot",
  "Timpibot",
  "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", disallow: "/" },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, disallow: "/" })),
    ],
  };
}
