// public/neurosonic.worklet.js

class NeuroSonicStressProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.nextAlarmTime = 0;
      this.isPlayingAlarm = false;
      this.alarmDuration = 0;
    }
  
    process(inputs, outputs, parameters) {
      const output = outputs[0];
      const channel = output[0];
      // currentTime is globally available in AudioWorkletGlobalScope
      
      // Pink Noise Generation (approximation)
      for (let i = 0; i < channel.length; i++) {
        // Base: White Noise (Simulating harsh environment)
        let noise = (Math.random() * 2 - 1) * 0.15;
        channel[i] = noise;
      }
  
      return true;
    }
  }
  
  registerProcessor('neurosonic-stress-processor', NeuroSonicStressProcessor);
