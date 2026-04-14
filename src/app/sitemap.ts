import type { MetadataRoute } from "next";

const BASE_URL = "https://homeclosing101.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    // Core pages
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    {
      path: "/first-time-buyers",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-process",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-process/what-to-expect",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-process/closing-costs",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-process/closing-checklist",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-process/closing-options",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },

    {
      path: "/closing-day-prep",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },

    // Documents & tools
    {
      path: "/closing-disclosure",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/loan-estimate",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/document-checklist",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/document-library",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/mortgage-calculator",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/affordability",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/rent-vs-buy",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/dti-calculator",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/compare-loans",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },

    // Protection & insurance
    {
      path: "/protect-your-rights",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/protect-your-money",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/stop-fraud",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/homeowners-insurance",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/home-inspection",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/escrow-guide",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },

    // Find services
    {
      path: "/find-company",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/find-policy",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },

    // Resources & reference
    {
      path: "/glossary",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/questions-to-ask",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/resources",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    {
      path: "/sources",
      priority: 0.4,
      changeFrequency: "monthly" as const,
    },
    { path: "/trivia", priority: 0.6, changeFrequency: "monthly" as const },
    {
      path: "/achievements",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/my-folder",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/my-journey",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },

    // Gamification & progress
    {
      path: "/achievements",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/closing-day-prep",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },

    // ALTA
    {
      path: "/join-alta",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
