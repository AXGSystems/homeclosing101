"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "I had no idea what title insurance was until I found HomeClosing101. The guides broke everything down so clearly that I actually understood what I was signing at closing.",
    role: "First-Time Buyer",
    location: "Austin, TX",
    accent: "#0a7ea8",
  },
  {
    quote:
      "The closing cost calculator saved us from a nasty surprise. We budgeted an extra $4,000 we didn't know we'd need. Worth every minute spent on this site.",
    role: "Recent Homeowner",
    location: "Charlotte, NC",
    accent: "#2d6b3f",
  },
  {
    quote:
      "I send every client to HomeClosing101 before we start the process. The wire fraud prevention section alone has probably saved someone I know from losing their down payment.",
    role: "Real Estate Agent",
    location: "Denver, CO",
    accent: "#5b3a8c",
  },
  {
    quote:
      "As a settlement agent, I appreciate how accurately this site explains the closing process. It's the resource I wish every buyer would read before they sit down at my table.",
    role: "Settlement Agent",
    location: "Philadelphia, PA",
    accent: "#1a5276",
  },
];

export default function HomepageTestimonials() {
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  const next = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="py-14 lg:py-18 bg-gradient-to-b from-white to-[#f8f9fb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-alta-navy mb-3">
            What Homebuyers Say
          </h2>
          <p className="text-alta-gray max-w-xl mx-auto">
            Real feedback from buyers, agents, and settlement professionals who
            used HomeClosing101.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 min-h-[220px] flex flex-col items-center justify-center">
          {/* Quote icon */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-5 transition-colors duration-300"
            style={{ backgroundColor: `${t.accent}12` }}
          >
            <svg
              className="w-6 h-6 transition-colors duration-300"
              style={{ color: t.accent }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
          </div>

          {/* Quote text with fade */}
          <div
            className={`transition-opacity duration-300 text-center ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-alta-navy text-lg leading-relaxed italic mb-6 max-w-2xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: t.accent }}
              />
              <p className="text-sm font-semibold text-alta-navy">{t.role}</p>
              <span className="text-alta-gray text-sm">{t.location}</span>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i !== active) {
                    setFade(false);
                    setTimeout(() => {
                      setActive(i);
                      setFade(true);
                    }, 300);
                  }
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 h-2.5"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                style={
                  i === active ? { backgroundColor: t.accent } : undefined
                }
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
