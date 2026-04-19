"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Provider data                                                      */
/* ------------------------------------------------------------------ */

interface ProviderInfo {
  provider: string;
  steps: string[];
  altNote?: string;
}

const PROVIDERS: ProviderInfo[] = [
  {
    provider: "Gmail (web and mobile app)",
    steps: [
      "Open the confirmation email from the alert program.",
      'Click the three-dot menu in the upper right of the message.',
      'Select "Filter messages like this."',
      'In the filter window, click "Create filter."',
      'Check "Never send it to Spam" and "Always mark it as important," then click "Create filter."',
    ],
    altNote:
      'If the email went to spam: open it, click the three-dot menu, and select "Report not spam" -- then create the filter.',
  },
  {
    provider: "Outlook / Hotmail / Live.com",
    steps: [
      "Open Outlook and go to Settings (gear icon) then View all Outlook settings.",
      "Select Mail then Junk email.",
      'Under "Safe senders and domains," click Add.',
      "Type the sender email address and click Enter, then click Save.",
    ],
    altNote: "On desktop Outlook: right-click the email, select Junk, then Never block sender.",
  },
  {
    provider: "Apple Mail (iPhone, iPad, Mac)",
    steps: [
      "Open the confirmation email.",
      "Tap or click the sender name at the top of the message.",
      'Select "Add to VIPs" (iPhone/iPad) or "Add to Contacts" (Mac).',
      "Messages from VIPs bypass junk filtering on iCloud Mail.",
    ],
    altNote:
      "Also go to Settings then Mail then Threading -- make sure Block Sender List is not blocking the sender.",
  },
  {
    provider: "Yahoo Mail",
    steps: [
      "Click the Settings icon then More Settings.",
      'Select "Filters" from the left sidebar.',
      'Click "Add new filters."',
      'Name the filter (e.g., "Property Fraud Alerts"), set Sender contains [the alert email address], and set the action to move to Inbox.',
      "Click Save.",
    ],
    altNote:
      "Also add the sender to your contacts -- Yahoo treats contacts as safe senders by default.",
  },
  {
    provider: "AOL Mail",
    steps: [
      "Click Contacts in the left sidebar.",
      'Click "New Contact."',
      "Enter the alert sender address and save.",
      "AOL automatically treats contacts as safe senders.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Single provider accordion card                                     */
/* ------------------------------------------------------------------ */

function SafeSenderCard({ provider, steps, altNote }: ProviderInfo) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 flex items-center justify-between text-left text-sm font-semibold text-alta-navy cursor-pointer transition-colors ${
          open ? "bg-gray-50" : "bg-white hover:bg-gray-50"
        }`}
      >
        <span>{provider}</span>
        {open ? <ChevronDown size={16} className="text-alta-gray shrink-0" /> : <ChevronRight size={16} className="text-alta-gray shrink-0" />}
      </button>

      {open && (
        <div className="px-4 py-3.5 border-t border-gray-200 text-[13.5px] leading-relaxed text-gray-600">
          <ol className="list-decimal pl-5 mt-0 mb-0 space-y-1">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {altNote && (
            <div className="text-[12.5px] text-gray-500 italic pt-2 mt-2.5 border-t border-dashed border-gray-200">
              {altNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SafeSenderSetup() {
  return (
    <div className="grid gap-3 my-4">
      {PROVIDERS.map((p) => (
        <SafeSenderCard key={p.provider} {...p} />
      ))}
    </div>
  );
}
