"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickEstimate() {
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = price.replace(/[^0-9]/g, "");
    if (cleaned) {
      router.push(`/mortgage-calculator?price=${cleaned}`);
    }
  };

  const formatPrice = (val: string) => {
    const digits = val.replace(/[^0-9]/g, "");
    if (!digits) return "";
    return Number(digits).toLocaleString("en-US");
  };

  return (
    <form onSubmit={handleSubmit} className="hidden lg:flex items-center gap-2 mt-6 max-w-sm mx-auto">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Home price"
          value={price}
          onChange={(e) => setPrice(formatPrice(e.target.value))}
          className="w-full pl-7 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 bg-alta-teal text-white text-sm font-semibold rounded-lg hover:bg-[#077a9e] transition-colors whitespace-nowrap"
      >
        Quick Estimate
      </button>
    </form>
  );
}
