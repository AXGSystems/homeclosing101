"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";
import { InlineAd } from "@/components/EliteProviders";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ------------------------------------------------------------------ */
/*  Data: comparison checklist rows                                    */
/* ------------------------------------------------------------------ */

type Tolerance = "zero" | "ten" | "none";

interface ComparisonField {
  field: string;
  expectation: string;
  tolerance: Tolerance;
  detail: string;
}

const comparisonFields: ComparisonField[] = [
  {
    field: "Interest Rate",
    expectation: "Must match your rate lock confirmation",
    tolerance: "zero",
    detail:
      "If you locked your rate, the CD must show the identical rate. If you did NOT lock, the rate can change — but your lender should have told you that up front. If the rate increased and you believe you locked, request your rate lock confirmation in writing before signing.",
  },
  {
    field: "Loan Amount",
    expectation: "Must match the LE exactly",
    tolerance: "zero",
    detail:
      "Your loan amount should not change unless there was a legitimate changed circumstance — such as a lower-than-expected appraisal that required a smaller loan, or a contract amendment that changed the purchase price.",
  },
  {
    field: "Monthly Principal & Interest",
    expectation: "Must match (derived from rate + loan amount)",
    tolerance: "zero",
    detail:
      "This is a mathematical result of the loan amount, interest rate, and loan term. If the rate and loan amount match, P&I should match too. If it doesn't, something is wrong with the calculation — ask your lender to explain.",
  },
  {
    field: "Origination Charges (Section A)",
    expectation: "Cannot increase from LE amount",
    tolerance: "zero",
    detail:
      "Origination charges include the lender's own fees (processing, underwriting) and any discount points. Under TRID rules, these fees cannot increase at all from the Loan Estimate to the Closing Disclosure. If they went up even by $1, your lender has violated the tolerance rules.",
  },
  {
    field: "Services You Cannot Shop For (Section B)",
    expectation: "Cannot increase from LE amount",
    tolerance: "zero",
    detail:
      "These are services the lender requires from specific providers — appraisal, credit report, flood determination. Because you have no choice of provider, the lender bears the risk of quoting them accurately. The total cannot increase from the LE.",
  },
  {
    field: "Services You DID Shop For (Section C)",
    expectation: "Cumulative total can increase up to 10%",
    tolerance: "ten",
    detail:
      "If you chose a provider from the lender's written list, individual fees may shift, but the cumulative total of all Section C services cannot increase by more than 10% from the LE. If you chose a provider NOT on the lender's list, there is no tolerance limit for that provider's fees.",
  },
  {
    field: "Transfer Taxes (Section E)",
    expectation: "Cannot increase from LE amount",
    tolerance: "zero",
    detail:
      "Government transfer taxes are set by law and should be predictable. Lenders are expected to quote them accurately. The amount on the CD cannot exceed what was on the LE.",
  },
  {
    field: "Prepaid Items (Section F)",
    expectation: "May differ — these reflect actual amounts",
    tolerance: "none",
    detail:
      "Prepaids include homeowner's insurance premium, prepaid daily interest (based on your actual closing date), and property taxes. Because these depend on your exact closing date and actual insurance premium, they have no tolerance limit. However, you should still verify the math: prepaid interest = (loan amount x rate / 365) x days remaining in the closing month.",
  },
  {
    field: "Initial Escrow Deposit (Section G)",
    expectation: "May differ — depends on closing date",
    tolerance: "none",
    detail:
      "The initial escrow deposit funds your escrow account for property taxes and insurance. The exact amount depends on your closing date and when tax and insurance payments are due. RESPA limits the cushion to 2 months beyond what's needed, so if the amount seems high, ask for an itemized breakdown.",
  },
  {
    field: "Cash to Close",
    expectation: "Compare carefully — many factors affect this",
    tolerance: "none",
    detail:
      "Cash to Close is the bottom-line number. Changes in prepaids, escrow, or seller credits can all cause it to shift. The CD includes a Cash to Close comparison table that shows exactly which line items changed and by how much. Review every line of that table.",
  },
];

const toleranceLabel: Record<Tolerance, string> = {
  zero: "Zero Tolerance",
  ten: "10% Tolerance",
  none: "No Limit",
};

const toleranceColor: Record<Tolerance, string> = {
  zero: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  ten: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  none: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

/* ------------------------------------------------------------------ */
/*  Data: red flags                                                    */
/* ------------------------------------------------------------------ */

const redFlags = [
  {
    flag: "Any fee increased with no explanation",
    why: "TRID tolerance rules exist specifically to prevent surprise fee increases. If a zero-tolerance fee went up at all, the lender must cure (refund) the difference. If a 10%-tolerance fee category exceeded the 10% threshold, the lender must also cure the excess.",
  },
  {
    flag: "New fees that were not on the Loan Estimate",
    why: "Fees that appear on the CD but were not disclosed on the LE are treated as increases from zero — and they're subject to the same tolerance rules. A brand-new fee in a zero-tolerance category is an automatic violation.",
  },
  {
    flag: "Interest rate changed without a valid rate lock expiration",
    why: "If you locked your rate and the lock has not expired, the rate on the CD must match your lock. If the lender claims the lock expired, request the rate lock confirmation showing the expiration date. Rate lock extensions are common and should have been discussed with you.",
  },
  {
    flag: "Loan term changed (e.g., 30 years became 25 years)",
    why: "A change in loan term affects your monthly payment, total interest paid, and amortization schedule. This should never change without your explicit written agreement.",
  },
  {
    flag: "Different lender credits than originally quoted",
    why: "If the lender promised credits to offset closing costs — especially in a 'no closing cost' mortgage — the exact credit amount should appear on the CD. A reduced credit means you pay more out of pocket than agreed.",
  },
  {
    flag: "Prepayment penalty appeared (or changed)",
    why: "If the LE showed no prepayment penalty and the CD suddenly includes one, this is a significant change that triggers a new 3-day review period. Do not sign until this is resolved.",
  },
];

/* ------------------------------------------------------------------ */
/*  Data: what to do steps                                             */
/* ------------------------------------------------------------------ */

const whatToDoSteps = [
  {
    step: "Contact your loan officer immediately",
    detail:
      "Call and email your loan officer (put it in writing). Identify each specific line item that differs from your Loan Estimate. Ask them to explain every change.",
  },
  {
    step: "Request a written explanation of every change",
    detail:
      "Under TRID, lenders must document the reason for any changed circumstance that caused fee increases. Verbal explanations are not enough — get it in writing so you have a record.",
  },
  {
    step: "Know your right to delay closing",
    detail:
      "You are never required to close on the originally scheduled date if there are unresolved discrepancies. If the lender issues a corrected Closing Disclosure, certain changes (like an APR increase over 1/8%) trigger a new 3-business-day waiting period automatically.",
  },
  {
    step: "Request a tolerance cure if fees exceeded limits",
    detail:
      "If zero-tolerance fees increased at all, or if 10%-tolerance fees exceeded the 10% cumulative threshold, the lender must refund the excess to you at closing or within 30 calendar days after closing. This refund is called a 'tolerance cure.'",
  },
  {
    step: "File a CFPB complaint if the issue is unresolved",
    detail:
      "If your lender won't explain or correct the discrepancies, file a complaint at consumerfinance.gov/complaint. The CFPB enforces TRID rules and investigates lender violations. You can also contact your state attorney general's office.",
  },
];

/* ------------------------------------------------------------------ */
/*  Tolerance rules table data                                         */
/* ------------------------------------------------------------------ */

const toleranceRules = [
  {
    category: "Zero Tolerance — Cannot Increase",
    color: "border-red-500",
    headerBg: "bg-red-50 dark:bg-red-900/20",
    items: [
      "Origination charges (lender fees, discount points)",
      "Services you cannot shop for (appraisal, credit report)",
      "Transfer taxes",
      "Fees paid to an affiliate of the lender",
      "Fees where the lender did not allow you to shop",
    ],
  },
  {
    category: "10% Cumulative Tolerance — Total Cannot Increase More Than 10%",
    color: "border-amber-500",
    headerBg: "bg-amber-50 dark:bg-amber-900/20",
    items: [
      "Services you CAN shop for (if you chose from the lender's list)",
      "Recording fees",
    ],
  },
  {
    category: "No Tolerance Limit — Can Change Freely",
    color: "border-emerald-500",
    headerBg: "bg-emerald-50 dark:bg-emerald-900/20",
    items: [
      "Prepaid interest, property taxes, homeowner's insurance premiums",
      "Initial escrow deposit",
      "Services you shopped for using a provider NOT on the lender's list",
      "Owner's title insurance (if you shopped independently)",
    ],
  },
];

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function LEVsCDPage() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const totalFields = comparisonFields.length;
  const progressPct = Math.round((checkedCount / totalFields) * 100);

  function toggleCheck(idx: number) {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  return (
    <>
      <PageHero
        title="Loan Estimate vs Closing Disclosure: Side-by-Side Guide"
        subtitle="The CFPB says comparing these two documents line by line is the single most important step you can take before closing. Use this interactive checklist to make sure nothing changed without your knowledge."
        image="/images/hero-closing.jpg"
        breadcrumb={[
          { label: "Closing Process", href: "/closing-process" },
          { label: "LE vs CD Comparison", href: "/le-vs-cd" },
        ]}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* -------------------------------------------------------- */}
        {/*  Section 1: Why This Comparison Matters                   */}
        {/* -------------------------------------------------------- */}
        <section>
          <h2 className="text-2xl font-bold text-alta-navy mb-4">
            Why This Comparison Matters
          </h2>
          <div className="bg-alta-teal/5 border border-alta-teal/20 rounded-2xl p-6 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
            <p>
              Federal law (the TRID rule, effective since 2015) requires your
              lender to deliver the Closing Disclosure at least{" "}
              <strong className="text-alta-navy">3 business days</strong> before
              your scheduled closing — specifically so you have time to compare
              it to the Loan Estimate you received when you applied.
            </p>
            <p>
              The two documents are intentionally designed in the same format,
              page by page, so consumers can spot any changes. The Consumer
              Financial Protection Bureau (CFPB) identifies this side-by-side
              comparison as the{" "}
              <strong className="text-alta-navy">
                most important thing you can do
              </strong>{" "}
              to protect yourself from unexpected costs at closing.
            </p>
            <p>
              The #1 consumer complaint about closing is not understanding how
              the final numbers differ from what was originally quoted — and
              feeling pressured to sign without enough time to review. This guide
              walks you through every field you should compare, explains the
              federal tolerance rules that limit how much fees can change, and
              tells you exactly what to do if something doesn't match.
            </p>
          </div>
        </section>

        <InlineAd />

        {/* -------------------------------------------------------- */}
        {/*  Section 2: Interactive Comparison Checklist               */}
        {/* -------------------------------------------------------- */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-2xl font-bold text-alta-navy">
              Interactive Comparison Checklist
            </h2>
            <span className="text-sm font-medium text-alta-gray">
              {checkedCount}/{totalFields} checked ({progressPct}%)
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-alta-teal rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Place your Loan Estimate and Closing Disclosure side by side. For
            each field below, verify whether the CD matches the LE, then check
            it off. Tap any row for more detail.
          </p>

          <div className="space-y-3">
            {comparisonFields.map((f, idx) => (
              <div
                key={f.field}
                className={`border rounded-xl transition-all ${
                  checked[idx]
                    ? "border-alta-teal/40 bg-alta-teal/5"
                    : "border-[var(--border-color)] bg-[var(--bg-primary)]"
                }`}
              >
                {/* Main row */}
                <div className="flex items-start gap-3 p-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleCheck(idx)}
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      checked[idx]
                        ? "bg-alta-teal border-alta-teal"
                        : "border-gray-300 dark:border-gray-600 hover:border-alta-teal"
                    }`}
                    aria-label={`Mark ${f.field} as checked`}
                  >
                    {checked[idx] && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Content */}
                  <button
                    className="flex-1 text-left"
                    onClick={() =>
                      setExpandedRow(expandedRow === idx ? null : idx)
                    }
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h3
                        className={`font-semibold text-sm ${
                          checked[idx]
                            ? "text-alta-teal line-through"
                            : "text-alta-navy"
                        }`}
                      >
                        {f.field}
                      </h3>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full w-fit ${toleranceColor[f.tolerance]}`}
                      >
                        {toleranceLabel[f.tolerance]}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {f.expectation}
                    </p>
                  </button>

                  {/* Expand chevron */}
                  <button
                    onClick={() =>
                      setExpandedRow(expandedRow === idx ? null : idx)
                    }
                    aria-label={`${expandedRow === idx ? "Collapse" : "Expand"} details for ${f.field}`}
                    className="mt-1 shrink-0 text-alta-gray hover:text-alta-teal transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedRow === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Expanded detail */}
                {expandedRow === idx && (
                  <div className="px-4 pb-4 pl-12">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-3">
                      {f.detail}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {checkedCount === totalFields && (
            <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-800 dark:text-emerald-300 font-medium text-center">
              All fields reviewed. If everything matches (or differences have
              been explained to your satisfaction), you're in good shape for
              closing day.
            </div>
          )}
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Section 3: Red Flags                                     */}
        {/* -------------------------------------------------------- */}
        <section>
          <h2 className="text-2xl font-bold text-alta-navy mb-4">
            Red Flags: What Should Make You Ask Questions
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            If you notice any of the following when comparing your LE to your CD,
            do not ignore them. These are warning signs that something may have
            changed improperly.
          </p>
          <div className="space-y-3">
            {redFlags.map((rf) => (
              <div
                key={rf.flag}
                className="flex gap-3 p-4 bg-red-50/60 dark:bg-red-900/10 border border-red-200/60 dark:border-red-800/40 rounded-xl"
              >
                <div className="shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">
                    {rf.flag}
                  </h3>
                  <p className="text-xs text-red-700/80 dark:text-red-400/80 mt-1 leading-relaxed">
                    {rf.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InlineAd />

        {/* -------------------------------------------------------- */}
        {/*  Section 4: What to Do If Something Doesn't Match         */}
        {/* -------------------------------------------------------- */}
        <section>
          <h2 className="text-2xl font-bold text-alta-navy mb-4">
            What to Do If Something Doesn't Match
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Discrepancies don't necessarily mean something is wrong — but they
            always deserve an explanation. Follow these steps in order.
          </p>
          <ol className="space-y-4">
            {whatToDoSteps.map((s, i) => (
              <li key={s.step} className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-alta-navy text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-alta-navy">
                    {s.step}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Section 5: Tolerance Rules Table                         */}
        {/* -------------------------------------------------------- */}
        <section>
          <h2 className="text-2xl font-bold text-alta-navy mb-4">
            TRID Tolerance Rules at a Glance
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            The TILA-RESPA Integrated Disclosure (TRID) rule divides closing
            costs into three tolerance categories. If fees exceed their
            tolerance, the lender must refund the excess to you (a "tolerance
            cure") at or within 30 days of closing.
          </p>
          <div className="space-y-4">
            {toleranceRules.map((group) => (
              <div
                key={group.category}
                className={`border-l-4 ${group.color} rounded-xl overflow-hidden border border-[var(--border-color)]`}
              >
                <div className={`px-5 py-3 ${group.headerBg}`}>
                  <h3 className="text-sm font-bold text-alta-navy">
                    {group.category}
                  </h3>
                </div>
                <ul className="px-5 py-3 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <svg
                        className="w-4 h-4 text-alta-gray shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Section 6: Related Guides                                */}
        {/* -------------------------------------------------------- */}
        <section className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/loan-estimate"
            className="p-5 rounded-xl border border-[var(--border-color)] hover:border-alta-teal/40 hover:shadow-md transition-all group"
          >
            <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
              Understanding Your Loan Estimate
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Page-by-page guide to every section of the LE.
            </p>
          </Link>
          <Link
            href="/closing-disclosure"
            className="p-5 rounded-xl border border-[var(--border-color)] hover:border-alta-teal/40 hover:shadow-md transition-all group"
          >
            <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
              Understanding Your Closing Disclosure
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Page-by-page guide to every section of the CD.
            </p>
          </Link>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Actions: Print, Save, CTA                                */}
        {/* -------------------------------------------------------- */}
        <div className="flex flex-wrap items-center gap-3 no-print">
          <PrintButton label="Print This Checklist" />
          <SaveToFolderBtn
            type="checklist"
            title="LE vs CD Comparison Checklist"
            content="Interactive checklist for comparing your Loan Estimate to your Closing Disclosure, including tolerance rules and red flags."
            dedupId="le-vs-cd-checklist"
            label="Save to Folder"
          />
        </div>

        <FirstTimeBuyerCTA />
      </main>
    </>
  );
}
