"use client";

/* ------------------------------------------------------------------ */
/*  SiteConfigProvider — runtime consumption layer for the toggles     */
/* ------------------------------------------------------------------ */
/*                                                                      */
/*  Source of truth at runtime:                                         */
/*    - Supabase hc101_site_config rows: 'version' + 'toggles'          */
/*    - localStorage cache for instant, flash-free first paint          */
/*    - ?v=<id> query param for a NON-persisting preview override       */
/*                                                                      */
/*  Hydration rule: every resolver returns `true` (enabled) until       */
/*  `ready` flips after mount. The server renders everything ON, so the */
/*  first client render matches exactly — no hydration mismatch. The    */
/*  pre-hydration <script> in layout.tsx hides disabled units via CSS   */
/*  before paint, so there is no flash either.                          */
/* ------------------------------------------------------------------ */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import {
  allKeys,
  isFundamental,
  pageKey,
  navKey,
  sectionKey,
  subKey,
  moduleKey,
  adKey,
} from "@/config/siteStructure";
import { VERSIONS, versionOffSet, type VersionId } from "@/config/versions";

export const LS_STATE = "hc101-cc-state"; // { version, toggles }
export const LS_OFF = "hc101-cc-off"; // string[]  (effective off keys)
export const LS_OFF_BY_VERSION = "hc101-cc-offbyver"; // { [id]: string[] }

type Toggles = Record<string, boolean>;

type Ctx = {
  ready: boolean;
  version: VersionId;
  toggles: Toggles;
  previewVersion: VersionId | null;
  /** Resolve any unified key to enabled/disabled. */
  effective: (key: string) => boolean;
  setVersion: (v: VersionId) => void;
  setOverride: (key: string, on: boolean) => void;
  resetOverrides: () => void;
  /** Persist current version + overrides to Supabase. */
  save: () => Promise<boolean>;
};

const SiteConfigContext = createContext<Ctx | null>(null);

/* ---- module-level snapshot for non-React callers ----------------- */
let _snapshot: { ready: boolean; resolve: (k: string) => boolean } = {
  ready: false,
  resolve: () => true,
};

/* ---- pure resolver ---------------------------------------------- */

function makeResolver(
  version: VersionId,
  toggles: Toggles,
  preview: VersionId | null
) {
  const offCache = new Map<VersionId, Set<string>>();
  const offFor = (id: VersionId) => {
    let s = offCache.get(id);
    if (!s) {
      s = versionOffSet(id);
      offCache.set(id, s);
    }
    return s;
  };

  function resolveOwn(key: string): boolean {
    if (isFundamental(key)) return true;
    const active = preview ?? version;
    // Manual overrides apply only when not previewing a pure preset.
    if (!preview && Object.prototype.hasOwnProperty.call(toggles, key)) {
      return toggles[key];
    }
    return !offFor(active).has(key);
  }

  return function resolve(key: string): boolean {
    // nav follows its page: a hidden page is also hidden from nav.
    if (key.startsWith("nav:")) {
      const route = key.slice("nav:".length);
      if (!resolveOwn(pageKey(route))) return false;
    }
    return resolveOwn(key);
  };
}

function readCache(): { version: VersionId; toggles: Toggles } {
  try {
    const raw = localStorage.getItem(LS_STATE);
    if (raw) {
      const p = JSON.parse(raw);
      const v = (p.version as VersionId) || "full";
      return {
        version: VERSIONS[v] ? v : "full",
        toggles: p.toggles && typeof p.toggles === "object" ? p.toggles : {},
      };
    }
  } catch {
    /* ignore */
  }
  return { version: "full", toggles: {} };
}

function parsePreview(): VersionId | null {
  try {
    const m = /[?&]v=(full|moderate|light|education)/.exec(
      window.location.search
    );
    return m ? (m[1] as VersionId) : null;
  } catch {
    return null;
  }
}

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [version, setVersionState] = useState<VersionId>("full");
  const [toggles, setToggles] = useState<Toggles>({});
  const [previewVersion, setPreviewVersion] = useState<VersionId | null>(null);

  /* ---- load: cache first (sync-ish), then Supabase --------------- */
  useEffect(() => {
    const cached = readCache();
    setVersionState(cached.version);
    setToggles(cached.toggles);
    setPreviewVersion(parsePreview());
    setReady(true);

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("hc101_site_config")
          .select("config_key, config_value")
          .in("config_key", ["version", "toggles"]);
        if (error || !data || cancelled) return;
        let v: VersionId = cached.version;
        let t: Toggles = cached.toggles;
        for (const row of data) {
          if (row.config_key === "version") {
            const rv = (
              typeof row.config_value === "string"
                ? row.config_value
                : (row.config_value as string)
            ) as VersionId;
            if (VERSIONS[rv]) v = rv;
          }
          if (
            row.config_key === "toggles" &&
            row.config_value &&
            typeof row.config_value === "object"
          ) {
            t = row.config_value as Toggles;
          }
        }
        if (!cancelled) {
          setVersionState(v);
          setToggles(t);
          try {
            localStorage.setItem(
              LS_STATE,
              JSON.stringify({ version: v, toggles: t })
            );
          } catch {
            /* ignore */
          }
        }
      } catch {
        /* Supabase unavailable — cache already applied */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- keep the resolver + DOM attribute + caches in sync -------- */
  const resolve = useMemo(
    () => makeResolver(version, toggles, previewVersion),
    [version, toggles, previewVersion]
  );

  useEffect(() => {
    _snapshot = { ready, resolve };
    if (!ready) return;
    const keys = allKeys();
    const off = keys.filter((k) => !resolve(k));
    try {
      document.documentElement.setAttribute("data-hc-off", off.join(" "));
      // Keep the gate stylesheet (also injected pre-hydration by the inline
      // script in layout.tsx) in sync so toggles/preview update live.
      let style = document.getElementById(
        "hc-gate-style"
      ) as HTMLStyleElement | null;
      if (!style) {
        style = document.createElement("style");
        style.id = "hc-gate-style";
        document.head.appendChild(style);
      }
      style.textContent = off
        .map((k) => `[data-gate="${k}"]{display:none!important}`)
        .join("");
    } catch {
      /* ignore */
    }
    try {
      localStorage.setItem(LS_OFF, JSON.stringify(off));
      const byVer: Record<string, string[]> = {};
      (Object.keys(VERSIONS) as VersionId[]).forEach((id) => {
        const s = versionOffSet(id);
        byVer[id] = keys.filter((k) => s.has(k));
      });
      localStorage.setItem(LS_OFF_BY_VERSION, JSON.stringify(byVer));
    } catch {
      /* ignore */
    }
  }, [ready, resolve]);

  const setVersion = useCallback((v: VersionId) => {
    setVersionState(v);
    setToggles({}); // applying a preset clears manual overrides
    try {
      localStorage.setItem(LS_STATE, JSON.stringify({ version: v, toggles: {} }));
    } catch {
      /* ignore */
    }
  }, []);

  const setOverride = useCallback((key: string, on: boolean) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: on };
      return next;
    });
  }, []);

  const resetOverrides = useCallback(() => setToggles({}), []);

  const save = useCallback(async () => {
    try {
      try {
        localStorage.setItem(LS_STATE, JSON.stringify({ version, toggles }));
      } catch {
        /* ignore */
      }
      const { error } = await supabase.from("hc101_site_config").upsert(
        [
          {
            config_key: "version",
            config_value: version,
            updated_at: new Date().toISOString(),
          },
          {
            config_key: "toggles",
            config_value: toggles,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: "config_key" }
      );
      return !error;
    } catch {
      return false;
    }
  }, [version, toggles]);

  const value = useMemo<Ctx>(
    () => ({
      ready,
      version,
      toggles,
      previewVersion,
      effective: (key: string) => (ready ? resolve(key) : true),
      setVersion,
      setOverride,
      resetOverrides,
      save,
    }),
    [
      ready,
      version,
      toggles,
      previewVersion,
      resolve,
      setVersion,
      setOverride,
      resetOverrides,
      save,
    ]
  );

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

export function useSiteConfig(): Ctx {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    // Used outside the provider (shouldn't happen) — fail open.
    return {
      ready: false,
      version: "full",
      toggles: {},
      previewVersion: null,
      effective: () => true,
      setVersion: () => {},
      setOverride: () => {},
      resetOverrides: () => {},
      save: async () => false,
    };
  }
  return ctx;
}

export function useEnabled(key: string): boolean {
  return useSiteConfig().effective(key);
}

export function useIsPageEnabled(route: string): boolean {
  return useSiteConfig().effective(pageKey(route));
}

export function useIsNavEnabled(route: string): boolean {
  return useSiteConfig().effective(navKey(route));
}

export function useIsModuleEnabled(name: string): boolean {
  return useSiteConfig().effective(moduleKey(name));
}

export function useIsSectionEnabled(
  route: string,
  id: string,
  sub?: string
): boolean {
  const key = sub ? subKey(route, id, sub) : sectionKey(route, id);
  return useSiteConfig().effective(key);
}

/* ------------------------------------------------------------------ */
/*  Non-React helpers (snapshot-backed) — fail open until ready        */
/* ------------------------------------------------------------------ */

export function isEnabled(key: string): boolean {
  return _snapshot.ready ? _snapshot.resolve(key) : true;
}
export function isModuleEnabled(name: string): boolean {
  return isEnabled(moduleKey(name));
}
export function isAdEnabled(name: string): boolean {
  return isEnabled(adKey(name));
}
