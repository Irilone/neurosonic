// src/components/phases/DemographicsPhase.tsx
'use client';
import { useState } from 'react';
import { useExperimentStore } from '@/lib/experimentStore';

export function DemographicsPhase() {
  const setPhase = useExperimentStore((state) => state.setPhase);
  const [age, setAge] = useState('');
  const [musician, setMusician] = useState(''); 

  const handleSubmit = () => {
    // In a real app, save these to store/DB
    setPhase('headphone-validation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-200 animate-in fade-in zoom-in-95 duration-500">
      <div className="card max-w-2xl p-8 border border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4">Demographics</h2>
        <p className="text-slate-400 mb-6">
          Please provide some basic information. This helps us analyze results based on participant profiles.
        </p>
        <div className="mb-6">
          <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your age"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Are you a musician?</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="musician"
                value="yes"
                checked={musician === 'yes'}
                onChange={(e) => setMusician(e.target.value)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="ml-2 text-slate-300">Yes (Professional/Amateur)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="musician"
                value="no"
                checked={musician === 'no'}
                onChange={(e) => setMusician(e.target.value)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
              />
              <span className="ml-2 text-slate-300">No</span>
            </label>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!age || !musician}
          className="w-full py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition"
        >
          Submit & Continue
        </button>
      </div>
    </div>
  );
}
