export const meta = {
  name: 'hc101-instrument-changed',
  description: 'Re-instrument the 17 pages that changed upstream with <SectionGate> and return their section registry',
  phases: [{ title: 'Instrument', detail: 'one agent per changed page' }],
};

const ITEMS = [
  ['/', 'src/app/page.tsx', 'server'],
  ['/closing-process', 'src/app/closing-process/page.tsx', 'server'],
  ['/closing-process/what-to-expect', 'src/app/closing-process/what-to-expect/page.tsx', 'server'],
  ['/deed-theft', 'src/app/deed-theft/page.tsx', 'client'],
  ['/emergency-contacts', 'src/app/emergency-contacts/page.tsx', 'client'],
  ['/find-company', 'src/app/find-company/page.tsx', 'client'],
  ['/find-policy', 'src/app/find-policy/page.tsx', 'client'],
  ['/first-time-buyers', 'src/app/first-time-buyers/page.tsx', 'server'],
  ['/hoa-guide', 'src/app/hoa-guide/page.tsx', 'client'],
  ['/homeowners-insurance', 'src/app/homeowners-insurance/page.tsx', 'client'],
  ['/loan-estimate', 'src/app/loan-estimate/page.tsx', 'client'],
  ['/mortgage-calculator', 'src/app/mortgage-calculator/page.tsx', 'client'],
  ['/property-rights', 'src/app/property-rights/page.tsx', 'client'],
  ['/protect-your-rights', 'src/app/protect-your-rights/page.tsx', 'server'],
  ['/sources', 'src/app/sources/page.tsx', 'server'],
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
              properties: { id: { type: 'string' }, label: { type: 'string' } },
            },
          },
        },
      },
    },
  },
};

const REPO = '/Users/vonscott/Desktop/homeclosing101';

function buildPrompt(route, file, mode) {
  return `You are instrumenting ONE page of the HomeClosing101 Next.js 16 app so the admin Control Center can toggle every section and subsection on/off. This page was just updated, so instrument its CURRENT content.

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
   Use stable, descriptive kebab-case ids unique within this page (e.g. "hero", "why-it-matters", "tools", "fraud-warning", "resources", "cta").
3. Within a major section, wrap each meaningful SUBSECTION in:
     <SectionGate page="${route}" id="<same-section-id>" sub="<kebab-subid>"> ... </SectionGate>
   Add subsections where there is natural internal structure; do NOT over-fragment tiny elements. One level of subsections is plenty.
4. If you encounter any of these AD components, wrap each usage in <AdGate name="ComponentName">...</AdGate>:
     InlineAd, ContextualSponsor, SponsorShowcase, SponsorTip, SponsorBadge, TrustedALTAMembers, EliteProviders
5. If you encounter any of these page-embedded MODULE components, wrap each usage in <ModuleGate name="ComponentName">...</ModuleGate>:
     FraudStats, MarketStats, HomepageTestimonials, MiniQuiz, ShareButtons, JourneyTracker, FirstTimeBuyerCTA, IndustryPartnersStrip
   (Use the exact component name as the name prop. If a component isn't in these lists, just treat it as part of its section.)

HARD RULES:
- Edit ONLY ${file}. Do NOT edit shared components, layout, or any config file. Do NOT create files.
- Preserve ALL existing JSX, classes, props and logic EXACTLY — you are ONLY adding wrapper tags and the import line.
- Keep JSX balanced and valid. Every wrapper you open must close. When wrapping an element inside a .map(), keep the key on the inner element; do not break the map.
- Do NOT wrap modal/portal internals or conditional-render guards in a way that changes behavior. You MAY wrap the visible hero as id="hero".
- For client pages that render a filtered list via .map (glossary, faq, etc.): wrap the STRUCTURAL sections, not each mapped item.
- After editing, RE-READ the file and confirm the JSX is balanced and the import is present.

Return the registry for this page as JSON: { route: "${route}", sections: [{ id, label, subs?: [{id,label}] }] }. label = short human title for the admin UI. Include EVERY SectionGate id you created (and subs). Do NOT include ad/module wrappers in the returned sections list.`;
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
log(`Re-instrumented ${ok.length}/${ITEMS.length} pages`);
return { pages: ok };
