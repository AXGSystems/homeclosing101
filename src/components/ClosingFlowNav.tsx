import Link from "next/link";

const flowSteps = [
  { name: "What to Expect", href: "/closing-process/what-to-expect" },
  { name: "Closing Options", href: "/closing-process/closing-options" },
  { name: "Closing Checklist", href: "/closing-process/closing-checklist" },
  { name: "Closing Costs", href: "/closing-process/closing-costs" },
];

export default function ClosingFlowNav({ currentStep }: { currentStep: number }) {
  const prev = currentStep > 1 ? flowSteps[currentStep - 2] : null;
  const next = currentStep < 4 ? flowSteps[currentStep] : null;

  return (
    <div className="flex items-center justify-between mt-10 mb-4 p-4 bg-gradient-to-r from-alta-light to-white rounded-2xl border border-gray-100">
      {/* Previous */}
      {prev ? (
        <Link href={prev.href} className="flex items-center gap-2 text-sm text-alta-gray hover:text-alta-teal transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>{prev.name}</span>
        </Link>
      ) : (
        <span className="flex items-center gap-2 text-sm text-gray-300 cursor-default">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>Previous</span>
        </span>
      )}

      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              n === currentStep ? "bg-alta-teal scale-125" : "bg-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-alta-gray ml-2">Step {currentStep} of 4</span>
      </div>

      {/* Next */}
      {next ? (
        <Link href={next.href} className="flex items-center gap-2 text-sm font-semibold text-alta-teal hover:text-alta-navy transition-colors group">
          <span>{next.name}</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </Link>
      ) : (
        <span className="flex items-center gap-2 text-sm text-gray-300 cursor-default">
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </span>
      )}
    </div>
  );
}
