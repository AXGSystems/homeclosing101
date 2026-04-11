"use client";

import { useState } from "react";

const risks = [
  { risk: "Someone else owns an interest in your title", example: "A previous owner's ex-spouse claims they never signed away their ownership interest in a divorce. Your title insurance pays for the legal defense and covers any loss.", detail: "This is one of the most common title claims. Ownership interests can arise from marriages, divorces, business partnerships, inheritance disputes, and improperly executed transfers. Title insurance covers the legal costs to defend your ownership — which can exceed $50,000 even for baseless claims — and pays any covered loss up to your policy amount." },
  { risk: "A document in the chain of title is forged or improperly executed", example: "A deed from 1998 was forged by someone impersonating the actual owner. Even though you bought in good faith, the fraud could void your ownership.", detail: "Forgery and fraud in the chain of title are more common than most buyers realize. This includes forged signatures, documents signed under duress, documents signed by minors or mentally incapacitated persons, and identity theft. Title insurance protects you even when the fraud occurred decades before your purchase and was undetectable during the title search." },
  { risk: "A document was not properly recorded or indexed", example: "A mortgage release was filed but never indexed by the county. The old lender's lien still appears on record.", detail: "County recorder offices handle millions of documents. Clerical errors — misfiled documents, incorrect indexing, data entry mistakes — can create clouds on your title that may not surface until you try to sell or refinance. Your title insurance company works to resolve these issues and covers any resulting loss." },
  { risk: "Title defects that prevent you from selling", example: "When you try to sell, the buyer's title search reveals an old judgment that makes your title 'unmarketable.'", detail: "Unmarketable title means a reasonable buyer would refuse to accept it due to known defects. This can effectively trap you in the property — unable to sell until the defect is resolved. Title insurance covers the cost of clearing the defect, or compensates you for loss of value if it can't be cleared." },
  { risk: "Someone has an undisclosed easement on your property", example: "A utility company has a recorded easement allowing them to dig across your backyard — but nobody told you when you bought.", detail: "Easements can significantly affect how you use your property and may reduce its value. Common undisclosed easements include utility access, drainage rights, shared driveways, and conservation restrictions. While the title search aims to find these, some may be missed or improperly recorded. Title insurance covers the loss of value or use." },
  { risk: "Zoning violations by a prior owner", example: "The previous owner converted the garage into a rental unit without permits. The city demands you restore it.", detail: "If a previous owner made changes that violate zoning laws, building codes, or CC&Rs, you could inherit the liability. Title insurance covers losses resulting from pre-existing violations that weren't disclosed — including the cost of restoring the property to compliance." },
  { risk: "Unknown liens on your property", example: "A contractor who did work for the previous owner files a mechanic's lien for unpaid work.", detail: "Liens can arise from unpaid contractors, delinquent taxes, HOA dues, child support, judgments, and federal tax obligations. While the title search aims to find all liens, some may be filed after the search date or in jurisdictions not typically checked. Title insurance defends you against these claims and pays covered liens." },
  { risk: "Lack of legal access to your property", example: "After closing, you discover your driveway crosses a neighbor's property and they demand you stop using it.", detail: "Legal access to your property is fundamental to its value and use. If your only access route crosses someone else's land without a recorded easement, you could lose the ability to reach your home. Title insurance covers the cost of establishing legal access — through negotiation, purchasing an easement, or legal action." },
];

export default function ExpandableRiskTiles() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-3 mb-10">
        {risks.map((item, i) => (
          <div
            key={i}
            onClick={() => setExpandedIdx(i)}
            className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm tile-interactive cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#e9f5ed] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2d6b3f] transition-colors">
                <svg className="w-4 h-4 text-[#2d6b3f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-alta-navy mb-1">{item.risk}</p>
                <p className="text-xs text-alta-gray leading-relaxed"><strong className="text-alta-navy">Example:</strong> {item.example}</p>
                <p className="text-[10px] text-alta-teal mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Click for more details</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {expandedIdx !== null && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => setExpandedIdx(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto animate-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setExpandedIdx(null)} className="absolute top-3 right-3 p-1.5 text-alta-gray hover:text-alta-navy bg-white/80 rounded-full z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="bg-gradient-to-r from-[#2d6b3f] to-[#235532] px-6 py-4 rounded-t-2xl">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Covered Risk</span>
              </div>
              <h3 className="text-white font-bold pr-8">{risks[expandedIdx].risk}</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] font-semibold text-alta-teal uppercase tracking-wider mb-1">Real-World Example</p>
                <p className="text-sm text-alta-gray leading-relaxed">{risks[expandedIdx].example}</p>
              </div>
              <div className="p-4 bg-[#e9f5ed] rounded-xl border border-[#bddcc7]">
                <p className="text-[10px] font-semibold text-[#2d6b3f] uppercase tracking-wider mb-1">How Title Insurance Protects You</p>
                <p className="text-sm text-alta-gray leading-relaxed">{risks[expandedIdx].detail}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
