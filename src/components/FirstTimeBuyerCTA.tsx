import Link from "next/link";

export default function FirstTimeBuyerCTA() {
  return (
    <Link
      href="/first-time-buyers"
      className="first-time-buyer-cta print:hidden flex items-center gap-3 p-4 bg-gradient-to-r from-alta-teal/10 to-alta-navy/5 rounded-2xl border border-alta-teal/20 hover:border-alta-teal/40 hover:shadow-md transition-all group mt-8 mb-2"
    >
      <div className="w-10 h-10 rounded-xl bg-alta-teal flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">First-Time Homebuyer? Start Here</h3>
        <p className="text-[11px] text-alta-gray leading-relaxed">Complete 5-phase roadmap with 27 expandable steps — from credit prep to closing day.</p>
      </div>
      <svg className="w-5 h-5 text-alta-teal shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
