'use client';

import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { useAchievements } from '@/components/AchievementSystem';

export default function AchievementsPage() {
  const { achievements } = useAchievements();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const total = achievements.length;

  return (
    <>
      <PageHero
        title="Your Achievements"
        subtitle={`Track your HomeClosing101 learning journey. ${unlockedCount} of ${total} unlocked.`}
        image="https://images.unsplash.com/photo-1553729459-uj18a9675b?w=1920&q=80"
        breadcrumb={[
          { label: 'Resources', href: '/resources' },
          { label: 'Achievements', href: '/achievements' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-alta-navy">{unlockedCount} of {total} unlocked</p>
            <p className="text-sm text-alta-gray">{Math.round((unlockedCount / total) * 100)}%</p>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-alta-teal to-[#2d6b3f] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(unlockedCount / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Achievement grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`relative rounded-xl border p-5 text-center transition-all duration-300 ${
                a.unlocked
                  ? 'bg-white border-gray-100 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-50 border-gray-100 opacity-60'
              }`}
            >
              {/* Badge icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  a.unlocked ? '' : 'grayscale'
                }`}
                style={{
                  backgroundColor: a.unlocked ? `${a.color}15` : '#f3f4f6',
                }}
              >
                {a.unlocked ? (
                  <svg
                    className="w-8 h-8"
                    style={{ color: a.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                )}
              </div>

              {/* Status badge */}
              {a.unlocked && (
                <div className="absolute top-3 right-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: a.color }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
              )}

              <h3 className={`text-sm font-bold mb-1 ${a.unlocked ? 'text-alta-navy' : 'text-gray-400'}`}>
                {a.title}
              </h3>
              <p className={`text-xs leading-relaxed ${a.unlocked ? 'text-alta-gray' : 'text-gray-300'}`}>
                {a.description}
              </p>

              {a.unlocked && a.unlockedAt && (
                <p className="text-[10px] text-alta-gray/60 mt-2">
                  {new Date(a.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Encouragement */}
        {unlockedCount < total && (
          <div className="mt-10 text-center p-6 bg-alta-light rounded-xl border border-gray-100">
            <p className="text-sm text-alta-navy font-semibold mb-1">Keep exploring to unlock more achievements</p>
            <p className="text-xs text-alta-gray mb-4">
              Use the calculator, take the trivia, read FAQs, and save items to your folder to earn badges.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/first-time-buyers" className="text-xs font-medium text-alta-teal hover:underline">First-Time Buyers</Link>
              <span className="text-gray-300">|</span>
              <Link href="/mortgage-calculator" className="text-xs font-medium text-alta-teal hover:underline">Mortgage Calculator</Link>
              <span className="text-gray-300">|</span>
              <Link href="/trivia" className="text-xs font-medium text-alta-teal hover:underline">Trivia Challenge</Link>
              <span className="text-gray-300">|</span>
              <Link href="/glossary" className="text-xs font-medium text-alta-teal hover:underline">Glossary</Link>
            </div>
          </div>
        )}

        {unlockedCount === total && (
          <div className="mt-10 text-center p-6 bg-gradient-to-br from-[#d4a843]/10 to-[#8b6914]/5 rounded-xl border border-[#d4a843]/20">
            <p className="text-lg font-bold text-alta-navy mb-1">Congratulations!</p>
            <p className="text-sm text-alta-gray">You&apos;ve unlocked every achievement. You&apos;re truly ready to close with confidence.</p>
          </div>
        )}
      </div>
    </>
  );
}
