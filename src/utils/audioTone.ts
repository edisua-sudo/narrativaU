/**
 * Procedural ambient drone synthesizer using pure Web Audio API.
 * Provides an ethereal, warm archival atmosphere without external audio assets.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let oscillators: OscillatorNode[] = [];

export function toggleAmbientAudio(): boolean {
  if (typeof window === 'undefined') return false;

  if (isPlaying) {
    stopAmbientAudio();
    return false;
  } else {
    startAmbientAudio();
    return true;
  }
}

export function startAmbientAudio(): boolean {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return false;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    // Smooth fade in over 3 seconds to a very gentle level
    masterGain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 3);

    // Warm low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, audioCtx.currentTime);

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    // Warm harmonic fundamental drone (A 110Hz and E 164.8Hz and fifths)
    const pitches = [110, 164.81, 220, 277.18];
    oscillators = pitches.map((freq, i) => {
      const osc = audioCtx!.createOscillator();
      const oscGain = audioCtx!.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime);

      // Subtle detune for organic acoustic resonance
      osc.detune.setValueAtTime((i - 1.5) * 4, audioCtx!.currentTime);

      oscGain.gain.setValueAtTime(0.25 / (i + 1), audioCtx!.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain!);
      osc.start();
      return osc;
    });

    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Web Audio Ambient synthesis unavailable:', err);
    return false;
  }
}

export function stopAmbientAudio(): void {
  if (!audioCtx || !masterGain || !isPlaying) return;

  const now = audioCtx.currentTime;
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  setTimeout(() => {
    oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    oscillators = [];
    isPlaying = false;
  }, 1300);
}

export function isAmbientAudioActive(): boolean {
  return isPlaying;
}
