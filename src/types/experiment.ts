export type Condition = 'SILENCE' | 'THERAPEUTIC' | 'STRESS';

export type ExperimentStage = 
  | 'welcome' 
  | 'consent' 
  | 'demographics'
  | 'headphone-validation'
  | 'baseline-stress' 
  | 'pre-task-stress' 
  | 'reading-task' 
  | 'post-task-stress'
  | 'audio-rating' 
  | 'results' 
  | 'debrief';

export interface TrialData {
  id: string;
  timestamp: string;
  condition: Condition;
  preTaskStress: number;  // 1-10
  postTaskStress: number; // 1-10
  stressDelta: number;
  readingTime: number; // seconds
  quizScore: number;   // 0-3
  ces: number;         // Cognitive Efficiency Score
  age?: string;
  musicianStatus?: string;
}

export interface Question {
  id: string | number;
  text: string;
  options: string[];
  correctIndex: number;
  bloomsLevel?: 'recall' | 'inference' | 'synthesis';
}

export interface ReadingPassage {
  id: string;
  title: string;
  wordCount: number;
  fleschKincaidGrade: number;
  content: string;
  questions: Question[];
}

// Deprecated: Moving to dynamic passages in readingPassages.ts
// Kept for backward compatibility if any component still references it directly
export const READING_MATERIAL = {
  title: "The Auditory Pathway & Emotion",
  content: `To understand how sound regulates stress, we must trace the signal from the air to the brain. The journey of sound begins at the cochlea, a spiral-shaped cavity in the inner ear. Here, the Organ of Corti acts as a biological Fourier analyzer, decomposing complex waveforms into constituent frequencies. Hair cells vibrate at specific resonant frequencies, transducing mechanical energy into electrochemical signals.

These signals travel via the vestibulocochlear nerve to the Brainstem (Superior Olivary Complex) and then to the Thalamus (Medial Geniculate Body). Crucially, the thalamus acts as a relay station with two distinct outputs. The "High Road" sends data to the Primary Auditory Cortex for conscious processing (e.g., "That sound is a guitar"). This process is slow and analytical.

However, the "Low Road" projects directly to the Amygdala, the brain's fear and emotion center. This "Low Road" is the key to sound's power. It explains why a sudden loud crash triggers a startle reflex (release of adrenaline) milliseconds before we consciously identify the source of the noise. This "Emotional Priming" means that sound modulates our affective state before we have the cognitive opportunity to rationalize it.

When the amygdala detects a threat, it activates the Sympathetic branch of the ANS, increasing heart rate and blood pressure. Simultaneously, it signals the HPA-axis to release Cortisol, the primary stress hormone. A pivotal study by Thoma et al. (2013) identified a complex relationship between music and cortisol, known as the "Cortisol Paradox." They found that listening to music before a stressful event did not necessarily prevent a cortisol spike, but listening after significantly accelerated recovery.`,
  questions: [
    {
      id: 1,
      text: "Which brain structure acts as the relay station with two distinct outputs?",
      options: ["The Cochlea", "The Thalamus", "The Amygdala", "The Organ of Corti"],
      correctIndex: 1
    },
    {
      id: 2,
      text: "The 'Low Road' projects signals directly to which center?",
      options: ["Auditory Cortex", "Prefrontal Cortex", "Amygdala", "Brainstem"],
      correctIndex: 2
    },
    {
      id: 3,
      text: "According to the text, the 'Cortisol Paradox' suggests music is most effective when?",
      options: ["During a stressor", "Before a stressor (Prophylactic)", "After a stressor (Recuperative)", "During sleep"],
      correctIndex: 2
    }
  ]
};
