import { useEffect, useRef, useCallback, useState } from 'react';

// Types
export type AudioMode = 'SILENCE' | 'THERAPEUTIC' | 'STRESS';

interface NeuroSonicConfig {
  mode: AudioMode;
  isPlaying: boolean;
  masterVolume?: number;
}

export const useNeuroSonic = ({ mode, isPlaying, masterVolume = 0.5 }: NeuroSonicConfig) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isWorkletReady, setIsWorkletReady] = useState(false); // New state to track module loading
  
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Initialize Audio Context (Singleton)
  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtxClass({ latencyHint: 'interactive' });
        ctxRef.current = ctx;
        
        try {
          await ctx.audioWorklet.addModule('/neurosonic.worklet.js');
          if (isMounted) setIsWorkletReady(true); // Signal readiness
        } catch (e) {
          console.warn('NeuroSonic: Failed to load AudioWorklet.', e);
        }

        if (isMounted) {
          setAudioContext(ctx);
        }
      }
    };
    init();

    return () => {
      isMounted = false;
      const ctx = ctxRef.current;
      
      gainRef.current?.disconnect();
      gainRef.current = null;

      analyserRef.current?.disconnect();
      analyserRef.current = null;

      workletNodeRef.current?.disconnect();
      workletNodeRef.current = null;

      oscNodesRef.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      oscNodesRef.current = [];

      if (ctx) {
        ctx.close();
        ctxRef.current = null;
      }
    };
  }, []);

  // Cleanup Function
  const stopAudio = useCallback(() => {
    oscNodesRef.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    oscNodesRef.current = [];

    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
  }, []);

  // Engine Logic
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || ctx.state === 'closed') return;

    if (!isPlaying) {
      stopAudio();
      return;
    }

    if (ctx.state === 'suspended') ctx.resume();

    if (!gainRef.current) {
      gainRef.current = ctx.createGain();
    }
    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 2048;
    }

    // Reconnect graph safely
    try {
        gainRef.current.disconnect();
        analyserRef.current.disconnect();
        
        gainRef.current.connect(analyserRef.current);
        analyserRef.current.connect(ctx.destination);
        
        gainRef.current.gain.setValueAtTime(masterVolume, ctx.currentTime);
    } catch (e) {
        // Ignore connection errors during fast re-renders
    }

    // --- MODE: THERAPEUTIC ---
    if (mode === 'THERAPEUTIC') {
      const now = ctx.currentTime;
      const carrier = ctx.createOscillator();
      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(528, now);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(4, now);
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.15; 

      const amGain = ctx.createGain();
      amGain.gain.value = 0.5;
      
      lfo.connect(lfoGain).connect(amGain.gain);
      carrier.connect(amGain).connect(gainRef.current);

      carrier.start(now);
      lfo.start(now);
      
      oscNodesRef.current.push(carrier, lfo);
    }

    // --- MODE: STRESS ---
    else if (mode === 'STRESS') {
      // Only attempt to create WorkletNode if module is loaded
      if (isWorkletReady) {
        try {
          // Check if we already have one to avoid duplicates
          if (!workletNodeRef.current) {
             const stressNode = new AudioWorkletNode(ctx, 'neurosonic-stress-processor');
             stressNode.connect(gainRef.current);
             workletNodeRef.current = stressNode;
          }
        } catch (e) {
          console.error("Worklet instantiation failed", e);
        }
      } else {
        // Fallback or wait - console.warn("Worklet not ready yet");
      }
    }

    return () => {
      stopAudio(); 
    };
  }, [mode, isPlaying, masterVolume, stopAudio, audioContext, isWorkletReady]); // Depend on isWorkletReady

  return { audioContext, analyser: analyserRef.current };
};