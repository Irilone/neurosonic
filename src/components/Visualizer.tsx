'use client';

import { useEffect, useRef } from 'react';

interface VisualizerProps {
  analyser: AnalyserNode | null;
  isActive: boolean;
}

export function Visualizer({ analyser, isActive }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; 
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = isActive ? 'rgb(45, 212, 191)' : 'rgba(45, 212, 191, 0.2)'; 
      ctx.beginPath();

      const sliceWidth = rect.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; 
        const y = v * rect.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, rect.height / 2);
      ctx.stroke();
    };

    if (isActive) {
      draw();
    } else {
      ctx.fillStyle = 'rgb(2, 6, 23)';
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.beginPath();
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.1)';
      ctx.stroke();
    }

    return () => cancelAnimationFrame(animationId);
  }, [analyser, isActive]);

  return (
    <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative shadow-inner shadow-black/50">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
      <div className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
        Signal Telemetry
      </div>
      {isActive && (
        <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
      )}
    </div>
  );
}
