'use client';

import { useEffect } from 'react';
import { useExperimentStore } from '../lib/experimentStore'; // Relative import
import { WelcomePhase } from '../components/phases/WelcomePhase'; // Relative import
import { ConsentPhase } from '../components/phases/ConsentPhase'; // Relative import
import { DemographicsPhase } from '../components/phases/DemographicsPhase'; // Relative import
import { HeadphoneValidationPhase } from '../components/phases/HeadphoneValidationPhase'; // Relative import
import { StressMeasurementPhase } from '../components/phases/StressMeasurementPhase'; // Relative import
import { ReadingTaskPhase } from '../components/phases/ReadingTaskPhase'; // Relative import
import { AudioRatingPhase } from '../components/phases/AudioRatingPhase'; // Relative import
import { ResultsPhase } from '../components/phases/ResultsPhase'; // Relative import
import { ProgressBar } from '../components/phases/ProgressBar'; // Relative import

export default function ExperimentPage() {
  const { currentPhase } = useExperimentStore();

  // Phase router
  const renderPhase = () => {
    switch (currentPhase) {
      case 'welcome': return <WelcomePhase />;
      case 'consent': return <ConsentPhase />;
      case 'demographics': return <DemographicsPhase />;
      case 'headphone-validation': return <HeadphoneValidationPhase />;
      
      case 'baseline-stress':
        return (
          <StressMeasurementPhase
            timepoint="baseline"
            title="Baseline Stress Measurement"
            instruction="Before we begin, please indicate your current stress level."
            nextPhase="pre-task-stress"
          />
        );
      
      case 'pre-task-stress':
        return (
          <StressMeasurementPhase
            timepoint="pre-task"
            title="Pre-Task Stress Check"
            instruction="You are about to begin the reading task. How stressed do you feel right now?"
            nextPhase="reading-task"
            showConditionInfo={true}
          />
        );
      
      case 'reading-task':
        return <ReadingTaskPhase />;
      
      case 'post-task-stress':
        return (
          <StressMeasurementPhase
            timepoint="post-task"
            title="Post-Task Stress Measurement"
            instruction="The task is complete. How stressed do you feel now?"
            nextPhase="audio-rating"
          />
        );
      
      case 'audio-rating':
        return <AudioRatingPhase />;
      
      case 'results':
        return <ResultsPhase />;
      
      default:
        return <div className="p-10 text-center text-white">Loading Phase: {currentPhase}...</div>;
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-teal-500/30">
      <ProgressBar currentPhase={currentPhase} />
      <div className="animate-in fade-in duration-500">
        {renderPhase()}
      </div>
    </main>
  );
}
