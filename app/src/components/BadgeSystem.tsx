// ============================================================
// BadgeSystem — displays earned badges and criteria
// ============================================================
import React from 'react';
import type { BadgeTier } from '../types';

interface BadgeDisplayProps {
  tier: BadgeTier;
  tableNumber?: number;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const BADGE_CONFIG = {
  gold:   { emoji: '🥇', label: 'Gold',   color: 'from-yellow-400 to-amber-500',  requirement: '95%+' },
  silver: { emoji: '🥈', label: 'Silver', color: 'from-slate-300 to-slate-400',   requirement: '80%+' },
  bronze: { emoji: '🥉', label: 'Bronze', color: 'from-amber-600 to-amber-700',   requirement: '60%+' },
};

const SIZE_CLASSES = { sm: 'text-2xl p-2', md: 'text-4xl p-3', lg: 'text-6xl p-4' };

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  tier, tableNumber, size = 'md', animate = false,
}) => {
  if (!tier) return null;
  const config = BADGE_CONFIG[tier];
  return (
    <div
      className={`inline-flex flex-col items-center gap-1 ${animate ? 'animate-bounce-in' : ''}`}
      aria-label={`${config.label} badge${tableNumber ? ` for table ${tableNumber}` : ''}`}
    >
      <div className={`bg-gradient-to-br ${config.color} rounded-2xl ${SIZE_CLASSES[size]} shadow-lg`}>
        <span role="img" aria-label={config.label}>{config.emoji}</span>
      </div>
      {size !== 'sm' && (
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{config.label}</span>
      )}
    </div>
  );
};

// Full badge criteria legend
export const BadgeCriteria: React.FC = () => (
  <div className="flex justify-center gap-4 flex-wrap" aria-label="Badge criteria">
    {(Object.entries(BADGE_CONFIG) as [BadgeTier, typeof BADGE_CONFIG.gold][]).map(([tier, cfg]) => (
      <div key={tier} className="flex items-center gap-2">
        <BadgeDisplay tier={tier} size="sm" />
        <div>
          <div className="font-bold text-sm text-slate-700 dark:text-slate-200">{cfg.label}</div>
          <div className="text-xs text-slate-500">{cfg.requirement}</div>
        </div>
      </div>
    ))}
  </div>
);

// Achievement popup after quiz
interface AchievementPopupProps {
  tier: BadgeTier;
  tableNumber: number;
  accuracy: number;
  onClose: () => void;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  tier, tableNumber, accuracy, onClose,
}) => {
  if (!tier) return null;
  const config = BADGE_CONFIG[tier];
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Achievement unlocked"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center shadow-2xl animate-bounce-in max-w-sm w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-6xl mb-2" role="img" aria-label="Star">⭐</div>
        <h2 className="font-display text-3xl text-slate-800 dark:text-white mb-1">Badge Earned!</h2>
        <BadgeDisplay tier={tier} size="lg" animate />
        <p className="mt-4 text-slate-600 dark:text-slate-300 font-semibold">
          Table {tableNumber} — {accuracy}% Accuracy
        </p>
        <p className="text-slate-400 text-sm mt-1">You earned a <strong>{config.label}</strong> badge!</p>
        <button
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
        >
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
};
