/* ------------------------------------------------------------------ */
/*  HC101 Site Versions — the four selectable "editions" of the site   */
/* ------------------------------------------------------------------ */
/*                                                                      */
/*  Default-ON model: each version lists only the keys that are OFF.    */
/*  A key absent from `off` is enabled. Fundamentals (siteStructure)    */
/*  are forced on by the provider regardless of what appears here.      */
/*                                                                      */
/*  nav follows page: the provider hides nav:/x automatically when      */
/*  page:/x is off, so versions only need to list page: keys to drop a  */
/*  page from both the route guard and the navigation.                  */
/* ------------------------------------------------------------------ */

import {
  SITE_STRUCTURE,
  MODULES,
  ADS,
  isFundamental,
  pageKey,
  sectionKey,
  moduleKey,
  adKey,
} from "./siteStructure";

export type VersionId = "full" | "moderate" | "light" | "education";

export type VersionDef = {
  id: VersionId;
  label: string;
  tagline: string;
  description: string;
  accent: string; // tailwind bg color for the admin card
  off: string[];
};

/* ---- helpers to build OFF lists from intent --------------------- */

const ALL_ROUTES = SITE_STRUCTURE.map((p) => p.route);
const ALL_MODULES = MODULES.map((m) => m.key);
const ALL_ADS = ADS.map((a) => a.key);

/** page: keys for every route EXCEPT the ones we want to keep (and fundamentals). */
function pagesOffExcept(keep: string[]): string[] {
  const keepSet = new Set(keep);
  return ALL_ROUTES.filter((r) => !keepSet.has(r))
    .map(pageKey)
    .filter((k) => !isFundamental(k));
}

/** module: keys for a list of module names. */
const modulesOff = (names: string[]) =>
  names.filter((n) => ALL_MODULES.includes(n)).map(moduleKey);

/** ad: keys (pass [] explicitly, or omit to keep all). */
const adsOff = (names: string[]) =>
  names.filter((n) => ALL_ADS.includes(n)).map(adKey);

const ALL_ADS_OFF = ALL_ADS.map(adKey);

/* ------------------------------------------------------------------ */
/*  Version definitions                                                */
/* ------------------------------------------------------------------ */

export const VERSIONS: Record<VersionId, VersionDef> = {
  /* ---------------------------------------------------------------- */
  full: {
    id: "full",
    label: "Full / Current",
    tagline: "Everything on",
    description:
      "The complete site as it stands today — every page, tool, protection resource, sponsor format and interactive feature enabled.",
    accent: "bg-[#1a5276]",
    off: [],
  },

  /* ----------------------------------------------------------------
     Moderate — keeps the core, drops the overkill. Trims gamification
     and the noisiest sponsor formats; keeps all educational content,
     tools, and protection resources.
  ---------------------------------------------------------------- */
  moderate: {
    id: "moderate",
    label: "Moderate",
    tagline: "Core, without the overkill",
    description:
      "Keeps all educational content, calculators and protection resources, but removes gamification (trivia, achievements, journey tracker) and the most intrusive sponsor formats.",
    accent: "bg-[#0a7ea8]",
    off: [
      ...pagesOffExcept(
        ALL_ROUTES.filter(
          (r) => !["/trivia", "/achievements", "/my-journey"].includes(r)
        )
      ),
      ...modulesOff([
        "AchievementSystem",
        "MiniQuiz",
        "OnboardingTour",
        "MarketStats",
        "JourneyTracker",
      ]),
      ...adsOff(["StickyBottomAd", "SponsorTip", "SponsorBadge"]),
      // homepage trims
      sectionKey("/", "testimonials"),
    ],
  },

  /* ----------------------------------------------------------------
     Light — the easy executive sell. A lean, clean site: brand shell,
     a short spine of essential education + the primary tool + the key
     protection pages + reference (glossary/FAQ) + contact. No ads, no
     gamification, minimal modules.
  ---------------------------------------------------------------- */
  light: {
    id: "light",
    label: "Light",
    tagline: "The easy executive sell",
    description:
      "A minimal, polished site: homepage, the closing-process spine, the primary calculator, core fraud-protection pages, glossary/FAQ, and contact. No ads, no gamification, no clutter.",
    accent: "bg-[#2d6b3f]",
    off: [
      ...pagesOffExcept([
        "/",
        "/closing-process",
        "/find-company",
        "/protect-your-rights",
        "/protect-against-deed-fraud",
        "/first-time-buyers",
        "/closing-disclosure",
        "/deed-theft",
        "/glossary",
        "/faq",
        "/mortgage-calculator",
        "/support",
        "/join-alta",
      ]),
      ...modulesOff([
        "AchievementSystem",
        "MiniQuiz",
        "OnboardingTour",
        "MarketStats",
        "HomepageTestimonials",
        "JourneyTracker",
        "ShareButtons",
        "NewsTicker",
        "HomeClosingAI",
        "CountyLookup",
        "ProtectionToolkit",
      ]),
      ...ALL_ADS_OFF,
      // homepage trims — keep the spine, drop the extras
      sectionKey("/", "testimonials"),
      sectionKey("/", "tools"),
      sectionKey("/", "where-to-start"),
      sectionKey("/", "roadmap"),
      sectionKey("/", "resources"),
    ],
  },

  /* ----------------------------------------------------------------
     Education-First — learning front and centre. Closing explainers,
     glossary, FAQ, blog and protection education lead; calculators and
     utility/gamification features and sponsors step back.
  ---------------------------------------------------------------- */
  education: {
    id: "education",
    label: "Education-First",
    tagline: "Learning front and centre",
    description:
      "Leads with closing-process explainers, glossary, FAQ, blog and protection education. Calculators, gamification and sponsor formats are de-emphasised.",
    accent: "bg-[#5b3a8c]",
    off: [
      ...pagesOffExcept(
        ALL_ROUTES.filter(
          (r) =>
            ![
              "/mortgage-calculator",
              "/dti-calculator",
              "/rent-vs-buy",
              "/compare-loans",
              "/true-cost",
              "/affordability",
              "/trivia",
              "/achievements",
              "/my-journey",
              "/my-folder",
            ].includes(r)
        )
      ),
      ...modulesOff([
        "AchievementSystem",
        "MiniQuiz",
        "JourneyTracker",
        "MarketStats",
        "HomepageTestimonials",
      ]),
      ...ALL_ADS_OFF,
      // homepage trims — de-emphasise tools, keep the educational spine
      sectionKey("/", "tools"),
      sectionKey("/", "testimonials"),
    ],
  },
};

export const VERSION_IDS: VersionId[] = ["full", "moderate", "light", "education"];

export function versionOffSet(id: VersionId): Set<string> {
  return new Set(VERSIONS[id].off.filter((k) => !isFundamental(k)));
}
