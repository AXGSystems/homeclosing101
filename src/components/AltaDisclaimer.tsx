"use client";

export default function AltaDisclaimer() {
  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 text-center">
        <p className="text-[11px] sm:text-[13px] text-[#b91c1c] leading-snug font-medium">
          <strong>Note:</strong> ALTA does not issue title insurance policies or have access to policies issued. For policy inquiries, please contact your settlement agent or <a href="/find-policy" className="underline underline-offset-2 hover:text-[#0a8ebc] transition-colors">state insurance department</a> directly.
        </p>
      </div>
    </div>
  );
}
