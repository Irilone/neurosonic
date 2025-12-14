'use client';

import { useState } from 'react';
import { READING_PASSAGES } from '../../readingPassages'; // Corrected import path

interface QuizProps {
  onComplete: (score: number) => void;
}

export function Quiz({ onComplete }: QuizProps) {
  // Hardcoded to first passage for MVP, can be dynamic
  const passage = READING_PASSAGES[0];
  const [answers, setAnswers] = useState<number[]>(new Array(passage.questions.length).fill(-1));

  const handleSubmit = () => {
    let score = 0;
    passage.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) score += 1;
    });
    onComplete(score);
  };

  const isComplete = answers.every(a => a !== -1);

  return (
    <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6">Comprehension Verification</h3>
        
        <div className="space-y-8">
          {passage.questions.map((q, qIdx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-slate-300 font-medium">{qIdx + 1}. {q.text}</p>
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      const newAnswers = [...answers];
                      newAnswers[qIdx] = oIdx;
                      setAnswers(newAnswers);
                    }}
                    className={`
                      text-left px-4 py-3 rounded-lg text-sm transition-all
                      ${answers[qIdx] === oIdx 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        className="w-full py-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
      >
        SUBMIT ASSESSMENT
      </button>
    </div>
  );
}
