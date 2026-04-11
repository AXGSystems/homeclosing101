"use client";

import { useState, useMemo } from "react";
import PageHero from "@/components/PageHero";

const glossaryData: Record<string, { term: string; definition: string; example?: string }[]> = {
  A: [
    { term: "Abstract", definition: "A summary of all recorded deeds, mortgages, and leases affecting the title to a piece of land.", example: "Before closing, your title company reviews the abstract to verify no outstanding claims exist against the property." },
    { term: "Abstracting", definition: "The process of making and compiling an abstract of title.", example: "The abstracting process may reveal a 20-year-old lien that the seller didn't know existed." },
    { term: "Adverse Possession", definition: "Unauthorized occupation of another's land which, if continued for a fixed period of time, may grant the occupier legal title.", example: "A neighbor who maintained a strip of your property for 15+ years could claim adverse possession — title insurance protects against this." },
    { term: "ALTA", definition: "American Land Title Association — the national trade organization for the title insurance industry.", example: "Look for ALTA member companies when choosing a title provider — they follow industry best practices." },
    { term: "Amortization", definition: "Paying off an existing debt through regular partial payments of principal and interest.", example: "A 30-year mortgage amortizes your loan so each monthly payment covers both principal and interest." },
    { term: "APR", definition: "Annual Percentage Rate — the yearly interest rate expressed as the actual rate paid by the borrower.", example: "Your Loan Estimate will show the APR, which includes fees and gives you a true cost comparison between lenders." },
    { term: "Appraisal", definition: "An estimate of property value based on professional analysis of relevant facts.", example: "Your lender orders an appraisal to confirm the home is worth the purchase price before approving your mortgage." },
  ],
  B: [
    { term: "Basic Rate", definition: "The standard rate charged to title insurance consumers who do not qualify for reduced rates." },
    { term: "Broker", definition: "An agent who negotiates sales or purchases of property for a fee or commission." },
  ],
  C: [
    { term: "Certificate of Title", definition: "A written attorney opinion stating who holds title to a property, based on examination of an abstract." },
    { term: "Chain of Title", definition: "The composite of all recorded deeds and documents conveying title from one owner to the next through the property's history." },
    { term: "Closing", definition: "Also called 'settlement' — the final step in a real estate transaction where documents are signed, funds disbursed, and ownership transferred." },
    { term: "Closing Disclosure", definition: "A five-page document provided three business days before closing that details all mortgage terms, costs, and fees." },
    { term: "Cloud on Title", definition: "Any irregularity, possible claim, or encumbrance that could potentially affect the title to a property." },
    { term: "Contract", definition: "A formal agreement between two or more parties that is enforceable by law." },
    { term: "Covenant", definition: "A formal agreement containing promises and assurances between parties regarding property use or restrictions." },
  ],
  D: [
    { term: "Deed", definition: "A written document that conveys title to real estate from one party to another." },
    { term: "Default", definition: "Failure to perform a promised task or pay an obligation when due." },
    { term: "Defect", definition: "A blemish or imperfection in title — a defective title is irregular and may not be legally valid." },
  ],
  E: [
    { term: "Earnest Money", definition: "A deposit or portion of the purchase price given to show good faith in a real estate transaction." },
    { term: "Easement", definition: "The right to use or make limited use of another person's real property (e.g., a shared driveway)." },
    { term: "Eminent Domain", definition: "The government's right to take private property for public purposes with fair compensation." },
    { term: "Encroachment", definition: "A structure or improvement that extends across the boundary line onto an adjoining property." },
    { term: "Encumbrance", definition: "A claim, right, or lien on a property held by someone other than the owner." },
    { term: "Escrow", definition: "The deposit of money or documents with an impartial third party pending the completion of a transaction." },
  ],
  F: [
    { term: "Fee Simple", definition: "The highest degree of property ownership — unqualified ownership with full power to sell, mortgage, or use as desired." },
    { term: "First Mortgage", definition: "A mortgage that has priority over all other mortgages or liens on the property." },
    { term: "Foreclosure", definition: "A legal proceeding to enforce a mortgage or lien, cutting off the borrower's rights to the property." },
  ],
  G: [
    { term: "General Warranty", definition: "A warranty provision in a deed that includes all common-law warranty protections — the strongest form of deed warranty." },
  ],
  H: [
    { term: "Hazard Insurance", definition: "Insurance protecting real estate against damage from fire, natural causes, and vandalism." },
  ],
  I: [
    { term: "Ingress", definition: "The right or permission to enter a property — the means or place of entry such as a right-of-way." },
  ],
  J: [
    { term: "Joint Tenants", definition: "Two or more persons who hold title jointly with equal rights. Upon death, a tenant's share passes to the survivors." },
    { term: "Judgment", definition: "A court determination, usually awarding a money payment or other relief to a party." },
  ],
  L: [
    { term: "Lease", definition: "An agreement granting use and occupancy of land during a specified period in exchange for rent." },
    { term: "Lien", definition: "A legal claim against real estate used as security for the payment of a debt." },
    { term: "Lis Pendens", definition: "A legal notice filed in public records indicating a pending lawsuit that may affect title to the property." },
    { term: "Loan Estimate", definition: "A three-page document provided within three business days of a mortgage application that details estimated costs and features." },
    { term: "Loan Policy", definition: "A title insurance policy issued to a mortgage lender, protecting against title defects and liens." },
  ],
  M: [
    { term: "Marketable Title", definition: "A title free of material defects and liens — one that a court would require a buyer to accept." },
    { term: "Market Value", definition: "The price at which a willing buyer and willing seller would agree on a property's worth in an open market." },
    { term: "Mechanic's Lien", definition: "A lien created by law to secure payment for labor, services, or materials used in construction or improvement of property." },
    { term: "Metes and Bounds", definition: "A method of describing property boundaries using courses, directions, distances, and physical landmarks." },
  ],
  O: [
    { term: "Owner's Policy", definition: "A title insurance policy protecting the homeowner's investment for the life of ownership and their heirs' interest. Purchased for a one-time fee at closing." },
  ],
  P: [
    { term: "Power of Attorney", definition: "A legal document authorizing one person to act as another's agent or attorney in legal and financial matters." },
    { term: "Preliminary Title Report", definition: "A report showing current ownership, liens, and encumbrances before a title policy is issued." },
    { term: "Premium", definition: "The amount payable for an insurance policy." },
    { term: "Promissory Note", definition: "A written promise to pay a specified sum at a stated time to a named person or bearer." },
    { term: "Public Records", definition: "Official records maintained by a county recorder's office containing transcriptions of all recorded instruments." },
  ],
  Q: [
    { term: "Quiet Title Suit", definition: "A lawsuit to cancel or remove any claims or clouds on a property's title." },
    { term: "Quit Claim Deed", definition: "A deed that surrenders any possible interest or rights a grantor may have — without guaranteeing clear title." },
  ],
  R: [
    { term: "Recording", definition: "Filing a document in the public records to provide notice to the world of a transaction or claim." },
    { term: "Refinance Rate", definition: "A reduced title insurance rate available for a loan policy issued during a mortgage refinance." },
    { term: "Right of Way", definition: "The right to pass over another person's property, or the strip of land used for roads, utilities, or access." },
  ],
  S: [
    { term: "Search", definition: "A careful inspection of public records to find all recorded instruments that affect a property's title." },
    { term: "Settlement", definition: "Also called 'closing' — the final step in completing a real estate transaction." },
    { term: "Special Warranty Deed", definition: "A deed that warrants title only against claims arising from the seller's period of ownership." },
    { term: "Survey", definition: "The process of determining a property's exact boundaries, area, and elevations, typically shown on a map." },
  ],
  T: [
    { term: "Tax Lien", definition: "A lien imposed by law to secure payment of real estate taxes." },
    { term: "Tenants in Common", definition: "Two or more persons who share title to a property with separate ownership interests — no right of survivorship." },
    { term: "Title", definition: "The combination of legal elements that constitute the highest right of ownership in real property." },
    { term: "Title Commitment", definition: "A document offering to issue a title insurance policy, describing conditions, exclusions, and exceptions." },
    { term: "Title Defect", definition: "Any outstanding claim, right, or document irregularity that could impair the owner's title." },
    { term: "Title Insurance", definition: "Insurance protecting property purchasers and mortgagees against loss from defective titles, liens, and encumbrances." },
    { term: "Title Search", definition: "A thorough review of public records to determine the status and history of a property's title." },
  ],
  U: [
    { term: "Underwriter", definition: "The insurance company that issues title insurance policies to the public or to other insurers." },
  ],
  V: [
    { term: "Vesting", definition: "How ownership title is taken — methods include sole ownership, joint tenancy, tenants in common, and others." },
  ],
  W: [
    { term: "Waiver", definition: "The voluntary, intentional relinquishment of a known right, claim, or privilege." },
    { term: "Warranty Deed", definition: "A deed containing one or more title covenants guaranteeing clear title — the strongest form of deed." },
  ],
};

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!search && !activeLetter) return glossaryData;

    const result: typeof glossaryData = {};
    for (const [letter, terms] of Object.entries(glossaryData)) {
      if (activeLetter && letter !== activeLetter) continue;
      const filtered = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(search.toLowerCase()) ||
          t.definition.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) result[letter] = filtered;
    }
    return result;
  }, [search, activeLetter]);

  const totalTerms = Object.values(filteredData).reduce((acc, arr) => acc + arr.length, 0);

  const [selectedTerm, setSelectedTerm] = useState<{ term: string; definition: string; example?: string } | null>(null);

  return (
    <>
    <PageHero
      title="Real Estate Glossary"
      subtitle={`${totalTerms} searchable terms — from abstract to warranty deed. Click any term for details and closing examples.`}
      image="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/faq" }, { label: "Glossary", href: "/glossary" }]}
    />

    {/* Term detail modal */}
    {selectedTerm && (
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setSelectedTerm(null)}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setSelectedTerm(null)} className="absolute top-4 right-4 p-1 text-alta-gray hover:text-alta-navy">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-alta-teal to-alta-teal-dark flex items-center justify-center text-white font-bold text-lg mb-4">
            {selectedTerm.term.charAt(0)}
          </div>
          <h3 className="text-2xl font-bold text-alta-navy mb-3">{selectedTerm.term}</h3>
          <div className="mb-4">
            <p className="text-sm font-semibold text-alta-teal uppercase tracking-wider mb-1">Definition</p>
            <p className="text-alta-gray leading-relaxed">{selectedTerm.definition}</p>
          </div>
          {selectedTerm.example && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-alta-teal uppercase tracking-wider mb-1">How This Applies at Closing</p>
              <p className="text-sm text-alta-gray leading-relaxed">{selectedTerm.example}</p>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Page intro */}
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">How to Use This Glossary</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Search by keyword, browse by letter, or click any term to see its full definition and a real-world example of how it applies during the closing process. Use these terms to prepare for conversations with your title company and settlement agent.</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm pb-4 mb-6">
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-alta-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-alta-navy"
            />
          </div>

          {/* Letter nav */}
          <div className="flex flex-wrap gap-1 letter-nav">
            <button
              onClick={() => { setActiveLetter(null); setSearch(""); }}
              className={`w-8 h-8 text-xs font-semibold rounded transition-colors ${
                !activeLetter ? "bg-alta-teal text-white" : "bg-alta-light text-alta-gray hover:text-alta-teal"
              }`}
            >
              All
            </button>
            {allLetters.map((l) => {
              const hasTerms = glossaryData[l] && glossaryData[l].length > 0;
              return (
                <button
                  key={l}
                  onClick={() => { setActiveLetter(l === activeLetter ? null : l); setSearch(""); }}
                  disabled={!hasTerms}
                  className={`w-8 h-8 text-xs font-semibold rounded transition-colors ${
                    l === activeLetter
                      ? "bg-alta-teal text-white"
                      : hasTerms
                      ? "bg-alta-light text-alta-gray hover:text-alta-teal"
                      : "bg-gray-50 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-10">
          {Object.entries(filteredData)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([letter, terms]) => (
              <div key={letter} id={`letter-${letter}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-alta-teal to-alta-teal-dark flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {letter}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-alta-teal/30 to-transparent" />
                  <span className="text-xs text-alta-gray">{terms.length} term{terms.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {terms.map((t) => (
                    <button
                      key={t.term}
                      onClick={() => setSelectedTerm(t)}
                      className="text-left p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-alta-teal/40 hover:-translate-y-0.5 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-alta-teal/10 to-alta-teal/5 flex items-center justify-center text-alta-teal font-bold text-xs shrink-0 group-hover:from-alta-teal group-hover:to-alta-teal-dark group-hover:text-white transition-all">
                          {t.term.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-alta-navy text-sm group-hover:text-alta-teal transition-colors">{t.term}</h3>
                          <p className="text-xs text-alta-gray mt-1 leading-relaxed line-clamp-2">{t.definition}</p>
                          {t.example && (
                            <span className="inline-flex items-center gap-0.5 mt-2 text-[10px] text-alta-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              View example
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {totalTerms === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <p className="text-alta-gray font-medium">No terms match your search.</p>
            <p className="text-sm text-alta-gray mt-1">Try a different keyword or browse by letter.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
