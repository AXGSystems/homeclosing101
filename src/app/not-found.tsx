import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const popularPages = [
  { label: "Home", href: "/", desc: "Back to the homepage" },
  {
    label: "First-Time Buyers",
    href: "/first-time-buyers",
    desc: "Step-by-step guide for new homebuyers",
  },
  {
    label: "Closing Process",
    href: "/closing-process",
    desc: "Understand every step of your closing",
  },
  {
    label: "Glossary",
    href: "/glossary",
    desc: "452 real estate terms defined",
  },
  { label: "FAQ", href: "/faq", desc: "Frequently asked questions" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient matching ALTA brand */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b33] via-[#1a2744] to-[#0a8ebc]/40" />
      {/* Decorative accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-alta-teal/10 rounded-full translate-y-1/3 blur-2xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        {/* 404 display */}
        <div className="mb-6">
          <span className="text-7xl sm:text-8xl font-black text-white/10 select-none">
            404
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-10 max-w-md mx-auto leading-relaxed">
          The page you are looking for may have moved or no longer exists. Use
          the links below to get back on track.
        </p>

        {/* Popular pages grid */}
        <div className="grid gap-3 sm:grid-cols-2 text-left mb-8">
          {popularPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 hover:bg-white/20 hover:border-alta-teal/40 transition-all"
            >
              <span className="text-sm font-semibold text-white group-hover:text-alta-teal transition-colors">
                {page.label}
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">
                {page.desc}
              </span>
            </Link>
          ))}
        </div>

        {/* Accent bar */}
        <div className="mx-auto w-20 h-1 bg-gradient-to-r from-alta-teal to-transparent rounded-full" />
      </div>
    </section>
  );
}
