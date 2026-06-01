export const meta = {
  name: 'hc101-instrument-sections',
  description: 'Wrap every section/subsection of all HC101 pages in <SectionGate> and return a section registry',
  phases: [{ title: 'Instrument', detail: 'one agent per page wraps sections + returns PageEntry JSON' }],
};

// route, file path (relative to repo root), and component mode
const ITEMS = [
  ['/', 'src/app/page.tsx', 'server'],
  ['/achievements', 'src/app/achievements/page.tsx', 'server'],
  ['/affordability', 'src/app/affordability/page.tsx', 'client'],
  ['/after-closing', 'src/app/after-closing/page.tsx', 'client'],
  ['/appraisal-guide', 'src/app/appraisal-guide/page.tsx', 'client'],
  ['/blog', 'src/app/blog/page.tsx', 'client'],
  ['/closing-day-prep', 'src/app/closing-day-prep/page.tsx', 'client'],
  ['/closing-disclosure', 'src/app/closing-disclosure/page.tsx', 'server'],
  ['/closing-process', 'src/app/closing-process/page.tsx', 'server'],
  ['/closing-process/closing-checklist', 'src/app/closing-process/closing-checklist/page.tsx', 'client'],
  ['/closing-process/closing-costs', 'src/app/closing-process/closing-costs/page.tsx', 'client'],
  ['/closing-process/closing-options', 'src/app/closing-process/closing-options/page.tsx', 'client'],
  ['/closing-process/what-to-expect', 'src/app/closing-process/what-to-expect/page.tsx', 'server'],
  ['/compare-loans', 'src/app/compare-loans/page.tsx', 'client'],
  ['/deed-theft', 'src/app/deed-theft/page.tsx', 'client'],
  ['/document-checklist', 'src/app/document-checklist/page.tsx', 'client'],
  ['/document-library', 'src/app/document-library/page.tsx', 'client'],
  ['/dti-calculator', 'src/app/dti-calculator/page.tsx', 'client'],
  ['/emergency-contacts', 'src/app/emergency-contacts/page.tsx', 'client'],
  ['/escrow-guide', 'src/app/escrow-guide/page.tsx', 'client'],
  ['/faq', 'src/app/faq/page.tsx', 'client'],
  ['/find-company', 'src/app/find-company/page.tsx', 'client'],
  ['/find-policy', 'src/app/find-policy/page.tsx', 'client'],
  ['/first-time-buyers', 'src/app/first-time-buyers/page.tsx', 'server'],
  ['/glossary', 'src/app/glossary/page.tsx', 'client'],
  ['/hoa-guide', 'src/app/hoa-guide/page.tsx', 'client'],
  ['/home-inspection', 'src/app/home-inspection/page.tsx', 'server'],
  ['/homeowners-insurance', 'src/app/homeowners-insurance/page.tsx', 'client'],
  ['/identity-protection', 'src/app/identity-protection/page.tsx', 'client'],
  ['/join-alta', 'src/app/join-alta/page.tsx', 'client'],
  ['/le-vs-cd', 'src/app/le-vs-cd/page.tsx', 'client'],
  ['/loan-estimate', 'src/app/loan-estimate/page.tsx', 'client'],
  ['/mortgage-calculator', 'src/app/mortgage-calculator/page.tsx', 'client'],
  ['/my-folder', 'src/app/my-folder/page.tsx', 'client'],
  ['/my-journey', 'src/app/my-journey/page.tsx', 'client'],
  ['/negotiation-guide', 'src/app/negotiation-guide/page.tsx', 'client'],
  ['/property-rights', 'src/app/property-rights/page.tsx', 'client'],
  ['/protect-against-deed-fraud', 'src/app/protect-against-deed-fraud/page.tsx', 'client'],
  ['/protect-your-money', 'src/app/protect-your-money/page.tsx', 'server'],
  ['/protect-your-rights', 'src/app/protect-your-rights/page.tsx', 'server'],
  ['/questions-to-ask', 'src/app/questions-to-ask/page.tsx', 'client'],
  ['/rent-vs-buy', 'src/app/rent-vs-buy/page.tsx', 'client'],
  ['/resources', 'src/app/resources/page.tsx', 'server'],
  ['/sources', 'src/app/sources/page.tsx', 'server'],
  ['/stop-fraud', 'src/app/stop-fraud/page.tsx', 'server'],
  ['/support', 'src/app/support/page.tsx', 'client'],
  ['/tax-benefits', 'src/app/tax-benefits/page.tsx', 'client'],
  ['/trivia', 'src/app/trivia/page.tsx', 'client'],
  ['/true-cost', 'src/app/true-cost/page.tsx', 'client'],
];

const SCHEMA = {
  type: 'object',
  required: ['route', 'sections'],
  additionalProperties: false,
  properties: {
    route: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'label'],
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          subs: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'label'],
              additionalProperties: false,
              properties: {
                id: { type: 'string' },
                label: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

const REPO = '/Users/vonscott/Desktop/homeclosing101';

function buildPrompt(route, file, mode) {
  return `You are instrumenting ONE page of the HomeClosing101 Next.js 16 app so the admin Control Center can toggle every section and subsection on/off.

ASSIGNED FILE (edit ONLY this file): ${REPO}/${file}
ROUTE for keys: "${route}"
This page is a ${mode.toUpperCase()} component.

A flash-free, hydration-safe gate primitive already exists. Import and use it:
  import { SectionGate, AdGate, ModuleGate } from "@/components/Gate";
SectionGate renders a transparent display:contents wrapper, so wrapping a flex/grid child does NOT change layout. It safely wraps server-rendered children (works in both server and client pages).

YOUR JOB:
1. Read the file fully.
2. Identify the page's MAJOR sections (hero, intro, each distinct content block, stats, timeline, tools grid, fraud/warning block, resources, FAQ, related-links, CTA, etc.). Wrap each major section's outermost JSX element in:
     <SectionGate page="${route}" id="<kebab-id>"> ...existing JSX unchanged... </SectionGate>
   Use stable, descriptive kebab-case ids unique within this page (e.g. "hero", "why-it-matters", "how-it-helps", "tools", "fraud-warning", "resources", "cta").
3. Within a major section, wrap each meaningful SUBSECTION (e.g. individual pillars, the pull-quote, a stat grid, a sub-block) in:
     <SectionGate page="${route}" id="<same-section-id>" sub="<kebab-subid>"> ... </SectionGate>
   Add subsections where there is natural internal structure; do NOT over-fragment tiny elements. One level of subsections is plenty.
4. If you encounter any of these AD components, wrap each usage in <AdGate name="ComponentName">...</AdGate>:
     InlineAd, ContextualSponsor, SponsorShowcase, SponsorTip, SponsorBadge, TrustedALTAMembers, EliteProviders
5. If you encounter any of these page-embedded MODULE components, wrap each usage in <ModuleGate name="ComponentName">...</ModuleGate>:
     FraudStats, MarketStats, HomepageTestimonials, MiniQuiz, ShareButtons, JourneyTracker, FirstTimeBuyerCTA
   (Use the exact component name as the name prop. If a component isn't in these lists, just treat it as part of its section.)

HARD RULES:
- Edit ONLY ${file}. Do NOT edit shared components, layout, or any config file. Do NOT create files.
- Preserve ALL existing JSX, classes, props and logic EXACTLY — you are ONLY adding wrapper tags and the import line.
- Keep JSX balanced and valid. Every <SectionGate>/<AdGate>/<ModuleGate> you open must close. Do not wrap across an unbalanced boundary.
- A SectionGate must wrap a SINGLE JSX element (or a fragment). When wrapping a section that is a direct child of a .map(), keep the key on the inner element; do not break the map.
- Do NOT wrap: the PageHero breadcrumb logic internals, modal/portal internals, or conditional-render guards in a way that changes behavior. You MAY wrap the visible hero as id="hero".
- For client pages that render a filtered list via .map (glossary, faq, etc.): wrap the STRUCTURAL sections (hero, sticky toolbar, the results region as a whole, modals region) — do not wrap each mapped item.
- After editing, RE-READ the file and confirm the JSX is balanced and the import is present.

Return the registry for this page as JSON matching the schema: { route: "${route}", sections: [{ id, label, subs?: [{id,label}] }] }. The label is a short human-readable title for the admin UI (e.g. "Hero", "Why This Matters"). Include EVERY section id you created (and its subs). Do not include ad/module wrappers in the returned sections list — only SectionGate ids.`;
}

phase('Instrument');

const results = await parallel(
  ITEMS.map(([route, file, mode]) => () =>
    agent(buildPrompt(route, file, mode), {
      label: `gate:${route}`,
      phase: 'Instrument',
      schema: SCHEMA,
    })
  )
);

const ok = results.filter(Boolean);
log(`Instrumented ${ok.length}/${ITEMS.length} pages`);

return { pages: ok };
