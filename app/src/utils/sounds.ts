// ============================================================
// Sound effects using Web Audio API (no external files needed)
// ============================================================

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(
  frequency: number,
  type: OscillatorType,
  duration: number,
  volume: number = 0.3,
  delay: number = 0
) {
  try {
    const ac = getCtx();
    const oscillator = ac.createOscillator();
    const gainNode = ac.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ac.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ac.currentTime + delay);
    gainNode.gain.setValueAtTime(0, ac.currentTime + delay);
    gainNode.gain.linearRampToValueAtTime(volume, ac.currentTime + delay + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + duration);

    oscillator.start(ac.currentTime + delay);
    oscillator.stop(ac.currentTime + delay + duration);
  } catch {
    // Silently fail if audio is not available
  }
}

export function playCorrect() {
  playTone(523, 'sine', 0.15, 0.3);        // C5
  playTone(659, 'sine', 0.15, 0.3, 0.15);  // E5
  playTone(784, 'sine', 0.2, 0.3, 0.3);   // G5
}

export function playWrong() {
  playTone(311, 'sawtooth', 0.1, 0.2);
  playTone(233, 'sawtooth', 0.15, 0.2, 0.12);
}

export function playAchievement() {
  [523, 587, 659, 698, 784, 880, 988, 1047].forEach((freq, i) => {
    playTone(freq, 'sine', 0.15, 0.25, i * 0.08);
  });
}

export function playTimerEnd() {
  playTone(440, 'square', 0.3, 0.15);
  playTone(330, 'square', 0.3, 0.15, 0.35);
}
