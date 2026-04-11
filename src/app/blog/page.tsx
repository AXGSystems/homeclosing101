import Link from "next/link";
import PageHero from "@/components/PageHero";
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
    readTime: "4 min read",
  },
  {
    title: "The FAQs of Title Insurance for Homeowners — Part 2",
    excerpt: "Continuing our deep dive into the most common questions homeowners ask about title insurance — from filing claims to understanding your policy's fine print.",
    date: "October 2023",
    category: "Title Insurance",
    readTime: "6 min read",
  },
  {
    title: "The FAQs of Title Insurance for Homeowners — Part 1",
    excerpt: "What is title insurance? Do I really need it? How much does it cost? We answer the most frequently asked questions about owner's title insurance.",
    date: "September 2023",
    category: "Title Insurance",
    readTime: "5 min read",
  },
  {
    title: "7 Reasons Why Every Homebuyer Needs Owner's Title Insurance",
    excerpt: "From protecting against unknown liens to defending your ownership in court, here are seven compelling reasons to invest in an owner's title insurance policy.",
    date: "August 2023",
    category: "Title Insurance",
    readTime: "4 min read",
  },
  {
    title: "The Cost of Title Insurance is Worth the Investment",
    excerpt: "At 0.5-1% of the purchase price for a lifetime of coverage, owner's title insurance is one of the best values in real estate. Here's why the cost is justified.",
    date: "July 2023",
    category: "Costs",
    readTime: "3 min read",
  },
];

const categories = ["All", "Title Insurance", "History", "Costs", "Wire Fraud"];

export default function BlogPage() {
  return (
    <>
    <PageHero title="News & Advice" subtitle="Educational articles about the home closing process, title insurance, and protecting your real estate investment." image="https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1920&q=80" breadcrumb={[{label:"News & Advice",href:"/blog"}]} />
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1.5 text-xs font-medium bg-alta-light text-alta-gray rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article key={article.title} className="feature-card p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-alta-teal bg-alta-light px-2 py-1 rounded">{article.category}</span>
                <span className="text-xs text-alta-gray">{article.date}</span>
                <span className="text-xs text-alta-gray">{article.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-alta-navy mb-2">{article.title}</h2>
              <p className="text-sm text-alta-gray leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>

        {/* Resources */}
        <div className="mt-12 p-6 bg-alta-light rounded-2xl">
          <h2 className="text-xl font-bold text-alta-navy mb-4">Additional Resources</h2>
          <div className="grid gap-3">
            <Link href="/glossary" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
              <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-alta-navy">Real Estate Glossary</h3>
                <p className="text-xs text-alta-gray">Look up any real estate or title insurance term</p>
              </div>
            </Link>
            <Link href="/closing-process/closing-costs" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
              <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-alta-navy">Closing Cost Calculator</h3>
                <p className="text-xs text-alta-gray">Estimate your closing costs based on purchase price</p>
              </div>
            </Link>
            <a href="https://www.alta.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
              <svg className="w-5 h-5 text-alta-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-alta-navy">ALTA.org</h3>
                <p className="text-xs text-alta-gray">Visit the American Land Title Association website</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
