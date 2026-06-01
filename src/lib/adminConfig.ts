"use client";

import { useEffect, useState } from "react";

export const CONFIG_KEY = "hc101-admin-config";

export type AdminConfig = {
  adToggles: Record<string, boolean>;
  pageVisibility: Record<string, boolean>;
  modules: Record<string, boolean>;
  retentionDays: number;
};

export function defaultAdminConfig(): AdminConfig {
  return { adToggles: {}, pageVisibility: {}, modules: {}, retentionDays: 30 };
}

export function getAdminConfig(): AdminConfig {
  if (typeof window === "undefined") return defaultAdminConfig();
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return { ...defaultAdminConfig(), ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return defaultAdminConfig();
}

export function saveAdminConfig(cfg: AdminConfig) {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch { /* ignore */ }
}

export function isAdEnabled(formatKey: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return true;
    const cfg: AdminConfig = JSON.parse(raw);
    const val = cfg.adToggles?.[formatKey];
    return val === undefined ? true : val;
  } catch {
    return true;
  }
}

export function isModuleEnabled(moduleKey: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return true;
    const cfg: AdminConfig = JSON.parse(raw);
    const val = cfg.modules?.[moduleKey];
    return val === undefined ? true : val;
  } catch {
    return true;
  }
}

export function isPageEnabled(pageRoute: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return true;
    const cfg: AdminConfig = JSON.parse(raw);
    const val = cfg.pageVisibility?.[pageRoute];
    return val === undefined ? true : val;
  } catch {
    return true;
  }
}

function useStorageBoolean(read: () => boolean, depKey: string): boolean {
  const [enabled, setEnabled] = useState<boolean>(true);
  useEffect(() => {
    setEnabled(read());
    const handler = (e: StorageEvent) => {
      if (e.key === CONFIG_KEY) setEnabled(read());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depKey]);
  return enabled;
}

export function useAdEnabled(formatKey: string): boolean {
  return useStorageBoolean(() => isAdEnabled(formatKey), formatKey);
}

export function useModuleEnabledHook(moduleKey: string): boolean {
  return useStorageBoolean(() => isModuleEnabled(moduleKey), moduleKey);
}
