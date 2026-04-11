"use client";

import PageHero from "@/components/PageHero";

const questionSections = [
  {
    title: "Before Choosing a Title Company",
    questions: [
      "Are you a member of the American Land Title Association (ALTA)?",
      "Have you adopted ALTA's Title Insurance and Settlement Company Best Practices?",
      "What wire fraud prevention measures do you have in place?",
      "Do you use wire verification technology (e.g., CertifID)?",
      "Do you carry cybersecurity/errors & omissions insurance?",
      "What is your process for confirming wiring instructions?",
      "Can you provide references from recent closings?",
      "What closing options do you offer (in-person, hybrid, remote/RON)?",
    ],
  },
  {
    title: "About Costs & Fees",
    questions: [
      "What is the total cost of the owner's title insurance policy?",
      "What is the cost of the lender's title insurance policy?",
      "Is there a simultaneous issue discount if I purchase both policies?",
      "What is the settlement/escrow fee?",
      "Are there any additional fees I should expect (document prep, notary, courier)?",
      "Do you offer a refinance rate if I refinance in the future?",
      "How do your fees compare to other providers in the area?",
      "Can you provide an itemized fee estimate in writing?",
    ],
  },
  {
    title: "About the Title Search & Policy",
    questions: [
      "How far back does your title search go?",
      "What does the title search cover (liens, judgments, easements, encumbrances)?",
      "What happens if the title search uncovers a problem?",
      "How long will the title search take?",
      "What are the exceptions listed in Schedule B of my policy?",
      "Can you explain each exception and whether any can be removed?",
      "What is covered under my owner's title insurance policy?",
      "How long does coverage last?",
      "Does the policy cover my heirs?",
    ],
  },
  {
    title: "About the Closing Process",
    questions: [
      "When will I receive my Closing Disclosure?",
      "Will I have at least 3 business days to review it before closing?",
      "Who will be present at my closing?",
      "What documents should I bring to closing?",
      "How should I make my closing payment (wire transfer, cashier's check)?",
      "What is your exact process for providing wiring instructions?",
      "How will you confirm receipt of my funds?",
      "How long after closing will my deed be recorded?",
      "When will I receive my final title insurance policy?",
    ],
  },
  {
    title: "After Closing",
    questions: [
      "How do I file a claim on my title insurance policy?",
      "What is the time limit for filing a claim?",
      "Who should I contact if I discover a problem with my title?",
      "Will you keep a copy of my documents on file?",
      "How can I get a copy of my policy if I lose it?",
    ],
  },
];

export default function QuestionsToAskPage() {
  return (
    <>
    <PageHero
      title="Questions to Ask Your Title Professional"
      subtitle="40+ printable questions across 5 categories. Print this list and bring it with you."
      image="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1920&q=80"
      breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Questions to Ask", href: "/questions-to-ask" }]}
    />
    <div className="py-3 lg:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Come Prepared, Close with Confidence</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Don&apos;t go into your closing blind. Print this list and bring it when meeting with title companies and settlement agents. Get fee estimates in writing from 2-3 companies, and don&apos;t be afraid to ask for clarification on anything.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors mb-10 no-print"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print This List
        </button>

        <div className="space-y-8">
          {questionSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-alta-navy mb-4 pb-2 border-b border-gray-100">{section.title}</h2>
              <div className="space-y-2">
                {section.questions.map((q, i) => (
                  <div key={i} className="flex gap-3 p-3 bg-alta-light rounded-lg">
                    <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-alta-navy">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-100 no-print">
          <h3 className="font-semibold text-alta-navy mb-2">Tips for Your Conversation</h3>
          <ul className="text-sm text-alta-gray space-y-1.5">
            <li>- Get fee estimates in writing from at least 2-3 companies before deciding</li>
            <li>- Ask about their wire fraud prevention process on the first call</li>
            <li>- Request a copy of the title commitment as soon as it&apos;s available</li>
            <li>- Don&apos;t be afraid to ask for clarification on anything you don&apos;t understand</li>
            <li>- You have the legal right to choose your own title company (RESPA)</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
