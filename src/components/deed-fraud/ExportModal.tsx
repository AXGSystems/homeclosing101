"use client";

import { useEffect } from "react";
import type { ChecklistItemData } from "./ProtectionToolkit";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
interface LookupResult {
  type: string;
  county?: string;
  state?: string;
  data: {
    programName: string;
    registrationUrl?: string;
  };
}

interface UserInfo {
  name: string;
  email: string;
}

interface ExportModalProps {
  checklist: ChecklistItemData[];
  userInfo: UserInfo;
  lookupResult: LookupResult | null;
  onClose: () => void;
}

/* ------------------------------------------------------------------ */
/* Phone script data (used in both print preview and email body)       */
/* ------------------------------------------------------------------ */
const PHONE_SCRIPT = [
  {
    label: "Opening",
    text: "I'd like to enroll in your free property fraud alert program \u2014 the service that notifies me when a document is recorded against my property. Am I in the right office?",
  },
  {
    label: "Enrollment",
    text: "How do I enroll? Is there an online form or paper form? What information do you need from me?",
  },
  {
    label: "Notification",
    text: "How will I receive alerts \u2014 email, text, or phone? Can I use more than one method? What email address will alerts come from?",
  },
  {
    label: "Scope",
    text: "Does this service monitor documents recorded in my name only, or can I also add my parcel number?",
  },
  {
    label: "Test",
    text: "Is there a way to test that alerts are working?",
  },
  {
    label: "Follow-up",
    text: "If I ever get an alert I'm not sure about, what's the best number to call for help? Is there a dedicated fraud unit?",
  },
];

/* ------------------------------------------------------------------ */
/* Email body generator                                                */
/* ------------------------------------------------------------------ */
function generateEmailBody(
  checklist: ChecklistItemData[],
  userInfo: UserInfo,
  lookupResult: LookupResult | null
): string {
  const completed = checklist.filter((i) => i.completed);
  const remaining = checklist.filter((i) => !i.completed);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let body = `MY DEED FRAUD PROTECTION RECORD\n`;
  body += `Generated ${today}\n`;
  body += `Home Closing 101 / American Land Title Association\n\n`;
  body += `================================\n\n`;

  if (userInfo.name) body += `Homeowner: ${userInfo.name}\n`;
  body += `Progress: ${completed.length} of ${checklist.length} steps completed\n\n`;

  if (
    lookupResult?.type === "verified" ||
    lookupResult?.type === "statewide"
  ) {
    body += `COUNTY PROGRAM: ${lookupResult.data.programName}\n`;
    body += `Registration: ${lookupResult.data.registrationUrl}\n\n`;
  }

  if (completed.length > 0) {
    body += `COMPLETED STEPS:\n`;
    completed.forEach((item) => {
      body += `[X] ${item.title}\n`;
      if (item.completedDate) {
        body += `    Completed: ${new Date(item.completedDate).toLocaleDateString()}\n`;
      }
      if (item.notes) body += `    Notes: ${item.notes}\n`;
      body += `\n`;
    });
  }

  if (remaining.length > 0) {
    body += `\nREMAINING STEPS:\n`;
    remaining.forEach((item) => {
      body += `[ ] ${item.title}\n`;
    });
  }

  body += `\n\n================================\n`;
  body += `REFERENCE: PHONE SCRIPT FOR CALLING THE RECORDER'S OFFICE\n`;
  body += `================================\n\n`;
  body += `Use this if you need to call your county recorder to enroll:\n\n`;
  body += `OPENING: "I'd like to enroll in your free property fraud alert program \u2014 the service that notifies me when a document is recorded against my property. Am I in the right office?"\n\n`;
  body += `ENROLLMENT: "How do I enroll? Is there an online form or paper form? What information do you need from me?"\n\n`;
  body += `NOTIFICATION: "How will I receive alerts \u2014 email, text, or phone? Can I use more than one method? What email address will alerts come from?"\n\n`;
  body += `SCOPE: "Does this service monitor documents recorded in my name only, or can I also add my parcel number?"\n\n`;
  body += `TEST: "Is there a way to test that alerts are working?"\n\n`;
  body += `FOLLOW-UP: "If I ever get an alert I'm not sure about, what's the best number to call for help? Is there a dedicated fraud unit?"\n\n`;

  body += `\nThis record is informational only and does not constitute legal advice.`;
  return body;
}

/* ------------------------------------------------------------------ */
/* ExportModal                                                         */
/* ------------------------------------------------------------------ */
export default function ExportModal({
  checklist,
  userInfo,
  lookupResult,
  onClose,
}: ExportModalProps) {
  // Escape key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const completed = checklist.filter((i) => i.completed);
  const remaining = checklist.filter((i) => !i.completed);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEmail = () => {
    const subject = encodeURIComponent("My Deed Fraud Protection Toolkit");
    const body = encodeURIComponent(
      generateEmailBody(checklist, userInfo, lookupResult)
    );
    window.location.href = `mailto:${userInfo.email || ""}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,45,90,0.6)] flex items-center justify-center z-[1000] p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded max-w-[800px] w-full max-h-[90vh] overflow-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#e8edf2] flex justify-between items-center bg-alta-navy text-white">
          <h3 className="m-0 font-serif text-xl font-medium">
            Print or Export Toolkit
          </h3>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white cursor-pointer p-1"
            aria-label="Close"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-[#5a6b7d] mb-5">
            Use your browser&apos;s Print function to save as PDF or print a
            paper copy. This record is yours — nothing is sent to ALTA.
          </p>

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap mb-5">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-alta-navy text-white border-none px-[18px] py-2.5 text-[13px] font-semibold tracking-[0.3px] rounded-sm cursor-pointer uppercase"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print / Save as PDF
            </button>
            <button
              onClick={handleEmail}
              className="inline-flex items-center gap-1.5 bg-white text-alta-navy border border-alta-navy px-[18px] py-2.5 text-[13px] font-semibold tracking-[0.3px] rounded-sm cursor-pointer uppercase"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email to Myself
            </button>
          </div>

          {/* Print preview */}
          <div
            id="print-content"
            className="border border-[#e8edf2] rounded-sm p-7 bg-white font-serif"
          >
            {/* Title block */}
            <div className="text-center border-b-2 border-alta-navy pb-3.5 mb-5">
              <div className="text-[22px] text-alta-navy font-medium mb-1">
                My Deed Fraud Protection Record
              </div>
              <div className="text-xs text-[#7a8898] font-sans">
                Home Closing 101 — An Educational Initiative of the American
                Land Title Association
              </div>
            </div>

            {/* User info */}
            <div className="font-sans text-[13px] text-[#2c3e50] leading-relaxed">
              {userInfo.name && (
                <div>
                  <strong>Homeowner:</strong> {userInfo.name}
                </div>
              )}
              {userInfo.email && (
                <div>
                  <strong>Email:</strong> {userInfo.email}
                </div>
              )}
              <div>
                <strong>Report date:</strong> {today}
              </div>
              <div>
                <strong>Progress:</strong> {completed.length} of{" "}
                {checklist.length} steps completed
              </div>
              {lookupResult?.type === "verified" && (
                <div className="mt-2.5">
                  <strong>County program:</strong>{" "}
                  {lookupResult.data.programName} ({lookupResult.county},{" "}
                  {lookupResult.state})
                </div>
              )}
            </div>

            {/* Completed steps */}
            {completed.length > 0 && (
              <div className="mt-5">
                <div className="text-base text-alta-navy border-b border-[#e8edf2] pb-1.5 mb-3">
                  Completed Steps
                </div>
                {completed.map((item) => (
                  <div
                    key={item.id}
                    className="mb-3 font-sans text-[13px] leading-normal"
                  >
                    <div className="font-semibold text-[#2d7a3e]">
                      &#10003; {item.title}
                    </div>
                    {item.completedDate && (
                      <div className="text-[11px] text-[#5a6b7d] italic">
                        Completed{" "}
                        {new Date(item.completedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-xs text-[#3a4a5c] mt-0.5 pl-3 border-l-2 border-[#e8edf2]">
                        {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Remaining steps */}
            {remaining.length > 0 && (
              <div className="mt-5">
                <div className="text-base text-alta-navy border-b border-[#e8edf2] pb-1.5 mb-3">
                  Remaining Steps
                </div>
                {remaining.map((item) => (
                  <div
                    key={item.id}
                    className="mb-2 font-sans text-[13px] leading-normal"
                  >
                    <div className="text-[#5a6b7d]">
                      &#9744; {item.title}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Phone script appendix */}
            <div className="mt-5 print:break-before-page">
              <div className="text-base text-alta-navy border-b border-[#e8edf2] pb-1.5 mb-3">
                Reference: Phone Script for Calling the Recorder&apos;s Office
              </div>
              <div className="font-sans text-[12.5px] leading-normal text-[#3a4a5c]">
                <p className="mt-0">
                  Use this script if you need to call your county recorder to
                  enroll:
                </p>
                {PHONE_SCRIPT.map((line, i) => (
                  <div key={i} className="mb-2.5">
                    <div className="text-[10px] font-bold text-alta-navy tracking-[0.3px] uppercase">
                      {line.label}
                    </div>
                    <div className="italic pl-2.5 border-l-2 border-[#C6A75E]">
                      &ldquo;{line.text}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-7 pt-3.5 border-t border-[#e8edf2] text-[10px] text-[#8a98a7] font-sans text-center italic">
              This record is informational only and does not constitute legal
              advice. Consult a licensed real estate attorney for legal matters
              regarding property title.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
