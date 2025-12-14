'use client';

interface StressScaleProps {
  value: number;
  onChange: (val: number) => void;
  label: string;
}

export function StressScale({ value, onChange, label }: StressScaleProps) {
  return (
    <div className="w-full max-w-2xl bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white mb-6 text-center">{label}</h3>
      
      <div className="flex justify-between text-xs uppercase text-slate-500 font-mono tracking-widest mb-4">
        <span>Deeply Relaxed</span>
        <span>Neutral</span>
        <span>Highly Stressed</span>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all"
      />

      <div className="mt-8 text-center">
        <span className="text-6xl font-bold text-white font-mono">{value}</span>
        <span className="text-slate-500 ml-2 text-xl">/ 10</span>
      </div>
    </div>
  );
}
