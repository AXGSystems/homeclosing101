"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/components/PageHero";

const costCategories = [
  {
    title: "Loan-Related Fees",
    items: [
      { name: "Loan Origination", description: "Lender's charge for processing your loan application, underwriting and funding.", typical: "0.5-1% of loan" },
      { name: "Discount Points", description: "Percentage of loan amount paid upfront to reduce your interest rate.", typical: "0-2% of loan" },
      { name: "Underwriting Fee", description: "Fee covering the research and approval of your loan.", typical: "$400-$900" },
      { name: "Prepaid Interest", description: "Interest from closing day through end of month.", typical: "Varies" },
    ],
  },
  {
    title: "Property Evaluation",
    items: [
      { name: "Appraisal", description: "Professional assessment of the property's market value.", typical: "$300-$600" },
      { name: "Home Inspection", description: "Thorough examination of the property's condition and needed repairs.", typical: "$300-$500" },
      { name: "Pest Inspection", description: "Testing for termite or pest infestation.", typical: "$75-$150" },
      { name: "Survey", description: "Verification of property boundaries and lot dimensions.", typical: "$300-$700" },
    ],
  },
  {
    title: "Title & Insurance",
    items: [
      { name: "Title Search", description: "Review of public records to verify clear ownership.", typical: "$200-$400" },
      { name: "Lender's Title Insurance", description: "Protects the lender's investment against title defects.", typical: "$500-$1,500" },
      { name: "Owner's Title Insurance", description: "One-time fee protecting your investment for the life of ownership.", typical: "0.5-1% of price" },
      { name: "Homeowner's Insurance", description: "First year premium for fire, wind, and hazard coverage.", typical: "$800-$2,000/yr" },
      { name: "Flood Determination", description: "Assessment of whether property is in a flood zone.", typical: "$15-$25" },
    ],
  },
  {
    title: "Administrative & Legal",
    items: [
      { name: "Settlement/Escrow Fee", description: "Fee paid to the settlement agent for handling the transaction.", typical: "$500-$2,000" },
      { name: "Document Preparation", description: "Preparation of final legal papers.", typical: "$50-$400" },
      { name: "Notary Fees", description: "Signature verification services.", typical: "$50-$200" },
      { name: "Attorney Fees", description: "Legal representation (required in some states).", typical: "$500-$1,500" },
      { name: "Recording Fees", description: "County fee for officially recording the deed and mortgage.", typical: "$50-$250" },
    ],
  },
  {
    title: "Taxes & Other",
    items: [
      { name: "Transfer Tax", description: "State or local tax on the transfer of property ownership.", typical: "Varies by state" },
      { name: "Property Taxes (Prepaid)", description: "Typically 2-6 months of property taxes paid in advance.", typical: "Varies" },
      { name: "Home Warranty", description: "Optional coverage for major home systems and appliances.", typical: "$300-$600" },
    ],
  },
];

export default function ClosingCostsPage() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(20);

  const loanAmount = homePrice * (1 - downPayment / 100);
  const lowEstimate = homePrice * 0.02;
  const highEstimate = homePrice * 0.05;
  const midEstimate = (lowEstimate + highEstimate) / 2;

  const breakdown = {
    origination: loanAmount * 0.0075,
    appraisal: 450,
    inspection: 400,
    titleSearch: 300,
    lenderTitle: loanAmount * 0.003,
    ownerTitle: homePrice * 0.005,
    settlement: 1200,
    recording: 150,
    insurance: 1400,
    escrow: homePrice * 0.005,
  };

  const calculatedTotal = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return (
    <>
    <PageHero
      title="Closing Costs Explained"
      subtitle="Typically 2%–5% of your home's purchase price. Use our calculator and review every fee category."
      image="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80"
      breadcrumb={[{ label: "The Closing Process", href: "/closing-process" }, { label: "Closing Costs", href: "/closing-process/closing-costs" }]}
    />
    <div className="py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Page intro */}
        <div className="mb-8 p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-alta-teal/10 flex items-center justify-center text-alta-teal shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5z" /></svg>
            </div>
            <div>
              <h2 className="font-bold text-alta-navy mb-1">Estimate Your Closing Costs</h2>
              <p className="text-sm text-alta-gray leading-relaxed">Use the calculator below to get a personalized estimate based on your purchase price and down payment. Then scroll down to see every fee category explained in detail. Costs vary by state and lender — this is an estimate, not a quote.</p>
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-alta-light rounded-2xl p-6 lg:p-8 mb-12 border border-gray-100">
          <h2 className="text-xl font-bold text-alta-navy mb-6">Closing Cost Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-alta-navy mb-2">Home Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-alta-gray">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-4 py-3 border border-gray-200 rounded-lg text-alta-navy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-alta-navy mb-2">Down Payment (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  min={0}
                  max={100}
                  className="w-full pl-4 pr-8 py-3 border border-gray-200 rounded-lg text-alta-navy"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-alta-gray">%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-alta-gray uppercase tracking-wider mb-1">Low Estimate (2%)</p>
              <p className="text-2xl font-bold text-alta-navy">${lowEstimate.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border-2 border-alta-teal">
              <p className="text-xs text-alta-teal uppercase tracking-wider mb-1 font-medium">Calculated Estimate</p>
              <p className="text-2xl font-bold text-alta-teal">${Math.round(calculatedTotal).toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <p className="text-xs text-alta-gray uppercase tracking-wider mb-1">High Estimate (5%)</p>
              <p className="text-2xl font-bold text-alta-navy">${highEstimate.toLocaleString()}</p>
            </div>
          </div>

          {/* Detailed breakdown */}
          <details className="group">
            <summary className="cursor-pointer text-sm font-semibold text-alta-teal hover:text-alta-teal-dark flex items-center gap-1">
              View Estimated Breakdown
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 space-y-2">
              {Object.entries(breakdown).map(([key, value]) => {
                const labels: Record<string, string> = {
                  origination: "Loan Origination",
                  appraisal: "Appraisal",
                  inspection: "Home Inspection",
                  titleSearch: "Title Search",
                  lenderTitle: "Lender's Title Insurance",
                  ownerTitle: "Owner's Title Insurance",
                  settlement: "Settlement Fee",
                  recording: "Recording Fees",
                  insurance: "Homeowner's Insurance (1yr)",
                  escrow: "Escrow/Tax Prepaid",
                };
                return (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-alta-gray">{labels[key]}</span>
                    <span className="text-sm font-medium text-alta-navy">${Math.round(value).toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="flex justify-between py-2 pt-3 border-t-2 border-alta-teal">
                <span className="text-sm font-bold text-alta-navy">Estimated Total</span>
                <span className="text-sm font-bold text-alta-teal">${Math.round(calculatedTotal).toLocaleString()}</span>
              </div>
            </div>
          </details>

          <p className="text-xs text-alta-gray mt-4">
            * This calculator provides estimates only. Actual costs vary by state, county, lender, and transaction details. Consult your settlement agent for an accurate Closing Disclosure.
          </p>
        </div>

        {/* Fee Categories */}
        <h2 className="text-2xl font-bold text-alta-navy mb-6">All Closing Costs by Category</h2>
        <div className="space-y-8">
          {costCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-lg font-semibold text-alta-navy mb-3 pb-2 border-b border-gray-100">{cat.title}</h3>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-alta-navy">{item.name}</p>
                      <p className="text-xs text-alta-gray">{item.description}</p>
                    </div>
                    <span className="text-xs font-medium text-alta-teal bg-alta-light px-2 py-1 rounded shrink-0">
                      {item.typical}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
