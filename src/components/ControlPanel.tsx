'use client';

import { AudioMode } from '../hooks/useNeuroSonic';

interface ControlPanelProps {
  mode: AudioMode;
  setMode: (mode: AudioMode) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export function ControlPanel({ mode, setMode, isPlaying, setIsPlaying }: ControlPanelProps) {
  
  const handleModeSelect = (newMode: AudioMode) => {
    if (mode === newMode && isPlaying) {
      setIsPlaying(false);
    } else {
      setMode(newMode);
      setIsPlaying(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
      <ControlButton 
        label="Silence (Control)"
        description="Baseline Cognitive Load"
        isActive={mode === 'SILENCE' && isPlaying}
        onClick={() => handleModeSelect('SILENCE')}
        color="slate"
      />
      <ControlButton 
        label="Therapeutic (528Hz)"
        description="Vagal Entrainment"
        isActive={mode === 'THERAPEUTIC' && isPlaying}
        onClick={() => handleModeSelect('THERAPEUTIC')}
        color="teal"
      />
      <ControlButton 
        label="Stress (Noise)"
        description="Sympathetic Overdrive"
        isActive={mode === 'STRESS' && isPlaying}
        onClick={() => handleModeSelect('STRESS')}
        color="rose"
      />
    </div>
  );
}

function ControlButton({ 
  label, 
  description, 
  isActive, 
  onClick, 
  color 
}: { 
  label: string; 
  description: string; 
  isActive: boolean; 
  onClick: () => void; 
  color: 'slate' | 'teal' | 'rose';
}) {
  const colorStyles = {
    slate: isActive ? 'bg-slate-800 border-slate-500 text-slate-100' : 'hover:border-slate-700',
    teal: isActive ? 'bg-teal-950/30 border-teal-500 text-teal-400' : 'hover:border-teal-800/50',
    rose: isActive ? 'bg-rose-950/30 border-rose-500 text-rose-400' : 'hover:border-rose-800/50',
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm
        transition-all duration-300 text-left group overflow-hidden
        ${colorStyles[color]}
        ${isActive ? 'shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]' : 'hover:bg-slate-900'}
      `}
    >
      {isActive && (
        <div className={`absolute inset-0 opacity-10 bg-${color}-500`} />
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <span className="text-lg font-bold font-heading tracking-tight">{label}</span>
          {isActive && (
            <span className="flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full bg-${color}-400 opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`}></span>
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{description}</p>
      </div>
    </button>
  );
}
