"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";


interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHero({ title, subtitle, image, breadcrumb }: PageHeroProps) {
  const [collapsed, setCollapsed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCollapsed(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full hero */}
      <section ref={heroRef} className="relative py-3 lg:py-5 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url('${image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1b33]/92 via-[#1a2744]/88 to-[#0a8ebc]/75" />
        {/* Decorative accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-alta-teal/10 rounded-full translate-y-1/3 blur-2xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {breadcrumb && breadcrumb.length > 0 && (
            <nav className="mb-5" role="navigation" aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-xs text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    {i === breadcrumb.length - 1 ? (
                      <span className="text-white/80">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {breadcrumb && breadcrumb.length > 0 && (
          )}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">{title}</h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">{subtitle}</p>
          {/* Popular links — below subtitle */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Popular:</span>
            {[
              { label: "First-Time Buyers", href: "/first-time-buyers" },
              { label: "Wire Fraud Guide", href: "/stop-fraud" },
              { label: "Mortgage Calculator", href: "/mortgage-calculator" },
            ].map(p => (
              <Link key={p.href} href={p.href} className="text-[10px] text-white/60 hover:text-white transition-colors">{p.label}</Link>
            ))}
          </div>
          {/* Subtle bottom border accent */}
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-alta-teal to-transparent rounded-full" />
        </div>
      </section>

      {/* Collapsed mini sticky bar */}
      <div
        className={`sticky top-[88px] sm:top-[98px] z-30 transition-all duration-300 ${
          collapsed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-alta-navy/95 backdrop-blur-md border-b border-white/10 shadow-md">
          <div className="max-w-5xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              {breadcrumb && breadcrumb.length > 0 && (
                <nav className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 shrink-0" role="navigation" aria-label="Breadcrumb">
                  {breadcrumb.slice(0, -1).map((crumb) => (
                    <span key={crumb.href} className="flex items-center gap-1">
                      <Link href={crumb.href} className="hover:text-white">{crumb.label}</Link>
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  ))}
                </nav>
              )}
              <h2 className="text-sm font-bold text-white truncate">{title}</h2>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[10px] text-alta-teal hover:text-white font-medium shrink-0 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              Top
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
