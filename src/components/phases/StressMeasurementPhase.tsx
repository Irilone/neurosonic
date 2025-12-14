// src/components/phases/StressMeasurementPhase.tsx
'use client';

import { useEffect, useState } from 'react';
import { StressScale } from '../StressScale'; 
import { useExperimentStore } from '@/lib/experimentStore'; 

export function StressMeasurementPhase({ timepoint, title, instruction, nextPhase, showConditionInfo = false }: { timepoint: string, title: string, instruction: string, nextPhase: string, showConditionInfo?: boolean }) {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const assignedCondition = useExperimentStore((state) => state.assignedCondition);
  const preTaskStress = useExperimentStore((state) => state.preTaskStress);
  const postTaskStress = useExperimentStore((state) => state.postTaskStress);
  const setPreTaskStress = useExperimentStore((state) => state.setPreTaskStress);
  const setPostTaskStress = useExperimentStore((state) => state.setPostTaskStress);

  const [currentStress, setCurrentStress] = useState(5);

  useEffect(() => {
    if (timepoint === 'baseline' || timepoint === 'pre-task') setCurrentStress(preTaskStress);
    if (timepoint === 'post-task') setCurrentStress(postTaskStress);
  }, [timepoint, preTaskStress, postTaskStress]);

  const handleSubmit = () => {
    if (timepoint === 'baseline' || timepoint === 'pre-task') {
      setPreTaskStress(currentStress);
    } else if (timepoint === 'post-task') {
      setPostTaskStress(currentStress);
    }
    setPhase(nextPhase);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <StressScale value={currentStress} onChange={setCurrentStress} label={title} />
      <p className="text-slate-400 mt-6 mb-8 text-center">{instruction}</p>
      {showConditionInfo && (
        <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-3 text-blue-400 text-sm mb-6">
          Your assigned condition for the next task is: <strong>{assignedCondition}</strong>
        </div>
      )}
      <button onClick={handleSubmit} className="w-full max-w-xs py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition">
        CONFIRM & CONTINUE
      </button>
    </div>
  );
}
