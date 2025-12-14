// src/components/phases/ReadingTaskPhase.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useNeuroSonic } from '@/hooks/useNeuroSonic';
import { READING_PASSAGES } from '../../../readingPassages'; // Corrected import
import { Quiz } from '../Quiz'; // Correct import
import { useExperimentStore } from '@/lib/experimentStore'; 

export function ReadingTaskPhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const assignedCondition = useExperimentStore((state) => state.assignedCondition);
  const setReadingTime = useExperimentStore((state) => state.setReadingTime);
  const setQuizScore = useExperimentStore((state) => state.setQuizScore);

  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const startTimeRef = useRef<number>(0);

  // Use the first passage for now
  const READING_MATERIAL = READING_PASSAGES[0];

  const { audioContext, analyser } = useNeuroSonic({ mode: assignedCondition, isPlaying: !hasFinishedReading });

  useEffect(() => {
    if (!hasFinishedReading) {
      if (audioContext?.state === 'suspended') audioContext.resume();
      startTimeRef.current = Date.now();
    } else {
      const duration = (Date.now() - startTimeRef.current) / 1000;
      setReadingTime(duration);
    }
  }, [hasFinishedReading, audioContext, setReadingTime]);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setPhase('post-task-stress');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {!showQuiz ? (
        <div className="max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white font-heading">Reading Task</h3>
            <div className="text-sm font-mono text-slate-500">
              Condition: <span className="text-teal-400">{assignedCondition}</span>
            </div>
          </div>
          <div className="bg-slate-100 text-slate-900 p-8 rounded-xl shadow-2xl mb-8 leading-loose font-serif text-lg h-[50vh] overflow-y-auto custom-scrollbar border-4 border-slate-800">
            <h4 className="font-bold text-2xl mb-6 font-sans">{READING_MATERIAL.title}</h4>
            <div className="prose max-w-none">
              {READING_MATERIAL.content.split('\n\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
            </div>
          </div>
          <button 
            onClick={() => setHasFinishedReading(true)} 
            disabled={hasFinishedReading}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-lg shadow-rose-900/20 transition"
          >
            I HAVE FINISHED READING
          </button>
          {hasFinishedReading && (
            <button 
              onClick={() => setShowQuiz(true)}
              className="w-full mt-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition"
            >
              PROCEED TO QUIZ
            </button>
          )}
        </div>
      ) : (
        <Quiz onComplete={handleQuizComplete} />
      )}
    </div>
  );
}
