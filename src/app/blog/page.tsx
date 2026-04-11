import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description: "Educational articles about home closing, title insurance, and protecting your real estate investment.",
};

const articles = [
  {
    title: "Honest Abe Lost His Home — Twice",
    excerpt: "Even Abraham Lincoln wasn't immune to property ownership disputes. Learn about the fascinating history of title claims in early America and why title insurance exists today.",
    date: "February 2024",
    category: "History",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ber?w=600&q=80",
  },
  {
    title: "The FAQs of Title Insurance for Homeowners — Part 2",
    excerpt: "Continuing our deep dive into the most common questions homeowners ask about title insurance — from filing claims to understanding your policy's fine print.",
    date: "October 2023",
    category: "Title Insurance",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
  },
  {
    title: "The FAQs of Title Insurance for Homeowners — Part 1",
    excerpt: "What is title insurance? Do I really need it? How much does it cost? We answer the most frequently asked questions about owner's title insurance.",
    date: "September 2023",
    category: "Title Insurance",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    title: "7 Reasons Why Every Homebuyer Needs Owner's Title Insurance",
    excerpt: "From protecting against unknown liens to defending your ownership in court, here are seven compelling reasons to invest in an owner's title insurance policy.",
    date: "August 2023",
    category: "Title Insurance",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    title: "The Cost of Title Insurance is Worth the Investment",
    excerpt: "At 0.5-1% of the purchase price for a lifetime of coverage, owner's title insurance is one of the best values in real estate. Here's why.",
    date: "July 2023",
    category: "Costs",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
  },
  {
    title: "Wire Fraud: The $275 Million Threat to Homebuyers",
    excerpt: "The FBI reports record losses from real estate wire fraud. Learn how criminals target closings and the 5 steps you can take to protect your funds.",
    date: "March 2026",
    category: "Wire Fraud",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  },
  {
    title: "Remote Closings: What You Need to Know About RON",
    excerpt: "Remote Online Notarization is changing how Americans close on homes. Here's how it works, which states allow it, and whether it's right for you.",
    date: "January 2026",
    category: "Closing Process",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=600&q=80",
  },
  {
    title: "What Your Closing Disclosure Really Means",
    excerpt: "Breaking down every section of the 5-page Closing Disclosure — the most important document you'll review before signing on your new home.",
    date: "December 2025",
    category: "Closing Process",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
  {
    title: "Your Home Inspection: A $400 Investment That Can Save You $40,000",
    excerpt: "86% of home inspections reveal issues. Learn what inspectors check, what they can't see, and why attending your inspection is the smartest thing you can do as a buyer.",
    date: "November 2025",
    category: "Inspections",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
  {
    title: "FHA vs Conventional vs VA: Which Loan Is Right for You?",
    excerpt: "A detailed comparison of the four major loan types — down payment requirements, mortgage insurance, credit scores, and total cost over the life of the loan.",
    date: "October 2025",
    category: "Mortgages",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80",
  },
  {
    title: "Down Payment Assistance: Free Money You Didn't Know Existed",
    excerpt: "Every state has programs to help first-time buyers with down payments and closing costs. Here's how to find and apply for assistance in your area.",
    date: "September 2025",
    category: "First-Time Buyers",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    title: "Understanding Your Property Taxes: State by State",
    excerpt: "Property tax rates vary from 0.27% in Hawaii to 2.33% in New Jersey. Learn how taxes are calculated, what affects your rate, and how to appeal if your assessment is too high.",
    date: "August 2025",
    category: "Costs",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
  },
  {
    title: "The Title Search: What Happens Behind the Scenes",
    excerpt: "One in three title searches reveals an issue that needs resolution. Here's exactly what title professionals look for and how they protect your ownership.",
    date: "July 2025",
    category: "Title Insurance",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
  },
  {
    title: "New Construction: 3 Inspections Every Buyer Should Get",
    excerpt: "Pre-drywall, pre-closing, and 11-month warranty inspections can catch thousands in builder defects before they become your problem.",
    date: "June 2025",
    category: "Inspections",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

const catColors: Record<string, string> = {
  "Title Insurance": "bg-green-100 text-green-700",
  "History": "bg-purple-100 text-purple-700",
  "Costs": "bg-amber-100 text-amber-700",
  "Wire Fraud": "bg-red-100 text-red-700",
  "Inspections": "bg-orange-100 text-orange-700",
  "Mortgages": "bg-indigo-100 text-indigo-700",
  "First-Time Buyers": "bg-teal-100 text-teal-700",
  "Closing Process": "bg-blue-100 text-blue-700",
};

export default function BlogPage() {
  return (
    <>
    <PageHero
      title="News & Advice"
      subtitle="Educational articles about the home closing process, title insurance, and protecting your real estate investment."
      image="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=80"
      breadcrumb={[{ label: "News & Advice", href: "/blog" }]}
    />
    <div className="py-3 lg:py-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page intro */}
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Stay Informed, Close with Confidence</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Expert articles on title insurance, fraud prevention, closing costs, and the homebuying process. All content is sourced from ALTA, the FBI, CFPB, and industry professionals.</p>
            </div>
          </div>
        </div>

        {/* Featured article */}
        <div className="mb-10">
          <article className="group rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${articles[5].image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${catColors[articles[5].category] || 'bg-gray-100 text-gray-700'}`}>{articles[5].category}</span>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3 text-xs text-alta-gray">
                  <span>{articles[5].date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{articles[5].readTime} read</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-alta-navy mb-3 group-hover:text-alta-teal transition-colors">{articles[5].title}</h2>
                <p className="text-sm text-alta-gray leading-relaxed mb-4">{articles[5].excerpt}</p>
                <span className="text-sm font-medium text-alta-teal flex items-center gap-1">
                  Read article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Article grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {articles.filter((_, i) => i !== 5).map((article) => (
            <article key={article.title} className="group rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url('${article.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${catColors[article.category] || 'bg-gray-100 text-gray-700'}`}>{article.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-xs text-alta-gray">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span>{article.readTime} read</span>
                </div>
                <h3 className="font-bold text-alta-navy mb-2 group-hover:text-alta-teal transition-colors">{article.title}</h3>
                <p className="text-xs text-alta-gray leading-relaxed">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>

        <InlineAd />

        {/* Quick links */}
        <div className="p-6 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <h2 className="text-xl font-bold text-alta-navy mb-4">Explore More</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link href="/faq" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm hover:border-alta-teal/20 transition-all">
              <div className="w-9 h-9 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-alta-navy">FAQ</h3>
                <p className="text-[10px] text-alta-gray">Common questions</p>
              </div>
            </Link>
            <Link href="/glossary" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm hover:border-alta-teal/20 transition-all">
              <div className="w-9 h-9 rounded-lg bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-alta-navy">Glossary</h3>
                <p className="text-[10px] text-alta-gray">80+ terms</p>
              </div>
            </Link>
            <Link href="/stop-fraud" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-sm hover:border-alta-teal/20 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-alta-navy">Stop Fraud 101</h3>
                <p className="text-[10px] text-alta-gray">Prevention guide</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
