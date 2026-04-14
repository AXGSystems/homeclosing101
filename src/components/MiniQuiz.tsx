"use client";

import { useState } from "react";

interface Question {
  q: string;
  choices: string[];
  answer: number;
  explanation: string;
}

interface MiniQuizProps {
  title?: string;
  questions: Question[];
}

export default function MiniQuiz({ title = "Test Your Knowledge", questions }: MiniQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[current];

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-8 mb-2 rounded-2xl border border-alta-teal/20 bg-gradient-to-br from-alta-teal/5 to-alta-navy/5 p-5 print:hidden">
        <h3 className="text-sm font-bold text-alta-navy mb-3">{title} — Results</h3>
        <div className="text-center py-4">
          <div className="text-3xl font-extrabold text-alta-teal mb-1">{score}/{questions.length}</div>
          <p className="text-xs text-alta-gray mb-3">
            {pct === 100 ? "Perfect score! You really know your stuff." : pct >= 66 ? "Great job! You have a solid understanding." : "Keep learning — review the sections above and try again."}
          </p>
          <button
            onClick={handleRestart}
            className="text-xs font-semibold text-white bg-alta-teal hover:bg-alta-teal/90 px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-2 rounded-2xl border border-alta-teal/20 bg-gradient-to-br from-alta-teal/5 to-alta-navy/5 p-5 print:hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-alta-navy">{title}</h3>
        <span className="text-[10px] font-medium text-alta-gray bg-white/60 px-2 py-0.5 rounded-full">
          {current + 1} of {questions.length}
        </span>
      </div>

      <p className="text-[13px] font-semibold text-alta-navy mb-3 leading-snug">{question.q}</p>

      <div className="space-y-2">
        {question.choices.map((choice, idx) => {
          let cls = "w-full text-left text-xs px-3 py-2.5 rounded-xl border transition-all ";
          if (!answered) {
            cls += "border-gray-200 bg-white hover:border-alta-teal/40 hover:bg-alta-teal/5 text-alta-navy cursor-pointer";
          } else if (idx === question.answer) {
            cls += "border-emerald-400 bg-emerald-50 text-emerald-800 font-medium";
          } else if (idx === selected) {
            cls += "border-red-300 bg-red-50 text-red-700";
          } else {
            cls += "border-gray-100 bg-gray-50 text-alta-gray";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
              <span className="font-semibold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
              {choice}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-3 text-[11px] text-alta-gray bg-white/70 rounded-xl px-3 py-2 border border-gray-100 leading-relaxed">
          {selected === question.answer ? (
            <span className="text-emerald-700 font-semibold">Correct! </span>
          ) : (
            <span className="text-red-600 font-semibold">Not quite. </span>
          )}
          {question.explanation}
        </div>
      )}

      {answered && (
        <div className="mt-3 text-right">
          <button
            onClick={handleNext}
            className="text-xs font-semibold text-white bg-alta-teal hover:bg-alta-teal/90 px-4 py-2 rounded-lg transition-colors"
          >
            {current + 1 >= questions.length ? "See Results" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
