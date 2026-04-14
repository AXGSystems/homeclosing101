'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENT DEFINITIONS
   ═══════════════════════════════════════════════════════ */

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG path d attribute
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
}

const ACHIEVEMENT_DEFS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Visited the First-Time Buyers guide',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    color: '#0a7ea8',
  },
  {
    id: 'word-wizard',
    title: 'Word Wizard',
    description: 'Saved 10+ glossary terms to your folder',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    color: '#5b3a8c',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Completed the trivia with 80%+ accuracy',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    color: '#d4a843',
  },
  {
    id: 'fraud-fighter',
    title: 'Fraud Fighter',
    description: 'Visited Stop Fraud and Protect Your Money',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    color: '#943030',
  },
  {
    id: 'calculator-pro',
    title: 'Calculator Pro',
    description: 'Used the mortgage calculator',
    icon: 'M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z',
    color: '#2d6b3f',
  },
  {
    id: 'closing-expert',
    title: 'Closing Expert',
    description: 'Visited all 4 closing process sub-pages',
    icon: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    color: '#1a5276',
  },
  {
    id: 'prepared-buyer',
    title: 'Prepared Buyer',
    description: 'Saved 5+ items to your closing folder',
    icon: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
    color: '#8b6914',
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Read 5+ FAQ answers',
    icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z',
    color: '#0a7ea8',
  },
];

const STORAGE_KEY = 'hc101-achievements';

/* ═══════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════ */

interface AchievementContextValue {
  achievements: Achievement[];
  unlock: (id: string) => void;
  isUnlocked: (id: string) => boolean;
}

const AchievementContext = createContext<AchievementContextValue | null>(null);

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error('useAchievements must be used within AchievementProvider');
  return ctx;
}

/* ═══════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ═══════════════════════════════════════════════════════ */

function AchievementToast({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-28 right-4 z-[900] animate-slide-in-right">
      <div
        className="flex items-center gap-3 bg-white rounded-xl shadow-2xl border-l-4 px-4 py-3 max-w-xs"
        style={{ borderLeftColor: achievement.color }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${achievement.color}20` }}
        >
          <svg className="w-5 h-5" style={{ color: achievement.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={achievement.icon} />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: achievement.color }}>Achievement Unlocked</p>
          <p className="text-sm font-bold text-alta-navy truncate">{achievement.title}</p>
          <p className="text-[11px] text-alta-gray leading-tight">{achievement.description}</p>
        </div>
        <button onClick={onClose} className="shrink-0 text-gray-300 hover:text-gray-500 ml-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════════ */

export default function AchievementProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(
    ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false }))
  );
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Achievement | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const saved: Record<string, string> = JSON.parse(stored); // id -> unlockedAt
        setAchievements(
          ACHIEVEMENT_DEFS.map((a) => ({
            ...a,
            unlocked: !!saved[a.id],
            unlockedAt: saved[a.id] || undefined,
          }))
        );
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    const data: Record<string, string> = {};
    achievements.forEach((a) => {
      if (a.unlocked && a.unlockedAt) data[a.id] = a.unlockedAt;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [achievements, hydrated]);

  const unlock = useCallback(
    (id: string) => {
      if (!hydrated) return;
      setAchievements((prev) => {
        const existing = prev.find((a) => a.id === id);
        if (!existing || existing.unlocked) return prev;
        const now = new Date().toISOString();
        const updated = prev.map((a) =>
          a.id === id ? { ...a, unlocked: true, unlockedAt: now } : a
        );
        // Show toast for the newly unlocked achievement
        const unlocked = updated.find((a) => a.id === id);
        if (unlocked) setToast(unlocked);
        return updated;
      });
    },
    [hydrated]
  );

  const isUnlocked = useCallback(
    (id: string) => achievements.some((a) => a.id === id && a.unlocked),
    [achievements]
  );

  return (
    <AchievementContext value={{ achievements, unlock, isUnlocked }}>
      {children}
      {toast && <AchievementToast achievement={toast} onClose={() => setToast(null)} />}
    </AchievementContext>
  );
}
