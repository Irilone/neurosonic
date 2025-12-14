// src/components/phases/ResultsPhase.tsx
'use client';

import { useEffect } from 'react';
import { useExperimentStore } from '@/lib/experimentStore'; 

export function ResultsPhase() {
  const { assignedCondition, preTaskStress, postTaskStress, readingTime, quizScore, sessionId } = useExperimentStore();
  const reset = useExperimentStore((state) => state.reset);
  
  // Calculate results on the fly for display
  const stressDelta = preTaskStress - postTaskStress; // Positive = recovery
  const ces = parseFloat(((quizScore / (readingTime || 1)) * 100).toFixed(2));

  // Log data to console (or send to backend)
  useEffect(() => {
    console.log("--- TRIAL DATA ---");
    console.table({
      sessionId,
      condition: assignedCondition,
      preTaskStress,
      postTaskStress,
      stressDelta,
      readingTime,
      quizScore,
      ces,
      timestamp: new Date().toISOString(),
    });
  }, [sessionId, assignedCondition, preTaskStress, postTaskStress, stressDelta, readingTime, quizScore, ces]);
  
  const downloadCSV = () => {
    const headers = ['SessionID', 'Condition', 'PreStress', 'PostStress', 'StressDelta', 'ReadingTime', 'QuizScore', 'CES', 'Timestamp'];
    const row = [
      sessionId,
      assignedCondition,
      preTaskStress,
      postTaskStress,
      stressDelta,
      readingTime,
      quizScore,
      ces,
      new Date().toISOString()
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + row.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `neurosonic_trial_${sessionId}.csv`);
    document.body.appendChild(link);
    link.click();
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl w-full p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm text-center">
        <h2 className="text-3xl font-bold text-white mb-6 font-heading">Experiment Results</h2>
        <p className="text-slate-400 mb-8">Here's a summary of your performance and stress changes.</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
            <ResultCard label="Condition" value={assignedCondition} color="text-white" />
            <ResultCard label="Reading Time" value={`${readingTime.toFixed(1)}s`} color="text-indigo-400" />
            <ResultCard label="Stress Delta" value={stressDelta > 0 ? `+${stressDelta}` : `${stressDelta}`} color={stressDelta > 0 ? "text-teal-400" : "text-rose-400"} sub="Positive = Recovery" />
            <ResultCard label="CES Score" value={ces} color="text-yellow-400" sub="Cognitive Efficiency" />
        </div>

        <div className="flex gap-4">
            <button onClick={downloadCSV} className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition">
                Download Data (CSV)
            </button>
            <button onClick={() => reset()} className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition">
                Start New Experiment
            </button>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, color, sub }: { label: string, value: string | number, color: string, sub?: string }) {
    return (
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{label}</div>
        <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
        {sub && <div className="text-[10px] text-slate-600 mt-1">{sub}</div>}
      </div>
    );
  }
