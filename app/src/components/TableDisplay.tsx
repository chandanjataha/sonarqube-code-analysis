// ============================================================
// TableDisplay — shows full multiplication table for a number
// ============================================================
import React, { useState } from 'react';
import { TABLE_COLORS } from '../utils/quiz';

interface TableDisplayProps {
  tableNumber: number;
}

export const TableDisplay: React.FC<TableDisplayProps> = ({ tableNumber }) => {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const gradient = TABLE_COLORS[tableNumber] ?? 'from-primary-400 to-ocean-500';

  return (
    <div className="animate-slide-up">
      {/* Header */}
      <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 mb-4 text-center text-white shadow-xl`}>
        <div className="text-6xl font-display mb-1">{tableNumber}</div>
        <div className="text-lg font-semibold opacity-90">Multiplication Table</div>
      </div>

      {/* Rows */}
      <div className="grid gap-2" role="list" aria-label={`Table of ${tableNumber}`}>
        {rows.map(i => {
          const result = tableNumber * i;
          const isHighlighted = highlighted === i;
          return (
            <div
              key={i}
              role="listitem"
              onMouseEnter={() => setHighlighted(i)}
              onMouseLeave={() => setHighlighted(null)}
              className={`
                flex items-center justify-between rounded-2xl px-5 py-3 cursor-pointer
                transition-all duration-150 select-none
                ${isHighlighted
                  ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-[1.02]`
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow hover:shadow-md'
                }
              `}
            >
              <span className="font-display text-xl">
                <span className="text-2xl font-bold">{tableNumber}</span>
                <span className="mx-2 opacity-70">×</span>
                <span className="text-2xl font-bold">{i}</span>
              </span>
              <span className="text-2xl font-bold opacity-60">=</span>
              <span className={`font-display text-3xl font-bold ${isHighlighted ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>
                {result}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400 mt-3">
        💡 Hover over a row to highlight it
      </p>
    </div>
  );
};
