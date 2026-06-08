// ============================================================
// TableSelector — colorful grid of table numbers 2-20
// ============================================================
import React from 'react';
import { TABLES, TABLE_COLORS } from '../utils/quiz';
import type { ProgressData } from '../types';

interface TableSelectorProps {
  selected: number | null;
  onSelect: (n: number) => void;
  progress?: ProgressData;
  label?: string;
}

export const TableSelector: React.FC<TableSelectorProps> = ({
  selected,
  onSelect,
  progress,
  label = 'Choose a Table',
}) => {
  return (
    <div>
      <h2 className="text-center font-display text-2xl text-slate-700 dark:text-slate-200 mb-4">
        {label}
      </h2>
      <div
        className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-2"
        role="group"
        aria-label="Multiplication table selector"
      >
        {TABLES.map(n => {
          const tableProgress = progress?.tables[n];
          const isSelected = selected === n;
          const badge = progress?.earnedBadges[n];

          return (
            <button
              key={n}
              onClick={() => onSelect(n)}
              aria-pressed={isSelected}
              aria-label={`Table ${n}${tableProgress ? `, ${tableProgress.accuracy}% accuracy` : ''}`}
              className={`
                relative aspect-square rounded-2xl font-display text-xl font-bold
                transition-all duration-200 hover:scale-110 active:scale-95
                focus-visible:ring-4 focus-visible:ring-primary-400
                ${isSelected
                  ? `bg-gradient-to-br ${TABLE_COLORS[n]} text-white shadow-xl scale-110 ring-4 ring-white dark:ring-slate-700`
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow hover:shadow-md'
                }
              `}
            >
              {n}
              {/* Badge dot */}
              {badge && (
                <span
                  className={`absolute -top-1 -right-1 text-xs ${
                    badge === 'gold' ? '🥇' : badge === 'silver' ? '🥈' : '🥉'
                  }`}
                  aria-hidden="true"
                />
              )}
              {/* Accuracy bar */}
              {tableProgress && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-black/10 overflow-hidden">
                  <div
                    className="h-full bg-white/70 transition-all duration-500"
                    style={{ width: `${tableProgress.accuracy}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
