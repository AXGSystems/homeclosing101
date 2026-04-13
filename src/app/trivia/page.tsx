"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FirstTimeBuyerCTA from "@/components/FirstTimeBuyerCTA";

/* ═══════════════════════════════════════════════════════
   CONFETTI SYSTEM
   ═══════════════════════════════════════════════════════ */
function Confetti() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; rotation: number; scale: number; dx: number; dy: number; dr: number }[]>([]);

  useEffect(() => {
    const colors = ["#0a7ea8", "#2d6b3f", "#5b3a8c", "#8b6914", "#943030", "#d4a843", "#1a5276", "#ff6b6b", "#ffd93d", "#6bcb77"];
    const newParticles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      dx: (Math.random() - 0.5) * 2,
      dy: 1.5 + Math.random() * 3,
      dr: (Math.random() - 0.5) * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[800] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            transform: `scale(${p.scale})`,
            animation: `confettiFall ${3 + Math.random() * 4}s linear forwards`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(-20vh) rotate(0deg); }
          100% { opacity: 0; transform: translateY(110vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   QUESTION DATA — ALL VERIFIED FACTS
   ═══════════════════════════════════════════════════════ */
interface Question {
  q: string;
  choices: string[];
  answer: number; // index of correct choice
  explanation: string;
}

interface Category {
  name: string;
  color: string;
  gradient: string;
  icon: string;
  questions: Question[]; // 5 questions, indexed by value tier
}

const categories: Category[] = [
  {
    name: "Title Insurance",
    color: "#2d6b3f",
    gradient: "from-[#2d6b3f] to-[#1a5276]",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    questions: [
      { q: "Title insurance protects against events that happened in the ___.", choices: ["Future", "Past", "Present", "Next year"], answer: 1, explanation: "Title insurance protects against PAST events — liens, forgery, undisclosed heirs, and recording errors that occurred before you purchased the property." },
      { q: "According to ALTA, title searches reveal issues in approximately how many residential transactions?", choices: ["1 in 10", "1 in 5", "1 in 3", "1 in 2"], answer: 2, explanation: "ALTA reports that title professionals find and resolve issues in approximately 1 out of every 3 residential real estate transactions." },
      { q: "An owner's title insurance policy is paid how?", choices: ["Monthly premiums", "Annual premiums", "One-time fee at closing", "Bi-annual premiums"], answer: 2, explanation: "Owner's title insurance is a one-time premium paid at closing. It covers you and your heirs for as long as you own the property — no renewal needed." },
      { q: "Which federal law gives homebuyers the right to choose their own title company?", choices: ["TILA", "RESPA", "Dodd-Frank", "Fair Housing Act"], answer: 1, explanation: "The Real Estate Settlement Procedures Act (RESPA) gives homebuyers the legal right to select their own title insurance company and settlement services provider." },
      { q: "The ALTA Best Practices framework has how many pillars?", choices: ["3", "5", "7", "10"], answer: 2, explanation: "ALTA Best Practices has 7 pillars: Licensing, Escrow Controls, Privacy & Security, Settlement Procedures, Title Policy Production, Professional Liability, and Consumer Complaints." },
    ],
  },
  {
    name: "Closing Process",
    color: "#1a5276",
    gradient: "from-[#1a5276] to-[#0a7ea8]",
    icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
    questions: [
      { q: "Your lender must provide the Closing Disclosure at least ___ business days before closing.", choices: ["1", "2", "3", "5"], answer: 2, explanation: "Under CFPB rules (TRID), the lender must provide the Closing Disclosure at least 3 business days before closing so you have time to review it." },
      { q: "What is the typical range of closing costs as a percentage of the purchase price?", choices: ["0.5–1%", "2–5%", "6–10%", "10–15%"], answer: 1, explanation: "Closing costs typically run 2–5% of the purchase price. On a $400,000 home, that's $8,000–$20,000." },
      { q: "What does 'clear to close' mean?", choices: ["The house is empty", "The inspection passed", "The lender has fully approved the loan", "The title is clean"], answer: 2, explanation: "'Clear to close' is the lender's formal confirmation that all underwriting conditions have been met and they are ready to fund your mortgage loan." },
      { q: "At the closing table, you'll typically sign how many pages of documents?", choices: ["10–20", "25–40", "50–100+", "200+"], answer: 2, explanation: "At closing you'll sign 50–100+ pages of documents including the promissory note, deed of trust, closing disclosure, and various affidavits and disclosures." },
      { q: "What is the document that legally transfers ownership of property from seller to buyer?", choices: ["Promissory note", "Deed", "Mortgage", "Closing Disclosure"], answer: 1, explanation: "The deed is the legal document that conveys (transfers) title to real property from the seller to the buyer. It is recorded with the county after closing." },
    ],
  },
  {
    name: "Wire Fraud",
    color: "#943030",
    gradient: "from-[#943030] to-[#7a2020]",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
    questions: [
      { q: "According to FBI IC3, how much was lost to real estate wire fraud in 2025?", choices: ["$50 million", "$150 million", "$275 million", "$500 million"], answer: 2, explanation: "The FBI's Internet Crime Complaint Center (IC3) reported $275.1 million in real estate wire fraud losses in 2025 — a 59% year-over-year increase." },
      { q: "What is the #1 way to verify wiring instructions?", choices: ["Reply to the email", "Text your agent", "Call using a known phone number", "Check social media"], answer: 2, explanation: "Always verify wiring instructions by calling a phone number you already have (from a business card or previous communication) — never use a number provided in the email." },
      { q: "If you report wire fraud within 1 hour, the recovery rate is approximately:", choices: ["5%", "10%", "20%", "50%"], answer: 2, explanation: "Recovery rates drop dramatically over time: approximately 20% if reported within 1 hour, 10% within 24 hours, and less than 5% after 48 hours." },
      { q: "What does BEC stand for in real estate fraud?", choices: ["Basic Email Corruption", "Business Email Compromise", "Bank Electronic Crime", "Buyer Escrow Confusion"], answer: 1, explanation: "Business Email Compromise (BEC) is the primary method criminals use to intercept real estate wire transfers — they hack or spoof email accounts of real estate professionals." },
      { q: "Which ALTA Best Practices pillar specifically addresses wire fraud prevention?", choices: ["Pillar 1 – Licensing", "Pillar 2 – Escrow", "Pillar 3 – Privacy & Security", "Pillar 7 – Complaints"], answer: 2, explanation: "Pillar 3 (Privacy & Information Security) was updated to specifically address AI-powered wire fraud, deepfake threats, and wire verification procedures." },
    ],
  },
  {
    name: "Mortgage Basics",
    color: "#5b3a8c",
    gradient: "from-[#5b3a8c] to-[#1a5276]",
    icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    questions: [
      { q: "What is the minimum down payment for an FHA loan?", choices: ["0%", "3%", "3.5%", "5%"], answer: 2, explanation: "FHA loans require a minimum 3.5% down payment with a credit score of 580 or higher. Borrowers with scores of 500–579 need 10% down." },
      { q: "DTI stands for:", choices: ["Down-payment Tax Index", "Debt-to-Income ratio", "Direct Title Insurance", "Deferred Transaction Interest"], answer: 1, explanation: "Debt-to-Income (DTI) ratio is the percentage of your gross monthly income that goes toward debt payments. Most lenders want total DTI below 43%." },
      { q: "Which loan type requires NO down payment and NO monthly mortgage insurance?", choices: ["FHA", "Conventional", "VA", "USDA"], answer: 2, explanation: "VA loans (for eligible veterans and active-duty military) require 0% down payment and have no monthly mortgage insurance. A one-time funding fee replaces it." },
      { q: "PMI can typically be removed from a conventional loan once you reach what equity level?", choices: ["10%", "15%", "20%", "25%"], answer: 2, explanation: "Private Mortgage Insurance (PMI) on conventional loans can be removed once you reach 20% equity in your home — either through payments or appreciation." },
      { q: "The Loan Estimate must be provided within how many business days of your application?", choices: ["1", "3", "5", "7"], answer: 1, explanation: "Under CFPB rules, your lender must provide a Loan Estimate within 3 business days of receiving your complete mortgage application." },
    ],
  },
  {
    name: "Know Your Rights",
    color: "#8b6914",
    gradient: "from-[#8b6914] to-[#1a5276]",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
    questions: [
      { q: "Under RESPA, can your lender force you to use a specific title company?", choices: ["Yes, always", "Only in certain states", "No — you have the right to choose", "Only for refinances"], answer: 2, explanation: "RESPA gives you the legal right to choose your own title company. Your lender or agent may recommend one, but you are NOT obligated to use them." },
      { q: "The CFPB's 'Know Before You Owe' initiative standardized which two documents?", choices: ["Deed and mortgage", "Loan Estimate and Closing Disclosure", "Purchase agreement and title report", "Insurance binder and appraisal"], answer: 1, explanation: "The TRID rule under 'Know Before You Owe' created the standardized Loan Estimate (replaces GFE) and Closing Disclosure (replaces HUD-1)." },
      { q: "Remote Online Notarization (RON) is now available in how many states?", choices: ["10", "25", "35", "45+"], answer: 3, explanation: "As of 2026, 45 states and the District of Columbia have enacted permanent Remote Online Notarization legislation, driven by ALTA and MBA advocacy." },
      { q: "RESPA prohibits _____ between settlement service providers.", choices: ["Competition", "Kickbacks and referral fees", "Online marketing", "Price comparisons"], answer: 1, explanation: "RESPA Section 8 prohibits kickbacks and referral fees between settlement service providers. No one involved in your transaction can receive payment for referring you to a specific company." },
      { q: "How long does an owner's title insurance policy last?", choices: ["5 years", "10 years", "30 years", "As long as you or your heirs own the property"], answer: 3, explanation: "An owner's title insurance policy lasts for as long as you — or your heirs — own the property. One payment at closing, lifetime protection." },
    ],
  },
];

const pointValues = [200, 400, 600, 800, 1000];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function TriviaPage() {
  // Board state: track which cells have been answered
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  // Currently active question
  const [activeCell, setActiveCell] = useState<{ catIdx: number; qIdx: number } | null>(null);
  // Selected answer for current question
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // Whether current question has been submitted
  const [submitted, setSubmitted] = useState(false);
  // Score
  const [score, setScore] = useState(0);
  // Correct count
  const [correct, setCorrect] = useState(0);
  // Game over
  const [gameOver, setGameOver] = useState(false);
  // Show confetti
  const [showConfetti, setShowConfetti] = useState(false);

  const totalQuestions = categories.length * pointValues.length; // 25
  const maxScore = categories.reduce((sum, cat) => sum + cat.questions.reduce((s, _, i) => s + pointValues[i], 0), 0); // 15000

  const openCell = (catIdx: number, qIdx: number) => {
    const key = `${catIdx}-${qIdx}`;
    if (answered.has(key) || gameOver) return;
    setActiveCell({ catIdx, qIdx });
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  const submitAnswer = useCallback(() => {
    if (activeCell === null || selectedAnswer === null || submitted) return;
    const { catIdx, qIdx } = activeCell;
    const question = categories[catIdx].questions[qIdx];
    const isCorrect = selectedAnswer === question.answer;
    const points = pointValues[qIdx];

    setSubmitted(true);
    if (isCorrect) {
      setScore((s) => s + points);
      setCorrect((c) => c + 1);
    }

    const key = `${catIdx}-${qIdx}`;
    setAnswered((prev) => new Set(prev).add(key));
  }, [activeCell, selectedAnswer, submitted]);

  const closeQuestion = () => {
    setActiveCell(null);
    // Check if game is over
    if (answered.size + 1 >= totalQuestions) {
      setGameOver(true);
      setShowConfetti(true);
    }
  };

  const resetGame = () => {
    setAnswered(new Set());
    setActiveCell(null);
    setSelectedAnswer(null);
    setSubmitted(false);
    setScore(0);
    setCorrect(0);
    setGameOver(false);
    setShowConfetti(false);
  };

  const getGrade = () => {
    const pct = (correct / totalQuestions) * 100;
    if (pct >= 90) return { label: "Title Pro", color: "text-[#d4a843]", desc: "You're ready to close with confidence!" };
    if (pct >= 75) return { label: "Closing Expert", color: "text-[#2d6b3f]", desc: "Impressive knowledge of the closing process." };
    if (pct >= 60) return { label: "Homebuyer Ready", color: "text-[#0a7ea8]", desc: "Solid foundation — you're well-prepared." };
    if (pct >= 40) return { label: "Getting There", color: "text-[#5b3a8c]", desc: "Good start! Explore our guides to level up." };
    return { label: "Rookie Buyer", color: "text-[#943030]", desc: "No worries — HC101 has everything you need to learn." };
  };

  return (
    <>
      <PageHero
        title="HC101 Trivia Challenge"
        subtitle="Test your homebuying knowledge — Jeopardy style. Pick a category, choose your stakes, and see if you're ready to close."
        image="https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1920&q=80"
        breadcrumb={[{ label: "Resources", href: "/resources" }, { label: "Trivia", href: "/trivia" }]}
      />

      {showConfetti && <Confetti />}

      <div className="py-1.5 lg:py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Scoreboard */}
          <div className="mb-6 p-4 bg-gradient-to-r from-alta-navy to-[#0d3a5c] rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Score</p>
                <p className="text-3xl font-bold text-[#d4a843]">${score.toLocaleString()}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Correct</p>
                <p className="text-xl font-bold text-white">{correct}/{answered.size}</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Remaining</p>
                <p className="text-xl font-bold text-white">{totalQuestions - answered.size}</p>
              </div>
            </div>
            <button onClick={resetGame} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors">
              Reset Game
            </button>
          </div>

          {/* ══ GAME OVER SCREEN ══ */}
          {gameOver && (
            <div className="mb-10 p-8 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 shadow-lg text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a843] to-[#8b6914] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.52.952m0 0a6.003 6.003 0 01-2.52-.952" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-alta-navy mb-1">Game Over!</h2>
              <p className={`text-2xl font-bold ${getGrade().color} mb-2`}>{getGrade().label}</p>
              <p className="text-sm text-alta-gray mb-6">{getGrade().desc}</p>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-2xl font-bold text-[#d4a843]">${score.toLocaleString()}</p>
                  <p className="text-[10px] text-alta-gray">Final Score</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-2xl font-bold text-[#2d6b3f]">{correct}/{totalQuestions}</p>
                  <p className="text-[10px] text-alta-gray">Correct</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-2xl font-bold text-[#0a7ea8]">{Math.round((correct / totalQuestions) * 100)}%</p>
                  <p className="text-[10px] text-alta-gray">Accuracy</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={resetGame} className="px-6 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors">
                  Play Again
                </button>
                <Link href="/first-time-buyers" className="px-6 py-3 border-2 border-alta-teal text-alta-teal font-semibold rounded-lg hover:bg-alta-teal hover:text-white transition-colors">
                  First-Time Buyer Guide
                </Link>
              </div>
            </div>
          )}

          {/* ══ JEOPARDY BOARD ══ */}
          {!gameOver && (
            <div className="overflow-x-auto mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="min-w-[700px]">
                {/* Category headers */}
                <div className="grid grid-cols-5 gap-2 mb-2">
                  {categories.map((cat) => (
                    <div key={cat.name} className={`bg-gradient-to-b ${cat.gradient} rounded-xl p-3 text-center`}>
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-1.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} /></svg>
                      </div>
                      <p className="text-[11px] font-bold text-white leading-tight">{cat.name}</p>
                    </div>
                  ))}
                </div>
                {/* Question grid */}
                {pointValues.map((val, qIdx) => (
                  <div key={val} className="grid grid-cols-5 gap-2 mb-2">
                    {categories.map((cat, catIdx) => {
                      const key = `${catIdx}-${qIdx}`;
                      const isAnswered = answered.has(key);
                      return (
                        <button
                          key={key}
                          onClick={() => openCell(catIdx, qIdx)}
                          disabled={isAnswered}
                          className={`relative rounded-xl p-4 font-bold text-xl transition-all duration-200 ${
                            isAnswered
                              ? "bg-gray-100 text-gray-300 cursor-default"
                              : "bg-[#1a1a3e] text-[#d4a843] hover:bg-[#2a2a5e] hover:scale-[1.03] cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
                          }`}
                        >
                          {isAnswered ? (
                            <svg className="w-5 h-5 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                          ) : (
                            `$${val}`
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ QUESTION MODAL ══ */}
          {activeCell && (
            <div className="fixed inset-0 z-[700] flex items-center justify-center p-4" onClick={() => { if (submitted) closeQuestion(); }}>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={`bg-gradient-to-r ${categories[activeCell.catIdx].gradient} px-6 py-4 rounded-t-2xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/60 font-medium">{categories[activeCell.catIdx].name}</p>
                      <p className="text-2xl font-bold text-[#d4a843]">${pointValues[activeCell.qIdx]}</p>
                    </div>
                    {submitted && (
                      <button onClick={closeQuestion} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Question */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-alta-navy mb-5 leading-relaxed">
                    {categories[activeCell.catIdx].questions[activeCell.qIdx].q}
                  </h3>

                  {/* Choices */}
                  <div className="space-y-3 mb-6">
                    {categories[activeCell.catIdx].questions[activeCell.qIdx].choices.map((choice, idx) => {
                      const question = categories[activeCell.catIdx].questions[activeCell.qIdx];
                      const isSelected = selectedAnswer === idx;
                      const isCorrectAnswer = idx === question.answer;
                      let choiceClass = "bg-white border-gray-200 hover:border-alta-teal/50 hover:bg-alta-light/30";

                      if (submitted) {
                        if (isCorrectAnswer) {
                          choiceClass = "bg-[#e9f5ed] border-[#2d6b3f] ring-2 ring-[#2d6b3f]/30";
                        } else if (isSelected && !isCorrectAnswer) {
                          choiceClass = "bg-[#f5e8e8] border-[#943030] ring-2 ring-[#943030]/30";
                        } else {
                          choiceClass = "bg-gray-50 border-gray-200 opacity-50";
                        }
                      } else if (isSelected) {
                        choiceClass = "bg-[#e6f1f5] border-[#0a7ea8] ring-2 ring-[#0a7ea8]/30";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => { if (!submitted) setSelectedAnswer(idx); }}
                          disabled={submitted}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${choiceClass}`}
                        >
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            submitted && isCorrectAnswer ? "bg-[#2d6b3f] text-white" :
                            submitted && isSelected && !isCorrectAnswer ? "bg-[#943030] text-white" :
                            isSelected ? "bg-[#0a7ea8] text-white" :
                            "bg-gray-100 text-alta-gray"
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className={`text-sm font-medium ${submitted && isCorrectAnswer ? "text-[#2d6b3f]" : submitted && isSelected && !isCorrectAnswer ? "text-[#943030]" : "text-alta-navy"}`}>
                            {choice}
                          </span>
                          {submitted && isCorrectAnswer && (
                            <svg className="w-5 h-5 text-[#2d6b3f] ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" /></svg>
                          )}
                          {submitted && isSelected && !isCorrectAnswer && (
                            <svg className="w-5 h-5 text-[#943030] ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Result */}
                  {!submitted ? (
                    <button
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                        selectedAnswer !== null
                          ? "bg-alta-teal text-white hover:bg-alta-teal-dark"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Lock In Answer
                    </button>
                  ) : (
                    <div>
                      <div className={`p-4 rounded-xl mb-4 ${
                        selectedAnswer === categories[activeCell.catIdx].questions[activeCell.qIdx].answer
                          ? "bg-[#e9f5ed] border border-[#bddcc7]"
                          : "bg-[#f5e8e8] border border-[#e4c5c5]"
                      }`}>
                        <p className={`text-sm font-bold mb-1 ${
                          selectedAnswer === categories[activeCell.catIdx].questions[activeCell.qIdx].answer ? "text-[#2d6b3f]" : "text-[#943030]"
                        }`}>
                          {selectedAnswer === categories[activeCell.catIdx].questions[activeCell.qIdx].answer
                            ? `Correct! +$${pointValues[activeCell.qIdx]}`
                            : "Incorrect"
                          }
                        </p>
                        <p className="text-xs text-alta-gray leading-relaxed">
                          {categories[activeCell.catIdx].questions[activeCell.qIdx].explanation}
                        </p>
                      </div>
                      <button
                        onClick={closeQuestion}
                        className="w-full py-3 bg-alta-navy text-white rounded-xl font-semibold text-sm hover:bg-alta-navy/90 transition-colors flex items-center justify-center gap-2"
                      >
                        {answered.size >= totalQuestions ? "See Final Score" : "Back to Board"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Gradient divider */}
          {!gameOver && answered.size === 0 && (
            <div className="h-px bg-gradient-to-r from-transparent via-alta-teal/30 to-transparent mb-8" />
          )}

          {/* How to play */}
          {!gameOver && answered.size === 0 && (
            <div className="p-5 bg-gradient-to-br from-alta-light to-white rounded-2xl border border-gray-100 mb-8">
              <h3 className="font-bold text-alta-navy mb-2">How to Play</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-xs text-alta-gray">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-alta-teal text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                  <p>Pick a category and dollar amount. Higher values = harder questions.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-alta-teal text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                  <p>Read the question, select your answer, and lock it in.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-alta-teal text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                  <p>Answer all 25 questions to get your final score and title!</p>
                </div>
              </div>
            </div>
          )}

          <FirstTimeBuyerCTA />
        </div>
      </div>
    </>
  );
}
