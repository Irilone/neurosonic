// src/components/phases/HeadphoneValidationPhase.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useNeuroSonic } from '@/hooks/useNeuroSonic';
import { useExperimentStore } from '@/lib/experimentStore'; 

export function HeadphoneValidationPhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const { audioContext } = useNeuroSonic({ mode: 'SILENCE', isPlaying: false });
  const [validationStep, setValidationStep] = useState(0); 
  const [correctlyIdentified, setCorrectlyIdentified] = useState(false);
  const pannerRef = useRef<PannerNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const startValidationTone = () => {
    if (!audioContext) return;
    if (audioContext.state === 'suspended') audioContext.resume();

    if (pannerRef.current) pannerRef.current.disconnect();
    if (oscillatorRef.current) oscillatorRef.current.stop();

    const osc = audioContext.createOscillator();
    osc.frequency.setValueAtTime(440, audioContext.currentTime); 
    osc.type = 'sine';

    const panner = audioContext.createPanner();
    panner.panningModel = 'HRTF'; 
    panner.distanceModel = 'linear';
    panner.positionX.setValueAtTime(-1, audioContext.currentTime); 

    osc.connect(panner).connect(audioContext.destination);
    osc.start();

    pannerRef.current = panner;
    oscillatorRef.current = osc;

    panner.positionX.linearRampToValueAtTime(1, audioContext.currentTime + 3);

    osc.stop(audioContext.currentTime + 3);
    osc.onended = () => {
      setValidationStep(2); 
      osc.disconnect();
      panner.disconnect();
    };

    setValidationStep(1); 
  };

  const handleQuizAnswer = (answer: 'left' | 'right' | 'center') => {
    if (answer === 'right') { 
      setCorrectlyIdentified(true);
    }
  };

  const handleContinue = () => {
    setPhase('baseline-stress');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Headphone Validation</h2>
        <p className="text-slate-400 leading-relaxed mb-6">
          We need to ensure your headphones are working correctly for the experiment.
          You will hear a sound move from left to right.
        </p>

        {validationStep === 0 && (
          <button onClick={startValidationTone} className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition">
            Start Headphone Check
          </button>
        )}
        {validationStep === 1 && (
          <p className="text-teal-400 font-bold animate-pulse">Listening... (Sound moving)</p>
        )}
        {validationStep === 2 && (
          <div className="mt-8">
            <p className="text-white mb-4">Where did the sound end?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => handleQuizAnswer('left')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg">Left</button>
              <button onClick={() => handleQuizAnswer('center')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg">Center</button>
              <button onClick={() => handleQuizAnswer('right')} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg">Right</button>
            </div>
            {correctlyIdentified && (
              <p className="text-green-400 mt-4">✅ Validation successful!</p>
            )}
            {!correctlyIdentified && (
              <p className="text-rose-400 mt-4">❌ Please check your headphones and try again.</p>
            )}
            <button
              onClick={handleContinue}
              disabled={!correctlyIdentified}
              className="w-full mt-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
