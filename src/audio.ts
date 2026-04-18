export class GameAudio {
  private ctx: AudioContext | null = null;

  async init(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }
      return;
    }
    this.ctx = new AudioContext();
  }

  private ensureCtx(): AudioContext {
    if (!this.ctx) {
      throw new Error("GameAudio.init() must be called from a user gesture first");
    }
    return this.ctx;
  }

  playMunch(): void {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    // Deep "crunch crunch" — lower frequencies, longer bites, more gap
    const crunches = [
      { freq: 180, freqEnd: 60, filterFreq: 500, gain: 0.7, offset: 0.0, duration: 0.14 },
      { freq: 150, freqEnd: 50, filterFreq: 450, gain: 0.6, offset: 0.25, duration: 0.14 },
    ];

    for (const crunch of crunches) {
      const t = now + crunch.offset;

      // Main crunch oscillator — square wave for crackly bite texture
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(crunch.freq, t);
      osc.frequency.linearRampToValueAtTime(crunch.freqEnd, t + crunch.duration);

      // Second oscillator slightly detuned for gritty crunch texture
      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(crunch.freq * 0.5, t);
      osc2.frequency.linearRampToValueAtTime(crunch.freqEnd * 0.5, t + crunch.duration);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(crunch.filterFreq, t);
      filter.Q.setValueAtTime(2.0, t);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(crunch.gain, t + 0.01);
      gain.gain.setValueAtTime(crunch.gain * 0.8, t + 0.04);
      gain.gain.linearRampToValueAtTime(0.0, t + crunch.duration);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + crunch.duration);
      osc2.start(t);
      osc2.stop(t + crunch.duration);

      osc2.onended = () => {
        osc.disconnect();
        osc2.disconnect();
        filter.disconnect();
        gain.disconnect();
      };
    }
  }

  playBlech(): void {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(300, now);
    osc1.frequency.linearRampToValueAtTime(100, now + 0.35);

    const osc2 = ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(308, now);
    osc2.frequency.linearRampToValueAtTime(104, now + 0.35);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, now);
    filter.Q.setValueAtTime(2.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
    gain.gain.linearRampToValueAtTime(0.0, now + 0.35);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.35);
    osc2.start(now);
    osc2.stop(now + 0.35);

    osc2.onended = () => {
      osc1.disconnect();
      osc2.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  playYay(): void {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const notes = [
      { freq: 523.25, offset: 0.0, peak: 0.5, duration: 0.13 },
      { freq: 659.25, offset: 0.12, peak: 0.5, duration: 0.13 },
      { freq: 783.99, offset: 0.24, peak: 0.5, duration: 0.13 },
      { freq: 1046.5, offset: 0.36, peak: 0.6, duration: 0.26 },
    ];

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.7, now);
    master.connect(ctx.destination);

    const allNodes: AudioNode[] = [master];

    for (const note of notes) {
      const t = now + note.offset;

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.freq, t);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0, t);
      gain.gain.linearRampToValueAtTime(note.peak, t + 0.01);
      gain.gain.linearRampToValueAtTime(0.0, t + note.duration);

      osc.connect(gain);
      gain.connect(master);

      osc.start(t);
      osc.stop(t + note.duration);

      allNodes.push(osc, gain);
    }

    const lastOsc = allNodes[allNodes.length - 2] as OscillatorNode;
    lastOsc.onended = () => {
      for (const node of allNodes) {
        node.disconnect();
      }
    };
  }

  playJump(): void {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.0, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  playLand(): void {
    const ctx = this.ensureCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.linearRampToValueAtTime(50, now + 0.06);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, now);
    filter.Q.setValueAtTime(0.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.005);
    gain.gain.linearRampToValueAtTime(0.0, now + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);

    osc.onended = () => {
      osc.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }
}
