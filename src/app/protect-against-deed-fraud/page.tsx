"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import { COUNTY_DATABASE, US_STATES } from "@/data/countyDatabase";
import type { CountyProgram, LookupResult } from "@/data/countyDatabase";
import { DEFAULT_CHECKLIST, initializeChecklist } from "@/data/deedFraudChecklist";
import type { ChecklistItem } from "@/data/deedFraudChecklist";

const STORAGE_KEY = "alta-deed-fraud-toolkit";

interface UserInfo {
  name: string;
  email: string;
}

interface ToolkitStats {
  completed: number;
  total: number;
  percentage: number;
  criticalComplete: number;
  criticalTotal: number;
}

export default function ProtectAgainstDeedFraud() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [customCounty, setCustomCounty] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: "", email: "" });
  const [expandedSection, setExpandedSection] = useState("what-is-it");
  const [showExportModal, setShowExportModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setChecklist(data.checklist || initializeChecklist());
        setUserInfo(data.userInfo || { name: "", email: "" });
        setSelectedState(data.selectedState || "");
        setSelectedCounty(data.selectedCounty || "");
      } else {
        setChecklist(initializeChecklist());
      }
    } catch {
      setChecklist(initializeChecklist());
    }
    setMounted(true);
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (checklist.length > 0 && mounted) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            checklist,
            userInfo,
            selectedState,
            selectedCounty,
            lastUpdated: new Date().toISOString(),
          })
        );
      } catch {
        /* ignore storage errors */
      }
    }
  }, [checklist, userInfo, selectedState, selectedCounty, mounted]);

  // Counties available for selected state
  const availableCounties = useMemo(() => {
    if (!selectedState) return [];
    const stateData = COUNTY_DATABASE[selectedState] || {};
    return Object.keys(stateData)
      .filter((k) => !k.startsWith("_"))
      .sort();
  }, [selectedState]);

  // Has statewide program?
  const statewideProgram = useMemo((): CountyProgram | null => {
    return (
      COUNTY_DATABASE._statewide?.[selectedState] ||
      (COUNTY_DATABASE[selectedState] as Record<string, CountyProgram>)?._stateNote ||
      null
    );
  }, [selectedState]);

  // Perform the lookup
  const handleLookup = useCallback(() => {
    if (!selectedState) return;

    const stateData = COUNTY_DATABASE[selectedState] || {};
    const countyKey = selectedCounty || customCounty;

    // Statewide takes priority if it exists
    if (statewideProgram) {
      setLookupResult({
        type: "statewide",
        data: statewideProgram,
        state: selectedState,
        county: countyKey || "All counties",
      });
      return;
    }

    // Check county-specific
    const countyData = (stateData as Record<string, CountyProgram>)[selectedCounty];
    if (selectedCounty && countyData) {
      setLookupResult({
        type: countyData.noProgram ? "no-program" : "verified",
        data: countyData,
        state: selectedState,
        county: selectedCounty,
      });
      return;
    }

    // Tier 2 fallback
    const stateName =
      US_STATES.find((s) => s.code === selectedState)?.name || selectedState;
    const county = customCounty || selectedCounty || "your county";
    setLookupResult({
      type: "fallback",
      state: selectedState,
      stateName,
      county,
      searchUrl: `https://www.google.com/search?q=${encodeURIComponent(
        `${county} ${stateName} recorder property fraud alert`
      )}`,
      pfaTry: `https://www.propertyfraudalert.com/${selectedState}${county
        .replace(/\s+County.*/i, "")
        .replace(/\s+/g, "")}`,
    });
  }, [selectedState, selectedCounty, customCounty, statewideProgram]);

  // Toolkit handlers
  const toggleItem = useCallback((id: string) => {
    setChecklist((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nowCompleted = !item.completed;
        return {
          ...item,
          completed: nowCompleted,
          completedDate: nowCompleted ? new Date().toISOString() : null,
        };
      })
    );
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }, []);

  const resetToolkit = useCallback(() => {
    if (
      window.confirm(
        "Reset your toolkit? All checked items and notes will be cleared."
      )
    ) {
      setChecklist(initializeChecklist());
      setUserInfo({ name: "", email: "" });
    }
  }, []);

  const stats: ToolkitStats = useMemo(() => {
    const completed = checklist.filter((i) => i.completed).length;
    const critical = checklist.filter((i) => i.priority === "critical");
    const criticalComplete = critical.filter((i) => i.completed).length;
    return {
      completed,
      total: checklist.length,
      percentage:
        checklist.length > 0
          ? Math.round((completed / checklist.length) * 100)
          : 0,
      criticalComplete,
      criticalTotal: critical.length,
    };
  }, [checklist]);

  return (
    <>
      <PageHero
        title="Protect Your Home From Deed Fraud"
        subtitle="Free tools, county-specific alerts, and a step-by-step checklist to safeguard your property from title theft."
        image="/images/hero-fraud.jpg"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Protect Your Money", href: "/protect-your-money" },
          { label: "Protect Against Deed Fraud", href: "/protect-against-deed-fraud" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* ============================================================
            VIDEO EMBED PLACEHOLDER
            When ready, embed an educational video here about deed fraud.
            Use a responsive 16:9 aspect-ratio container.
            ============================================================ */}

        {/* --- Section: County Alert Lookup --- */}
        <section className="mb-12">
          {/* County lookup UI will be rendered here by other agents */}
        </section>

        <InlineAd />

        {/* --- Section: What Is Deed Fraud --- */}
        <section className="mb-12">
          {/* Educational content will be rendered here by other agents */}
        </section>

        {/* --- Section: Protection Toolkit / Checklist --- */}
        <section className="mb-12">
          {/* Checklist UI will be rendered here by other agents */}
        </section>

        <InlineAd />

        {/* --- Section: Warning Signs --- */}
        <section className="mb-12">
          {/* Warning signs content will be rendered here by other agents */}
        </section>

        {/* --- Section: What To Do If You're a Victim --- */}
        <section className="mb-12">
          {/* Victim response steps will be rendered here by other agents */}
        </section>

        <FirstTimeBuyerCTA />
      </main>
    </>
  );
}
