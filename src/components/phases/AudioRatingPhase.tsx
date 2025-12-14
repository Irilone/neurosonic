// src/components/phases/AudioRatingPhase.tsx
'use client';

import { useState } from 'react';
import { useExperimentStore } from '@/lib/experimentStore';
import { AudioMode } from '@/hooks/useNeuroSonic';

export function AudioRatingPhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const assignedCondition = useExperimentStore((state) => state.assignedCondition);
  const [rating, setRating] = useState(5); // 1-10 scale

  const handleSubmit = () => {
    // Save rating to store/DB
    setPhase('results');
  };

  // This phase should only show for non-SILENCE conditions
  if (assignedCondition === 'SILENCE') {
    // We can't synchronously update state in render like this usually, but for this simple flow it might work
    // Better to use useEffect
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => setPhase('results')} className="btn-primary">
          Continue to Results
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Audio Experience Rating</h2>
        <p className="text-slate-400 leading-relaxed mb-6">
          On a scale of 1-10, how would you rate your experience with the audio presented during the task?
        </p>
        
        <div className="flex justify-between text-xs uppercase text-slate-500 font-mono tracking-widest mb-4 px-2">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
        </div>
        <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
        />
        <div className="mt-8 text-center">
            <span className="text-6xl font-bold text-white font-mono">{rating}</span>
            <span className="text-slate-500 ml-2 text-xl">/ 10</span>
        </div>

        <button onClick={handleSubmit} className="w-full mt-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition">
          Submit Rating & View Results
        </button>
      </div>
    </div>
  );
}
