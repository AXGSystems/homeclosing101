"use client";

/* ------------------------------------------------------------------ */
/*  Script line data                                                   */
/* ------------------------------------------------------------------ */

interface ScriptLine {
  label: string;
  text: string;
  note?: string;
}

const SCRIPT_LINES: ScriptLine[] = [
  {
    label: "Opening",
    text: "Hello, I'd like to enroll in your free property fraud alert program -- the service that notifies me when a document is recorded against my property. Am I in the right office?",
    note: "If they say no, ask them to transfer you to the recorder, clerk, or land records division.",
  },
  {
    label: "If they say the program exists",
    text: "Great. Can you tell me how I enroll? Is there an online form, or do I need to complete a paper form? And what information will you need from me?",
    note: "Be ready with: your full legal name as it appears on the deed, your property parcel number (APN/PIN), your property address, and an email address.",
  },
  {
    label: "Confirm notification method",
    text: "How will I receive alerts -- email, text message, or phone call? Can I choose more than one method?",
    note: "If email, ask for the exact sender address so you can whitelist it (see next section).",
  },
  {
    label: "Ask about the sender address",
    text: "What email address will the alerts come from? I want to make sure it doesn't go to my spam folder.",
    note: "Write this down -- you'll add it to your safe-senders list.",
  },
  {
    label: "Confirm scope",
    text: "Does this service monitor documents recorded in my name only, or can I also add my property's parcel number so I'm covered if someone records under a fake name?",
    note: "Parcel-based monitoring catches fraud that name-only monitoring might miss.",
  },
  {
    label: "Ask about testing",
    text: "Is there a way to test that the alerts are working -- a confirmation email, a test message, or a sample notification?",
    note: "If yes, verify the test arrives in your inbox (not spam) before you hang up.",
  },
  {
    label: "Get contact info for follow-up",
    text: "If I ever get an alert and I'm not sure whether it's legitimate, what's the best number to call for help? Is there a dedicated fraud unit?",
    note: "Write down the direct number -- not the general switchboard.",
  },
  {
    label: "If they say no program exists",
    text: "Is there any way to monitor my property for recorded documents? Does the state offer anything? And is there someone I can contact about requesting this service for our county?",
    note: "Follow up with your state representative. Several states have passed laws requiring this.",
  },
];

/* ------------------------------------------------------------------ */
/*  Single script line                                                 */
/* ------------------------------------------------------------------ */

function CallScriptLine({
  label,
  text,
  note,
  isLast,
}: ScriptLine & { isLast: boolean }) {
  return (
    <div className={`pb-3.5 mb-3.5 ${isLast ? "" : "border-b border-dashed border-gray-200"}`}>
      <div className="text-[11px] font-bold text-alta-navy tracking-wide uppercase mb-1.5">
        {label}
      </div>
      <div className="text-[15px] text-gray-800 italic leading-relaxed pl-3.5 border-l-[3px] border-alta-gold mb-2">
        &ldquo;{text}&rdquo;
      </div>
      {note && (
        <div className="text-[13px] text-gray-500 leading-snug pl-3.5">
          <strong className="text-gray-600">Note:</strong> {note}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CallScript() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 my-4 print:bg-white print:border-gray-400">
      <div className="text-[11px] font-bold text-alta-navy tracking-wide uppercase mb-3">
        Phone Script -- Property Fraud Alert Enrollment
      </div>

      {SCRIPT_LINES.map((line, i) => (
        <CallScriptLine
          key={line.label}
          label={line.label}
          text={line.text}
          note={line.note}
          isLast={i === SCRIPT_LINES.length - 1}
        />
      ))}
    </div>
  );
}
