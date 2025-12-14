import { create } from 'zustand';
import { AudioMode } from '@/hooks/useNeuroSonic';

interface ExperimentStore {
  currentPhase: string;
  assignedCondition: AudioMode;
  sessionId: string | null;
  
  // Data Collection
  preTaskStress: number;
  postTaskStress: number;
  readingTime: number;
  quizScore: number;

  // Actions
  setPhase: (phase: string) => void;
  setAssignedCondition: (condition: AudioMode) => void;
  initSession: () => void;
  reset: () => void;
  setPreTaskStress: (stress: number) => void;
  setPostTaskStress: (stress: number) => void;
  setReadingTime: (time: number) => void;
  setQuizScore: (score: number) => void;
}

export const useExperimentStore = create<ExperimentStore>((set) => ({
  currentPhase: 'welcome',
  assignedCondition: 'SILENCE',
  sessionId: null,
  preTaskStress: 5,
  postTaskStress: 5,
  readingTime: 0,
  quizScore: 0,

  setPhase: (phase) => set({ currentPhase: phase }),
  setAssignedCondition: (condition) => set({ assignedCondition: condition }),
  
  initSession: () => set({ 
    sessionId: `NS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 
    currentPhase: 'welcome',
    // Randomize condition on session start
    assignedCondition: ['SILENCE', 'THERAPEUTIC', 'STRESS'][Math.floor(Math.random() * 3)] as AudioMode
  }),

  reset: () => set({ 
    currentPhase: 'welcome', 
    assignedCondition: 'SILENCE', 
    sessionId: null, 
    preTaskStress: 5, 
    postTaskStress: 5, 
    readingTime: 0, 
    quizScore: 0 
  }),

  setPreTaskStress: (stress) => set({ preTaskStress: stress }),
  setPostTaskStress: (stress) => set({ postTaskStress: stress }),
  setReadingTime: (time) => set({ readingTime: time }),
  setQuizScore: (score) => set({ quizScore: score }),
}));