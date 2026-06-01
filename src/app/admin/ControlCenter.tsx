"use client";

/* ------------------------------------------------------------------ */
/*  Control Center — site versions + master on/off tree                */
/* ------------------------------------------------------------------ */

import { useMemo, useState } from "react";
import { useSiteConfig } from "@/components/SiteConfigProvider";
import {
  SITE_STRUCTURE,
  MODULES,
  MODULE_CATEGORIES,
  ADS,
  isFundamental,
  pageKey,
  sectionKey,
  subKey,
  moduleKey,
  adKey,
} from "@/config/siteStructure";
import { VERSIONS, VERSION_IDS, type VersionId } from "@/config/versions";

/* ---- small switch ------------------------------------------------ */
function Switch({
  on,
  locked,
  onClick,
}: {
  on: boolean;
  locked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={locked}
      onClick={onClick}
      title={locked ? "Fundamental — always on in every version" : undefined}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        locked
          ? "bg-emerald-400/70 cursor-not-allowed"
          : on
          ? "bg-[#0a8ebc]"
          : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 text-gray-400 transition-transform ${
        open ? "rotate-90" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export default function ControlCenter() {
  const {
    version,
    toggles,
    effective,
    setVersion,
    setOverride,
    resetOverrides,
    save,
  } = useSiteConfig();

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const dirty = Object.keys(toggles).length > 0;

  const toggleExpand = (route: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(route)) next.delete(route);
      else next.add(route);
      return next;
    });

  const flip = (key: string) => {
    if (isFundamental(key)) return;
    setOverride(key, !effective(key));
  };

  const doSave = async () => {
    setSaving(true);
    const ok = await save();
    setSaving(false);
    setSavedAt(ok ? "Saved & published to the live site." : "Saved locally (cloud sync unavailable).");
    setTimeout(() => setSavedAt(null), 4000);
  };

  const openPreview = (id: VersionId) => {
    try {
      window.open(`/?v=${id}`, "_blank", "noopener");
    } catch {
      /* ignore */
    }
  };

  const q = search.trim().toLowerCase();
  const filteredPages = useMemo(() => {
    if (!q) return SITE_STRUCTURE;
    return SITE_STRUCTURE.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q) ||
        p.navGroup.toLowerCase().includes(q) ||
        p.sections.some(
          (s) =>
            s.label.toLowerCase().includes(q) ||
            (s.subs ?? []).some((sub) => sub.label.toLowerCase().includes(q))
        )
    );
  }, [q]);

  /* counts */
  const enabledPages = SITE_STRUCTURE.filter((p) =>
    effective(pageKey(p.route))
  ).length;

  return (
    <div className="space-y-8">
      {/* ---- Versions ------------------------------------------------ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-[#1a2744]">Site Versions</h2>
            <p className="text-xs text-gray-500">
              Pick an edition of the site. Applying a version replaces all
              toggles below; you can then fine-tune individual items.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {VERSION_IDS.map((id) => {
            const v = VERSIONS[id];
            const active = version === id && !dirty;
            return (
              <div
                key={id}
                className={`rounded-xl border p-4 transition-all ${
                  version === id
                    ? "border-[#0a8ebc] ring-2 ring-[#0a8ebc]/30 bg-[#f0f9fc]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${v.accent}`}
                  />
                  <h3 className="text-sm font-bold text-[#1a2744]">
                    {v.label}
                  </h3>
                </div>
                <p className="mt-0.5 text-[11px] font-medium text-[#0a8ebc]">
                  {v.tagline}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500 min-h-[56px]">
                  {v.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVersion(id)}
                    className={`flex-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-[#0a8ebc] text-white"
                        : version === id
                        ? "bg-[#0a8ebc]/10 text-[#0a8ebc]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {version === id ? (dirty ? "Re-apply" : "Active") : "Apply"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openPreview(id)}
                    className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    title="Preview in a new tab (does not change the live site)"
                  >
                    Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Save bar ------------------------------------------------ */}
      <div className="sticky top-2 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
        <div className="text-xs text-gray-600">
          Active version:{" "}
          <span className="font-bold text-[#1a2744]">
            {VERSIONS[version].label}
          </span>
          {dirty && (
            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              {Object.keys(toggles).length} custom override
              {Object.keys(toggles).length === 1 ? "" : "s"}
            </span>
          )}
          <span className="ml-3 text-gray-400">
            {enabledPages}/{SITE_STRUCTURE.length} pages on
          </span>
        </div>
        <div className="flex items-center gap-2">
          {savedAt && (
            <span className="text-[11px] font-medium text-emerald-600">
              {savedAt}
            </span>
          )}
          {dirty && (
            <button
              type="button"
              onClick={resetOverrides}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100"
            >
              Clear overrides
            </button>
          )}
          <button
            type="button"
            onClick={doSave}
            disabled={saving}
            className="rounded-lg bg-[#1a2744] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#0f1a30] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & Publish"}
          </button>
        </div>
      </div>

      {/* ---- Master tree -------------------------------------------- */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#1a2744]">
            Pages, Sections &amp; Subsections
          </h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter pages & sections…"
            className="w-56 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0a8ebc]"
          />
        </div>

        <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {filteredPages.map((p) => {
            const pKey = pageKey(p.route);
            const pOn = effective(pKey);
            const locked = isFundamental(pKey);
            const isOpen = expanded.has(p.route) || !!q;
            const hasChildren = p.sections.length > 0;
            return (
              <div key={p.route}>
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => hasChildren && toggleExpand(p.route)}
                    className={`flex h-5 w-5 items-center justify-center ${
                      hasChildren ? "" : "invisible"
                    }`}
                  >
                    <Chevron open={isOpen} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`truncate text-sm font-semibold ${
                          pOn ? "text-[#1a2744]" : "text-gray-400"
                        }`}
                      >
                        {p.label}
                      </span>
                      {locked && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                          Fundamental
                        </span>
                      )}
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-gray-400">
                        {p.navGroup}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">{p.route}</span>
                  </div>
                  {hasChildren && (
                    <span className="text-[10px] text-gray-400">
                      {p.sections.length} section
                      {p.sections.length === 1 ? "" : "s"}
                    </span>
                  )}
                  <Switch on={pOn} locked={locked} onClick={() => flip(pKey)} />
                </div>

                {isOpen && hasChildren && (
                  <div className="bg-gray-50/60 px-3 pb-2">
                    {p.sections.map((s) => {
                      const sKey = sectionKey(p.route, s.id);
                      const sOn = pOn && effective(sKey);
                      return (
                        <div key={s.id} className="pl-7">
                          <div className="flex items-center gap-2 py-1.5">
                            <span
                              className={`flex-1 truncate text-xs font-medium ${
                                sOn ? "text-gray-700" : "text-gray-400"
                              }`}
                            >
                              {s.label}
                            </span>
                            <Switch
                              on={effective(sKey)}
                              onClick={() => flip(sKey)}
                            />
                          </div>
                          {(s.subs ?? []).length > 0 && (
                            <div className="pl-4">
                              {(s.subs ?? []).map((sub) => {
                                const subK = subKey(p.route, s.id, sub.id);
                                return (
                                  <div
                                    key={sub.id}
                                    className="flex items-center gap-2 py-1"
                                  >
                                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                                    <span
                                      className={`flex-1 truncate text-[11px] ${
                                        effective(subK)
                                          ? "text-gray-600"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {sub.label}
                                    </span>
                                    <Switch
                                      on={effective(subK)}
                                      onClick={() => flip(subK)}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Modules ------------------------------------------------- */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-[#1a2744]">Modules &amp; Features</h2>
        <div className="space-y-4">
          {MODULE_CATEGORIES.map((cat) => {
            const mods = MODULES.filter((m) => m.category === cat);
            if (!mods.length) return null;
            return (
              <div key={cat} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  {cat}
                </p>
                <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                  {mods.map((m) => {
                    const mKey = moduleKey(m.key);
                    return (
                      <div key={m.key} className="flex items-center gap-2 py-1">
                        <span
                          className={`flex-1 truncate text-xs ${
                            effective(mKey) ? "text-gray-700" : "text-gray-400"
                          }`}
                        >
                          {m.label}
                        </span>
                        <Switch on={effective(mKey)} onClick={() => flip(mKey)} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Ads ----------------------------------------------------- */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-[#1a2744]">Ad &amp; Sponsor Formats</h2>
        <div className="grid gap-x-6 gap-y-1 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
          {ADS.map((a) => {
            const aKey = adKey(a.key);
            return (
              <div key={a.key} className="flex items-center gap-2 py-1">
                <span
                  className={`flex-1 truncate text-xs ${
                    effective(aKey) ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {a.label}
                </span>
                <Switch on={effective(aKey)} onClick={() => flip(aKey)} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
