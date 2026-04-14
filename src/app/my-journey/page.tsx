"use client";

import PageHero from "@/components/PageHero";
import JourneyTracker from "@/components/JourneyTracker";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

export default function MyJourneyPage() {
  return (
    <>
      <PageHero
        title="My Homebuying Journey"
        subtitle="Track your progress through the 8 key steps of buying a home. Click each step to mark it complete — your progress is saved automatically."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "Resources", href: "/resources" },
          { label: "My Homebuying Journey", href: "/my-journey" },
        ]}
      />

      <section className="py-12 bg-alta-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <JourneyTracker />
        </div>
      </section>

      <FirstTimeBuyerCTA />
    </>
  );
}
