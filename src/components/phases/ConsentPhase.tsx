// src/components/phases/ConsentPhase.tsx
'use client';
import { useState } from 'react';
import { useExperimentStore } from '@/lib/experimentStore';

export function ConsentPhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4">Informed Consent</h2>
        <div className="text-slate-400 text-sm leading-relaxed mb-6 h-64 overflow-y-auto custom-scrollbar pr-4">
          <p className="mb-4">
            Welcome to the NeuroSonic experiment. Your participation is entirely voluntary and you can withdraw at any time without penalty.
            The study involves listening to various audio stimuli while performing a reading comprehension task and rating your stress levels.
          </p>
          <p className="mb-4">
            All data collected will be anonymized and used for research purposes only. No personally identifiable information will be stored.
            The experiment is expected to take approximately 10-15 minutes.
          </p>
          <p className="mb-4">
            By proceeding, you confirm that you are at least 18 years old and understand the nature of the study.
          </p>
          <p>
            For any questions, please contact the research team.
          </p>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="consent-checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label htmlFor="consent-checkbox" className="ml-2 block text-sm text-slate-300">
            I have read and agree to the terms of participation.
          </label>
        </div>
        <button
          onClick={() => setPhase('demographics')}
          disabled={!agreed}
          className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
        >
          Proceed to Demographics
        </button>
      </div>
    </div>
  );
}
