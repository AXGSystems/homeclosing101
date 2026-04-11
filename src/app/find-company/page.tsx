"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SponsorSidebar from "@/components/SponsorSidebar";

const states = [
  {code:"AL",name:"Alabama"},{code:"AK",name:"Alaska"},{code:"AZ",name:"Arizona"},{code:"AR",name:"Arkansas"},
  {code:"CA",name:"California"},{code:"CO",name:"Colorado"},{code:"CT",name:"Connecticut"},{code:"DE",name:"Delaware"},
  {code:"DC",name:"District of Columbia"},{code:"FL",name:"Florida"},{code:"GA",name:"Georgia"},{code:"HI",name:"Hawaii"},
  {code:"ID",name:"Idaho"},{code:"IL",name:"Illinois"},{code:"IN",name:"Indiana"},{code:"IA",name:"Iowa"},
  {code:"KS",name:"Kansas"},{code:"KY",name:"Kentucky"},{code:"LA",name:"Louisiana"},{code:"ME",name:"Maine"},
  {code:"MD",name:"Maryland"},{code:"MA",name:"Massachusetts"},{code:"MI",name:"Michigan"},{code:"MN",name:"Minnesota"},
  {code:"MS",name:"Mississippi"},{code:"MO",name:"Missouri"},{code:"MT",name:"Montana"},{code:"NE",name:"Nebraska"},
  {code:"NV",name:"Nevada"},{code:"NH",name:"New Hampshire"},{code:"NJ",name:"New Jersey"},{code:"NM",name:"New Mexico"},
  {code:"NY",name:"New York"},{code:"NC",name:"North Carolina"},{code:"ND",name:"North Dakota"},{code:"OH",name:"Ohio"},
  {code:"OK",name:"Oklahoma"},{code:"OR",name:"Oregon"},{code:"PA",name:"Pennsylvania"},{code:"RI",name:"Rhode Island"},
  {code:"SC",name:"South Carolina"},{code:"SD",name:"South Dakota"},{code:"TN",name:"Tennessee"},{code:"TX",name:"Texas"},
  {code:"UT",name:"Utah"},{code:"VT",name:"Vermont"},{code:"VA",name:"Virginia"},{code:"WA",name:"Washington"},
  {code:"WV",name:"West Virginia"},{code:"WI",name:"Wisconsin"},{code:"WY",name:"Wyoming"},
];

function FindCompanyContent() {
  const searchParams = useSearchParams();
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-trigger search if state is passed via URL query param (from Find My Policy page)
  useEffect(() => {
    const stateParam = searchParams.get("state");
    if (stateParam && states.find(s => s.code === stateParam)) {
      setSelectedState(stateParam);
      const url = `https://www.homeclosing101.org/companies/?stateCode=${stateParam}`;
      setIframeUrl(url);
      setHasSearched(true);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!selectedState) return;
    let url = `https://www.homeclosing101.org/companies/?stateCode=${selectedState}`;
    if (city.trim()) {
      url += `&city=${encodeURIComponent(city.trim())}`;
    }
    setIframeUrl(url);
    setHasSearched(true);
  };

  return (
    <>
    <PageHero
      title="Find a Title Company"
      subtitle="Search the ALTA member directory to find title insurance and settlement companies near you. You have the right to choose your own title company."
      image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
      breadcrumb={[{ label: "Find a Company", href: "/find-company" }]}
    />
    <div className="py-1.5 lg:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-8">
          {/* Main content */}
          <div>
            <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-100 sticky top-[130px] sm:top-[142px] z-20 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
                <div>
                  <h2 className="font-bold text-alta-navy mb-1">Find a Trusted Title Professional</h2>
                  <p className="text-sm text-alta-gray leading-relaxed">Under federal law (RESPA), you have the right to choose your own title company. Search by state and city below to find ALTA member companies near you. All listed companies are verified members of the American Land Title Association.</p>
                </div>
              </div>
            </div>

            {/* Search controls */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
              <h2 className="text-lg font-bold text-alta-navy mb-4">Search ALTA Member Directory</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* State */}
                <div>
                  <label className="block text-xs font-medium text-alta-navy mb-1">1. Select Your State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-alta-navy bg-white"
                  >
                    <option value="">Choose a state...</option>
                    {states.map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* City (optional) */}
                <div>
                  <label className="block text-xs font-medium text-alta-navy mb-1">2. City (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dallas, Miami..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
                  />
                </div>

                {/* Search button */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={!selectedState}
                    className="w-full px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-alta-gray">
                Results show ALTA member companies with offices in your area, plus additional members serving your market. Data sourced from the ALTA membership directory.
              </p>
            </div>

            {/* Results iframe */}
            {hasSearched && iframeUrl && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-alta-navy">
                    Results for {states.find(s => s.code === selectedState)?.name}{city ? `, ${city}` : ''}
                  </h3>
                  <a
                    href={iframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-alta-teal hover:text-alta-teal-dark font-medium flex items-center gap-1"
                  >
                    Open full page
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <iframe
                  src={iframeUrl}
                  className="w-full border-0"
                  style={{ height: '600px' }}
                  title="ALTA Member Directory Results"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            )}

            {/* Empty state */}
            {!hasSearched && (
              <div className="p-12 bg-alta-light rounded-2xl text-center mb-8">
                <svg className="w-16 h-16 text-alta-gray/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <h3 className="text-lg font-semibold text-alta-navy mb-2">Select a state to search</h3>
                <p className="text-sm text-alta-gray max-w-md mx-auto">
                  Choose your state above to browse ALTA member title companies. Add a city to narrow results to your area.
                </p>
              </div>
            )}

            {/* Tips */}
            <h2 className="text-2xl font-bold text-alta-navy mb-4">Tips for Choosing a Title Company</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                { title: "Check ALTA Membership", desc: "ALTA members adhere to industry best practices and ethical standards." },
                { title: "Ask About Best Practices", desc: "Look for companies that have adopted ALTA's Title Insurance and Settlement Company Best Practices." },
                { title: "Compare Fees", desc: "Title insurance rates are regulated by each state, but service fees can vary. Get quotes from 2-3 companies." },
                { title: "Ask About Wire Fraud Prevention", desc: "A good title company will have wire verification technology and clear fraud prevention processes." },
                { title: "Check Reviews & Ask Around", desc: "Ask your real estate agent for recommendations and check online reviews." },
                { title: "Understand Closing Options", desc: "Ask if they offer in-person, hybrid, or remote online notarization (RON) closings." },
              ].map((tip) => (
                <div key={tip.title} className="flex items-start gap-2 p-3 bg-alta-light rounded-lg">
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-xs font-semibold text-alta-navy">{tip.title}</h3>
                    <p className="text-[11px] text-alta-gray mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-alta-navy mb-2">Your Right to Shop</h3>
              <p className="text-sm text-alta-gray">
                Under federal law (RESPA), you have the right to choose your own title insurance company. While your real estate agent or lender may recommend a provider, you are not obligated to use them.
              </p>
              <Link href="/questions-to-ask" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-alta-teal hover:text-alta-teal-dark">
                See our list of 40+ questions to ask
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right sidebar — sponsor ads */}
          <aside className="hidden lg:block">
            <SponsorSidebar />
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}

export default function FindCompanyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-alta-gray">Loading...</div>}>
      <FindCompanyContent />
    </Suspense>
  );
}
