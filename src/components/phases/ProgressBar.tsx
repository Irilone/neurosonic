// src/components/phases/ProgressBar.tsx
'use client';
import { useExperimentStore } from '@/lib/experimentStore'; 

export function ProgressBar({ currentPhase }: { currentPhase: string }) {
    const phases = [
      { id: 'welcome', label: 'Start' },
      { id: 'consent', label: 'Consent' },
      { id: 'demographics', label: 'Profile' },
      { id: 'headphone-validation', label: 'Setup' },
      { id: 'baseline-stress', label: 'Baseline' },
      { id: 'reading-task', label: 'Task' },
      { id: 'post-task-stress', label: 'Measure' },
      { id: 'results', label: 'Results' },
    ];
  
    // Map internal states to the visible progress bar steps
    let currentIndex = phases.findIndex((p) => p.id === currentPhase);
    
    // Fallbacks for sub-states that aren't explicit top-level phases in the array
    if (currentPhase === 'pre-task-stress') currentIndex = phases.findIndex(p => p.id === 'baseline-stress') + 1;
    if (currentPhase === 'audio-rating') currentIndex = phases.findIndex(p => p.id === 'post-task-stress') + 1;
    if (currentPhase === 'debrief') currentIndex = phases.length - 1;

    if (currentPhase === 'welcome') return null; 
  
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className="flex items-center"
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                    ${
                      index < currentIndex
                        ? 'bg-teal-600 text-white'
                        : index === currentIndex
                        ? 'bg-teal-500 text-white ring-2 ring-teal-300'
                        : 'bg-slate-700 text-slate-400'
                    }
                  `}
                >
                  {index < currentIndex ? '✓' : index + 1}
                </div>
                
                <span
                  className={`
                    hidden md:block ml-2 text-xs
                    ${index <= currentIndex ? 'text-slate-200' : 'text-slate-500'}
                  `}
                >
                  {phase.label}
                </span>
                
                {index < phases.length - 1 && (
                  <div
                    className={`
                      w-4 md:w-8 h-0.5 mx-2
                      ${index < currentIndex ? 'bg-teal-600' : 'bg-slate-700'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
