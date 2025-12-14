'use client';

import { useExperimentStore } from '@/lib/experimentStore';

export function WelcomePhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const initSession = useExperimentStore((state) => state.initSession);

  const handleBegin = () => {
    initSession(); 
    setPhase('consent');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl text-center p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-white mb-4 font-heading">Welcome to NeuroSonic Experiment</h2>
        <p className="text-slate-400 leading-relaxed mb-6">
          This study investigates the impact of sound on cognitive efficiency and stress recovery.
          Your participation is valuable and helps advance psychoacoustic research.
        </p>
        <button onClick={handleBegin} className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition shadow-lg shadow-teal-900/20">
          Begin Experiment
        </button>
      </div>
    </div>
  );
}
