import Link from "next/link";
import PageHero from "@/components/PageHero";
import { InlineAd } from "@/components/EliteProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What to Expect at Closing",
  description: "A complete guide to the home closing process — every step from pre-approval to getting your keys.",
};

const steps = [
  {
    title: "Learn About Loan Options & Get Pre-Approved",
    content: "Understanding the types of mortgages available helps you determine what you can afford before you start house hunting. Different loans affect your upfront costs, monthly payments, total interest paid, and level of financial risk. Getting pre-approved gives you a clear budget and shows sellers you're a serious buyer.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80",
  },
  {
    title: "Find a Property",
    content: "Work with a real estate agent and use online resources to find homes that match your needs and budget. Your agent can help you understand neighborhoods, market conditions, and property values in your target area.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80",
  },
  {
    title: "Make an Offer",
    content: "Once you find the right home, submit a purchase proposal that includes your offered price and terms. The seller may accept, reject, or counter your offer. Your agent will help you negotiate to reach an agreement that works for both parties.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80",
  },
  {
    title: "Sign the Purchase Agreement",
    content: "The purchase agreement contains all the details of your transaction — price, contingencies, timeline, and responsibilities. While not required, having an attorney review this document is recommended, especially for complex transactions.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  },
  {
    title: "Get Funding",
    content: "After selecting your mortgage type, you'll formally express your intent to proceed. Your lender will then charge fees and begin processing your loan. This includes ordering an appraisal, verifying your finances, and underwriting the loan.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80",
  },
  {
    title: "Get Insurance",
    content: "Lenders typically require one year of homeowner's insurance prepaid at closing. Many set up escrow accounts for ongoing tax and insurance payments. For a one-time fee, an owner's title insurance policy provides coverage for as long as you own your home — protecting you from hidden defects in title.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
  },
  {
    title: "Close the Transaction",
    content: "Your closing agent — which may be a title agent, settlement agent, or attorney depending on your location — gathers all required documents, closes the loan, and manages the transfer of funds. You'll sign your final documents, pay your closing costs, and receive the keys to your new home.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
  },
];

const documents = [
  {
    title: "Closing Disclosure",
    description: "Contains all the terms of your transaction and itemized costs. Must be provided at least 3 business days before your closing date so you can review it carefully.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>),
  },
  {
    title: "Promissory Note",
    description: "Your written promise to repay the mortgage loan. Includes the amount borrowed, interest rate, payment schedule, and consequences of default.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  },
  {
    title: "Deed of Trust / Security Instrument",
    description: "Transfers conditional ownership of the property to secure your loan. If you fail to make payments, the lender has the right to foreclose.",
    icon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>),
  },
];

export default function WhatToExpectPage() {
  return (
    <>
      <PageHero
        title="What to Expect"
        subtitle="Closing is the final phase of your home purchase — where you legally commit to your mortgage loan and become the official property owner. Here's what the journey looks like."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        breadcrumb={[
          { label: "The Closing Process", href: "/closing-process" },
          { label: "What to Expect", href: "/closing-process/what-to-expect" },
        ]}
      />

      <div className="py-3 lg:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Page intro */}
          <div className="mb-10 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
              </div>
              <div>
                <h2 className="font-bold text-alta-navy mb-1">Your Step-by-Step Closing Guide</h2>
                <p className="text-sm text-alta-gray leading-relaxed">Follow these 7 steps from getting pre-approved to receiving your keys. Each step includes what to expect and what to look out for. Bookmark this page and come back as you move through the process.</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-bold text-alta-navy mb-8">7 Steps to Getting the Keys</h2>
          <div className="space-y-6 mb-16">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-5 items-center`}>
                {/* Image */}
                <div className="w-full md:w-2/5 shrink-0">
                  <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${step.image}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-alta-teal text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-alta-navy text-lg mb-2">{step.title}</h3>
                  <p className="text-alta-gray leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>

          <InlineAd />

          {/* Key Documents */}
          <h2 className="text-2xl font-bold text-alta-navy mb-6">Key Closing Documents</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {documents.map((doc) => (
              <div key={doc.title} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-alta-light flex items-center justify-center text-alta-teal mb-4">
                  {doc.icon}
                </div>
                <h3 className="font-semibold text-alta-navy mb-2">{doc.title}</h3>
                <p className="text-sm text-alta-gray leading-relaxed">{doc.description}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/closing-process/closing-options" className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors text-center">
              Explore Closing Options
            </Link>
            <Link href="/closing-process/closing-checklist" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center">
              Get Your Checklist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
