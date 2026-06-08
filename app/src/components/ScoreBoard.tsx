// ============================================================
// ScoreBoard — live score display during quiz
// ============================================================
import React from 'react';
import { CheckCircle, XCircle, Target, Percent } from 'lucide-react';
import { calcAccuracy } from '../utils/quiz';

interface ScoreBoardProps {
  correct: number;
  wrong: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ correct, wrong }) => {
  const total = correct + wrong;
  const accuracy = calcAccuracy(correct, total);

  const stats = [
    { label: 'Correct', value: correct, icon: <CheckCircle size={18} />, color: 'text-mint-500 bg-mint-300/20' },
    { label: 'Wrong', value: wrong, icon: <XCircle size={18} />, color: 'text-coral-500 bg-coral-300/20' },
    { label: 'Total', value: total, icon: <Target size={18} />, color: 'text-ocean-500 bg-ocean-300/20' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: <Percent size={18} />, color: 'text-primary-500 bg-primary-300/20' },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-2"
      role="region"
      aria-label="Score board"
    >
      {stats.map(s => (
        <div
          key={s.label}
          className={`${s.color} rounded-2xl p-2 flex flex-col items-center gap-1`}
        >
          <span className="opacity-80">{s.icon}</span>
          <span className="font-display text-xl font-bold">{s.value}</span>
          <span className="text-xs font-semibold opacity-70">{s.label}</span>
        </div>
      ))}
    </div>
  );
};
