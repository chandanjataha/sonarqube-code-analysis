// ============================================================
// Timer — circular countdown display
// ============================================================
import React from 'react';
import { formatTime } from '../utils/quiz';

interface TimerProps {
  timeLeft: number;
  total: number;
  running: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft, total, running }) => {
  const progress = total > 0 ? timeLeft / total : 0;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const color =
    progress > 0.5 ? '#10b981' :
    progress > 0.25 ? '#f59e0b' : '#ef4444';

  return (
    <div
      className="flex flex-col items-center"
      role="timer"
      aria-label={`Time remaining: ${formatTime(timeLeft)}`}
      aria-live="polite"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          {/* Progress */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-display text-2xl font-bold ${running && timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>
      {running && timeLeft <= 10 && (
        <p className="text-red-500 text-xs font-bold mt-1 animate-bounce">Hurry up!</p>
      )}
    </div>
  );
};
