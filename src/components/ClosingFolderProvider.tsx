'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface ClosingFolderItem {
  id: string;
  type: 'glossary' | 'checklist' | 'question' | 'note';
  title: string;
  content: string;
  savedAt: string;
}

interface ClosingFolderContextValue {
  items: ClosingFolderItem[];
  addItem: (item: Omit<ClosingFolderItem, 'id' | 'savedAt'>) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
}

const STORAGE_KEY = 'hc101-closingFolder';

export const ClosingFolderContext = createContext<ClosingFolderContextValue | null>(null);

export function useClosingFolder() {
  const ctx = useContext(ClosingFolderContext);
  if (!ctx) {
    throw new Error('useClosingFolder must be used within a ClosingFolderProvider');
  }
  return ctx;
}

export default function ClosingFolderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ClosingFolderItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<ClosingFolderItem, 'id' | 'savedAt'>) => {
    const newItem: ClosingFolderItem = {
      ...item,
      id: `${item.type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      savedAt: new Date().toISOString(),
    };
    setItems(prev => [newItem, ...prev]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <ClosingFolderContext value={{ items, addItem, removeItem, clearAll }}>
      {children}
    </ClosingFolderContext>
  );
}
