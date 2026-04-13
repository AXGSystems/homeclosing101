"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SponsorSidebar from "@/components/SponsorSidebar";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";
import { InlineAd } from "@/components/EliteProviders";

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

const tips = [
  {
    title: "Check ALTA Membership",
    desc: "ALTA members adhere to industry best practices and ethical standards.",
    gradient: "from-[#1a5276] to-[#0a7ea8]",
    modalContent: {
      guidance: "The American Land Title Association (ALTA) is the national trade association representing the title insurance and settlement services industry. ALTA members voluntarily agree to uphold professional standards, participate in industry education, and follow ethical guidelines. ALTA membership is not required to operate, so companies that join are demonstrating a commitment to professionalism.",
      questions: [
        "Are you a current member of ALTA?",
        "Have you adopted the ALTA Best Practices Framework?",
        "How long have you been an ALTA member?",
        "Do your employees participate in ALTA continuing education programs?",
        "Are you also a member of your state land title association?"
      ],
      redFlags: [
        "The company has never heard of ALTA or dismisses its importance",
        "They claim membership but cannot provide verification",
        "They are unwilling to share their Best Practices certification status",
        "They discourage you from comparing them to other providers"
      ]
    }
  },
  {
    title: "Ask About Best Practices",
    desc: "Look for companies that have adopted ALTA's Title Insurance and Settlement Company Best Practices.",
    gradient: "from-[#2d6b3f] to-[#1a5276]",
    modalContent: {
      guidance: "ALTA's Best Practices Framework consists of seven pillars designed to protect consumers: licensing and compliance, escrow trust account management, privacy and information security, settlement procedures, title policy production, insurance coverage, and consumer complaints. Companies that have adopted and been assessed against these standards have undergone rigorous review of their operations.",
      questions: [
        "Have you completed an independent third-party assessment of your Best Practices compliance?",
        "Which of the seven ALTA Best Practices pillars have you been assessed on?",
        "How do you protect escrow funds and trust accounts?",
        "What cybersecurity measures do you have in place to protect consumer data?",
        "Can you provide your most recent Best Practices assessment results?"
      ],
      redFlags: [
        "They claim to follow best practices but have never been formally assessed",
        "They cannot explain what the seven pillars cover",
        "They have no documented escrow account reconciliation procedures",
        "They lack a written information security program or privacy policy"
      ]
    }
  },
  {
    title: "Compare Fees",
    desc: "Title insurance rates are regulated by each state, but service fees can vary. Get quotes from 2-3 companies.",
    gradient: "from-[#8b6914] to-[#943030]",
    modalContent: {
      guidance: "Title insurance premiums are regulated differently in each state — some states set the rates (filed rates), while others allow competitive pricing. However, settlement service fees (closing fees, document preparation, wire fees, courier fees, notary fees) can vary significantly between companies. Always request an itemized fee estimate, not just a total. The Loan Estimate form you receive from your lender will show title-related fees in Section C.",
      questions: [
        "Can you provide a written, itemized estimate of all fees?",
        "Which fees are for the title insurance premium vs. your service fees?",
        "Are there any additional fees not listed on the estimate?",
        "Do you offer a simultaneous issue discount if I'm purchasing both an owner's and lender's policy?",
        "What is your wire transfer fee and document preparation fee?"
      ],
      redFlags: [
        "They refuse to provide a written estimate before you commit",
        "The estimate is a single lump sum with no itemization",
        "Fees are significantly higher than other providers without clear justification",
        "They add surprise fees at closing that were not on the original estimate",
        "They pressure you to commit without allowing time to compare"
      ]
    }
  },
  {
    title: "Ask About Wire Fraud Prevention",
    desc: "A good title company will have wire verification technology and clear fraud prevention processes.",
    gradient: "from-[#943030] to-[#5b3a8c]",
    modalContent: {
      guidance: "Wire fraud is one of the biggest threats in real estate transactions. Criminals intercept emails between buyers and settlement agents, then send fraudulent wire instructions. According to the FBI's Internet Crime Complaint Center (IC3), real estate wire fraud losses exceeded $446 million in 2023. A reputable title company will have multiple layers of protection and will never send wire instructions by email alone.",
      questions: [
        "How do you transmit wire instructions to buyers?",
        "Do you use a secure wire verification platform (such as CertifID or similar)?",
        "What is your callback verification process for confirming wire details?",
        "Do you have cyber insurance that covers wire fraud losses?",
        "What should I do if I receive wire instructions by email that appear to be from you?",
        "How do you train your staff to recognize phishing and social engineering attacks?"
      ],
      redFlags: [
        "They send wire instructions via unencrypted email with no additional verification",
        "They have no formal callback verification procedure",
        "They do not use any wire verification technology",
        "They dismiss wire fraud concerns as overblown",
        "They cannot explain their incident response plan if fraud occurs",
        "They have no cyber liability insurance"
      ]
    }
  },
  {
    title: "Check Reviews & Ask Around",
    desc: "Ask your real estate agent for recommendations and check online reviews.",
    gradient: "from-[#5b3a8c] to-[#1a5276]",
    modalContent: {
      guidance: "While online reviews can be helpful, the most reliable recommendations come from professionals who work with title companies regularly — your real estate agent, mortgage lender, and real estate attorney (if applicable in your state). They see how companies perform under pressure, handle problems, and meet deadlines. Look for patterns in reviews rather than focusing on a single positive or negative experience.",
      questions: [
        "Can you share references from recent clients?",
        "How long have you been in business in this area?",
        "What is your average closing timeline?",
        "How do you handle title defects or issues discovered during the search?",
        "What happens if there's a problem at the closing table?"
      ],
      redFlags: [
        "Consistently negative reviews mentioning communication problems or delays",
        "Multiple complaints about surprise fees or costs added at closing",
        "No online presence or reviews at all (may indicate a very new operation)",
        "They discourage you from checking references or reading reviews",
        "Complaints to the state insurance department or Better Business Bureau"
      ]
    }
  },
  {
    title: "Understand Closing Options",
    desc: "Ask if they offer in-person, hybrid, or remote online notarization (RON) closings.",
    gradient: "from-[#0a7ea8] to-[#2d6b3f]",
    modalContent: {
      guidance: "Closing options have expanded significantly. Traditional in-person closings require all parties at the same table. Hybrid closings allow some documents to be signed electronically before the closing appointment, reducing time at the table. Remote Online Notarization (RON) allows the entire closing to happen via secure video conference with a remote notary. Not all states permit RON, and not all title companies offer it. Ask about your options early in the process.",
      questions: [
        "Do you offer Remote Online Notarization (RON) closings?",
        "Is RON legally permitted in my state for real estate transactions?",
        "Do you offer hybrid closings where some documents are pre-signed electronically?",
        "What technology platform do you use for electronic closings?",
        "If I choose an in-person closing, where will it take place?",
        "How long does a typical closing appointment take with your company?"
      ],
      redFlags: [
        "They only offer one closing method with no flexibility",
        "They charge significantly more for electronic or remote closings",
        "They use unvetted or insecure technology for electronic signatures",
        "They cannot clearly explain the difference between e-signing, hybrid, and RON",
        "They claim to offer RON in a state where it is not yet authorized for real estate"
      ]
    }
  },
];

function FindCompanyContent() {
  const searchParams = useSearchParams();
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeModal, setActiveModal] = useState<{title: string; gradient: string; content: React.ReactNode} | null>(null);

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
            <div className="mb-6 p-4 bg-white rounded-2xl border border-[#c5d8e4] sm:sticky sm:top-[142px] z-20 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1a5276]/10 flex items-center justify-center text-[#1a5276] shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
                <div>
                  <h2 className="font-bold text-alta-navy mb-1">Find a Trusted Title Professional</h2>
                  <p className="text-sm text-alta-gray leading-relaxed">Under federal law (RESPA), you have the right to choose your own title company. Search by state and city below to find ALTA member companies near you. All listed companies are verified members of the American Land Title Association.</p>
                </div>
              </div>
            </div>

            {/* Search controls */}
            <div className="bg-[#e8f0f5] rounded-2xl border border-[#c5d8e4] shadow-sm p-5 mb-6">
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
              <div className="bg-white rounded-2xl border border-[#c5d8e4] shadow-sm overflow-hidden mb-8">
                <div className="px-5 py-3 border-b border-[#c5d8e4] flex items-center justify-between">
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
            <h2 className="text-2xl font-bold text-alta-navy mb-2">Tips for Choosing a Title Company</h2>
            <p className="text-sm text-alta-gray mb-4 leading-relaxed"><span className="text-alta-teal font-medium">Click any tip for deeper guidance, questions to ask, and red flags to watch for.</span></p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {tips.map((tip) => (
                <div
                  key={tip.title}
                  onClick={() => setActiveModal({
                    title: tip.title,
                    gradient: tip.gradient,
                    content: (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-sm font-bold text-[#1a5276] mb-2">Detailed Guidance</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{tip.modalContent.guidance}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#2d6b3f] mb-2">Questions to Ask</h3>
                          <ul className="space-y-2">
                            {tip.modalContent.questions.map((q, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4 text-[#0a7ea8] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {q}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                          <h3 className="text-sm font-bold text-[#943030] mb-2">Red Flags</h3>
                          <ul className="space-y-2">
                            {tip.modalContent.redFlags.map((rf, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4 text-[#943030] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                                {rf}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                  className={`flex items-start gap-2 p-3 rounded-lg cursor-pointer group relative tile-interactive border-l-4 ${
                    tip.gradient.includes('1a5276') && !tip.gradient.includes('2d6b3f') && !tip.gradient.includes('5b3a8c') && !tip.gradient.includes('0a7ea8') ? 'bg-[#e8f0f5] border-l-[#1a5276]' :
                    tip.gradient.includes('2d6b3f') ? 'bg-[#e9f5ed] border-l-[#2d6b3f]' :
                    tip.gradient.includes('8b6914') ? 'bg-[#faf4e4] border-l-[#8b6914]' :
                    tip.gradient.includes('943030') && !tip.gradient.includes('5b3a8c') ? 'bg-[#f5e8e8] border-l-[#943030]' :
                    tip.gradient.includes('5b3a8c') ? 'bg-[#f0ecf6] border-l-[#5b3a8c]' :
                    tip.gradient.includes('0a7ea8') ? 'bg-[#e6f1f5] border-l-[#0a7ea8]' :
                    'bg-alta-light border-l-[#0a7ea8]'
                  }`}
                >
                  <svg className="w-4 h-4 text-alta-teal shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-alta-navy">{tip.title}</h3>
                    <p className="text-[11px] text-alta-gray mt-0.5">{tip.desc}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <svg className="w-3 h-3 text-[#1a5276]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </div>
                </div>
              ))}
            </div>

            <InlineAd />

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

            <FirstTimeBuyerCTA />
          </div>

          {/* Right sidebar — sponsor ads */}
          <aside className="hidden lg:block">
            <SponsorSidebar />
          </aside>
        </div>
      </div>
    </div>

    {/* Modal */}
    {activeModal && (
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActiveModal(null)} className="absolute top-3 right-3 p-2 text-white hover:text-white bg-black/40 hover:bg-black/60 rounded-full z-10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className={`bg-gradient-to-r ${activeModal.gradient} px-6 py-5`}>
            <h2 className="text-xl font-bold text-white pr-10">{activeModal.title}</h2>
          </div>
          <div className="p-6">{activeModal.content}</div>
        </div>
      </div>
    )}
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
