'use client';

import { useEffect } from 'react';
import { useAchievements } from '@/components/AchievementSystem';

/** Drop into any page to unlock an achievement on mount. */
export default function AchievementTrigger({ id }: { id: string }) {
  const { unlock } = useAchievements();
  useEffect(() => {
    unlock(id);
  }, [id, unlock]);
  return null;
}
