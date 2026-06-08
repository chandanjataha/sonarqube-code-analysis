// ============================================================
// Learn Page — table selector + table display
// ============================================================
import React, { useState } from 'react';
import { TableSelector } from '../components/TableSelector';
import { TableDisplay } from '../components/TableDisplay';
import type { ProgressData } from '../types';

interface LearnPageProps {
  progress: ProgressData;
}

export const LearnPage: React.FC<LearnPageProps> = ({ progress }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="font-display text-4xl text-slate-700 dark:text-slate-200 mb-2">📚 Learn Tables</h1>
        <p className="text-slate-500 dark:text-slate-400">Pick any table to see all its multiplications</p>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50">
        <TableSelector
          selected={selectedTable}
          onSelect={setSelectedTable}
          progress={progress}
          label="Pick a Table (2–20)"
        />
      </div>

      {selectedTable ? (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50">
          <TableDisplay tableNumber={selectedTable} />
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <div className="text-6xl mb-3">👆</div>
          <p className="font-semibold text-lg">Choose a number above to begin!</p>
        </div>
      )}
    </div>
  );
};
