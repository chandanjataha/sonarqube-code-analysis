// ============================================================
// Countdown timer hook
// ============================================================
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  onEnd?: () => void;
}

export function useTimer(initialSeconds: number, { onEnd }: UseTimerOptions = {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const clear = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const start = useCallback(() => {
    setRunning(true);
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  const stop = useCallback(() => {
    setRunning(false);
    clear();
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(initialSeconds);
  }, [stop, initialSeconds]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          onEndRef.current?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return clear;
  }, [running]);

  const progress = initialSeconds > 0 ? (timeLeft / initialSeconds) * 100 : 0;

  return { timeLeft, running, progress, start, stop, reset };
}
