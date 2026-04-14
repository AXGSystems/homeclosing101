"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PrintButton from "@/components/PrintButton";
import SaveToFolderBtn from "@/components/SaveToFolderBtn";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

// export const metadata: Metadata = { ... } — cannot use with "use client"
// Title set via document.title in useEffect or head component; SEO handled by layout template

export default function EmergencyContactsPage() {
  const [contacts, setContacts] = useState({
    agentName: "",
    agentPhone: "",
    lenderName: "",
    lenderPhone: "",
    titleName: "",
    titlePhone: "",
    insuranceName: "",
    insurancePhone: "",
    closingDate: "",
  });

  const updateContact = (field: string, value: string) => {
    setContacts((prev) => ({ ...prev, [field]: value }));
  };

  const contactsSummary = [
    contacts.agentName && `Agent: ${contacts.agentName} ${contacts.agentPhone}`,
    contacts.lenderName && `Lender: ${contacts.lenderName} ${contacts.lenderPhone}`,
    contacts.titleName && `Title: ${contacts.titleName} ${contacts.titlePhone}`,
    contacts.insuranceName && `Insurance: ${contacts.insuranceName} ${contacts.insurancePhone}`,
    contacts.closingDate && `Closing: ${contacts.closingDate}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHero
        title="Emergency Contacts & Key Numbers for Homebuyers"
        subtitle="Critical phone numbers and resources you need during your real estate transaction. Print this page and keep it with your closing documents."
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
        breadcrumb={[
          { label: "Resources", href: "/resources" },
          { label: "Emergency Contacts", href: "/emergency-contacts" },
        ]}
      />
      <div className="py-1.5 lg:py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Print + Save buttons — top of page */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <PrintButton label="Print This Page" />
            <p className="text-xs text-alta-gray">
              This page is designed to be printed and kept with your closing
              documents.
            </p>
          </div>

          {/* ============================================= */}
          {/* WIRE FRAUD EMERGENCY — RED SECTION */}
          {/* ============================================= */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#7a1a1a] via-[#943030] to-[#7a1a1a] px-5 py-3">
              <h2 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.168-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.457-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Wire Fraud Emergency — Act Immediately
              </h2>
            </div>
            <div className="bg-gradient-to-b from-red-50 to-white p-5 border-2 border-t-0 border-[#943030]/30 rounded-b-2xl">
              <p className="text-xs text-alta-gray mb-4 font-medium">
                If you suspect wire fraud, every minute counts. Contact these
                numbers immediately:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Your bank */}
                <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#943030]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-alta-navy">
                        Your Bank&apos;s Wire Fraud Department
                      </h3>
                      <p className="text-xs text-[#943030] font-bold mt-1">
                        Call the number on the back of your debit card
                      </p>
                      <p className="text-[10px] text-alta-gray mt-1">
                        Request an immediate wire recall. Do not hang up until
                        they confirm.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FBI IC3 */}
                <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#943030]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-alta-navy">
                        FBI Internet Crime Complaint Center (IC3)
                      </h3>
                      <p className="text-xs text-[#943030] font-bold mt-1">
                        1-800-CALL-FBI (1-800-225-5324)
                      </p>
                      <p className="text-[10px] text-alta-gray mt-1">
                        File online at{" "}
                        <a
                          href="https://www.ic3.gov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-alta-teal underline font-semibold"
                        >
                          ic3.gov
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title company */}
                <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#943030]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-alta-navy">
                        Your Title Company
                      </h3>
                      <p className="text-xs text-[#943030] font-bold mt-1">
                        Call the number from your closing documents
                      </p>
                      <p className="text-[10px] text-alta-gray mt-1">
                        Never use a phone number from a suspicious email.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CFPB */}
                <div className="relative p-4 bg-white rounded-xl border-2 border-red-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#943030]/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#943030]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-alta-navy">
                        CFPB Complaint Line
                      </h3>
                      <p className="text-xs text-[#943030] font-bold mt-1">
                        1-855-411-2372
                      </p>
                      <p className="text-[10px] text-alta-gray mt-1">
                        Consumer Financial Protection Bureau complaint hotline
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-alta-teal font-medium mt-3">
                See also:{" "}
                <Link
                  href="/stop-fraud"
                  className="underline hover:text-alta-navy"
                >
                  Stop Fraud 101
                </Link>{" "}
                for full wire fraud prevention steps
              </p>
            </div>
          </div>

          {/* ============================================= */}
          {/* GOVERNMENT AGENCIES */}
          {/* ============================================= */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-alta-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21"
              />
            </svg>
            Government Agencies
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: "Consumer Financial Protection Bureau (CFPB)",
                phone: "1-855-411-2372",
                url: "https://www.consumerfinance.gov/",
                urlLabel: "consumerfinance.gov",
                desc: "Consumer complaints, mortgage questions, financial education",
              },
              {
                name: "HUD Housing Counselor Referral Line",
                phone: "1-800-569-4287",
                url: "https://www.hud.gov/counseling",
                urlLabel: "hud.gov/counseling",
                desc: "Free or low-cost housing counseling from HUD-approved agencies",
              },
              {
                name: "FTC Fraud Reporting",
                phone: null,
                url: "https://reportfraud.ftc.gov/",
                urlLabel: "reportfraud.ftc.gov",
                desc: "Report fraud, scams, and bad business practices to the FTC",
              },
              {
                name: "State Attorney General",
                phone: null,
                url: "https://www.naag.org/find-my-ag/",
                urlLabel: "Find your AG at naag.org",
                desc: "File consumer complaints and report fraud in your state",
              },
              {
                name: "State Insurance Department",
                phone: null,
                url: "/find-policy",
                urlLabel: "Find your state department",
                desc: "Title insurance rate questions, complaints, and regulation inquiries",
                internal: true,
              },
            ].map((agency) => (
              <div
                key={agency.name}
                className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive"
              >
                <h3 className="text-sm font-bold text-alta-navy">
                  {agency.name}
                </h3>
                {agency.phone && (
                  <p className="text-sm text-alta-teal font-bold mt-1">
                    <a href={`tel:${agency.phone.replace(/[^0-9]/g, "")}`}>
                      {agency.phone}
                    </a>
                  </p>
                )}
                <p className="text-xs text-alta-gray mt-1">{agency.desc}</p>
                {agency.internal ? (
                  <Link
                    href={agency.url}
                    className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1 hover:underline"
                  >
                    {agency.urlLabel}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                ) : (
                  <a
                    href={agency.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1 hover:underline"
                  >
                    {agency.urlLabel}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ============================================= */}
          {/* INDUSTRY ORGANIZATIONS */}
          {/* ============================================= */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-alta-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            Industry Organizations
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: "American Land Title Association (ALTA)",
                phone: "202-296-3671",
                url: "https://www.alta.org/",
                urlLabel: "alta.org",
                desc: "National trade association for the title insurance industry",
              },
              {
                name: "National Association of REALTORS (NAR)",
                phone: "1-800-874-6500",
                url: "https://www.nar.realtor/",
                urlLabel: "nar.realtor",
                desc: "Consumer resources, find a REALTOR, ethics complaints",
              },
            ].map((org) => (
              <div
                key={org.name}
                className="p-4 bg-[#f0edf5] rounded-xl border border-[#d4cce4] border-l-4 border-l-[#5b3a8c] tile-interactive"
              >
                <h3 className="text-sm font-bold text-alta-navy">{org.name}</h3>
                <p className="text-sm text-[#5b3a8c] font-bold mt-1">
                  <a href={`tel:${org.phone.replace(/[^0-9]/g, "")}`}>
                    {org.phone}
                  </a>
                </p>
                <p className="text-xs text-alta-gray mt-1">{org.desc}</p>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-alta-teal font-medium mt-2 inline-flex items-center gap-1 hover:underline"
                >
                  {org.urlLabel}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* ============================================= */}
          {/* UTILITY SETUP */}
          {/* ============================================= */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-alta-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            Utility Setup
          </h2>
          <p className="text-sm text-alta-gray mb-4">
            Schedule these for your move-in date. Most providers need 5-10
            business days to activate service.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                name: "Electric & Gas",
                action: "Contact your local provider",
                tip: "Search '[your city] electric company' or check with the seller for current provider info",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                ),
              },
              {
                name: "Water & Sewer",
                action: "Contact your city or county",
                tip: "Usually managed by local government. Call your city hall or public works department.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                ),
              },
              {
                name: "Internet & Cable",
                action: "Compare providers at broadbandnow.com",
                tip: "Check availability at your new address before closing",
                url: "https://broadbandnow.com/",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                  />
                ),
              },
              {
                name: "USPS Mail Forwarding",
                action: "Forward your mail at usps.com/move",
                tip: "Set up at least 2 weeks before your move. Costs $1.10 for identity verification.",
                url: "https://moversguide.usps.com/mgo/disclaimer",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                ),
              },
            ].map((util) => (
              <div
                key={util.name}
                className="p-4 bg-[#faf4e4] rounded-xl border border-[#e8d9a8] border-l-4 border-l-[#8b6914] tile-interactive"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8b6914]/10 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4 text-[#8b6914]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      {util.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-alta-navy">
                      {util.name}
                    </h3>
                    <p className="text-xs text-[#8b6914] font-semibold mt-1">
                      {util.url ? (
                        <a
                          href={util.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-alta-navy"
                        >
                          {util.action}
                        </a>
                      ) : (
                        util.action
                      )}
                    </p>
                    <p className="text-[10px] text-alta-gray mt-1">
                      {util.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ============================================= */}
          {/* TAX & LEGAL */}
          {/* ============================================= */}
          <h2 className="text-2xl font-bold text-alta-navy mb-4 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-alta-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
              />
            </svg>
            Tax & Legal
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              {
                name: "IRS General Inquiries",
                phone: "1-800-829-1040",
                desc: "Mortgage interest deductions, tax ID numbers, filing questions",
              },
              {
                name: "County Tax Assessor",
                phone: null,
                desc: "Search '[your county] property tax' to find your local assessor's office for tax rates and payment schedules",
              },
              {
                name: "Homestead Exemption",
                phone: null,
                desc: "File at your county courthouse or county appraiser's office. Can reduce your property tax by thousands per year.",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive"
              >
                <h3 className="text-sm font-bold text-alta-navy">
                  {item.name}
                </h3>
                {item.phone && (
                  <p className="text-sm text-[#2d6b3f] font-bold mt-1">
                    <a href={`tel:${item.phone.replace(/[^0-9]/g, "")}`}>
                      {item.phone}
                    </a>
                  </p>
                )}
                <p className="text-xs text-alta-gray mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* ============================================= */}
          {/* MY TRANSACTION CONTACTS — FILLABLE SECTION */}
          {/* ============================================= */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-[#b4d8e8]">
            <div className="bg-gradient-to-r from-[#0a7ea8] to-[#0a6e94] px-5 py-3">
              <h2 className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                My Transaction Contacts
              </h2>
              <p className="text-white/80 text-xs mt-1">
                Fill in your team&apos;s contact info. Save to your Closing
                Folder for easy reference.
              </p>
            </div>
            <div className="p-5 bg-white">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Agent */}
                <div>
                  <label className="block text-xs font-semibold text-alta-navy mb-1">
                    My Real Estate Agent
                  </label>
                  <input
                    type="text"
                    placeholder="Agent name"
                    value={contacts.agentName}
                    onChange={(e) => updateContact("agentName", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contacts.agentPhone}
                    onChange={(e) => updateContact("agentPhone", e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                </div>

                {/* Lender */}
                <div>
                  <label className="block text-xs font-semibold text-alta-navy mb-1">
                    My Lender
                  </label>
                  <input
                    type="text"
                    placeholder="Lender name"
                    value={contacts.lenderName}
                    onChange={(e) => updateContact("lenderName", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contacts.lenderPhone}
                    onChange={(e) =>
                      updateContact("lenderPhone", e.target.value)
                    }
                    className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                </div>

                {/* Title Company */}
                <div>
                  <label className="block text-xs font-semibold text-alta-navy mb-1">
                    My Title Company
                  </label>
                  <input
                    type="text"
                    placeholder="Title company name"
                    value={contacts.titleName}
                    onChange={(e) => updateContact("titleName", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contacts.titlePhone}
                    onChange={(e) => updateContact("titlePhone", e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                </div>

                {/* Insurance */}
                <div>
                  <label className="block text-xs font-semibold text-alta-navy mb-1">
                    My Insurance Agent
                  </label>
                  <input
                    type="text"
                    placeholder="Insurance agent name"
                    value={contacts.insuranceName}
                    onChange={(e) =>
                      updateContact("insuranceName", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={contacts.insurancePhone}
                    onChange={(e) =>
                      updateContact("insurancePhone", e.target.value)
                    }
                    className="w-full mt-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              {/* Closing Date */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-alta-navy mb-1">
                  Closing Date
                </label>
                <input
                  type="date"
                  value={contacts.closingDate}
                  onChange={(e) =>
                    updateContact("closingDate", e.target.value)
                  }
                  className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alta-teal/30 focus:border-alta-teal bg-[var(--bg-primary)] text-[var(--text-primary)]"
                />
              </div>

              {/* Save to Folder */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <SaveToFolderBtn
                  type="note"
                  title="My Transaction Contacts"
                  content={
                    contactsSummary || "No contacts entered yet."
                  }
                  dedupId="emergency-contacts-my-team"
                  label="Save to Folder"
                  savedLabel="Saved to Folder!"
                />
                <span className="text-[10px] text-alta-gray">
                  Saves to your{" "}
                  <Link
                    href="/my-folder"
                    className="text-alta-teal underline hover:text-alta-navy"
                  >
                    Closing Folder
                  </Link>{" "}
                  for easy reference
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8" />

          {/* Bottom actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <PrintButton label="Print This Page" />
            <Link
              href="/stop-fraud"
              className="px-5 py-2.5 bg-[#943030] text-white font-semibold rounded-lg hover:bg-[#7a2020] transition-colors text-center text-sm"
            >
              Stop Fraud 101
            </Link>
            <Link
              href="/closing-process/closing-checklist"
              className="px-5 py-2.5 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors text-center text-sm"
            >
              Closing Checklist
            </Link>
            <Link
              href="/document-checklist"
              className="px-5 py-2.5 border-2 border-alta-navy text-alta-navy font-semibold rounded-lg hover:bg-alta-navy hover:text-white transition-colors text-center text-sm"
            >
              Document Checklist
            </Link>
          </div>

          {/* Related Topics */}
          <h2 className="text-lg font-bold text-alta-navy mb-4">
            Related Topics
          </h2>
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            <Link
              href="/stop-fraud"
              className="p-4 bg-[#f5e8e8] rounded-xl border border-[#e4c5c5] border-l-4 border-l-[#943030] tile-interactive group"
            >
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
                Stop Fraud 101
              </h3>
              <p className="text-[10px] text-alta-gray mt-1">
                10 FBI-sourced steps to prevent wire fraud during your closing
              </p>
            </Link>
            <Link
              href="/closing-day-prep"
              className="p-4 bg-[#e6f1f5] rounded-xl border border-[#b4d8e8] border-l-4 border-l-[#0a7ea8] tile-interactive group"
            >
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
                Closing Day Prep
              </h3>
              <p className="text-[10px] text-alta-gray mt-1">
                Everything you need to do before and on closing day
              </p>
            </Link>
            <Link
              href="/after-closing"
              className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7] border-l-4 border-l-[#2d6b3f] tile-interactive group"
            >
              <h3 className="text-sm font-bold text-alta-navy group-hover:text-alta-teal transition-colors">
                After Closing
              </h3>
              <p className="text-[10px] text-alta-gray mt-1">
                Post-closing steps including utility setup, tax filing, and
                homestead exemption
              </p>
            </Link>
          </div>

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
