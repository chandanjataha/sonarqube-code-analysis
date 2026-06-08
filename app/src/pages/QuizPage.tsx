// ============================================================
// Quiz Page — table picker, timer picker, quiz section
// ============================================================
import React, { useState } from 'react';
import { TableSelector } from '../components/TableSelector';
import { QuizSection } from '../components/QuizSection';
import { BadgeCriteria } from '../components/BadgeSystem';
import type { ProgressData, TimerOption } from '../types';

interface QuizPageProps {
  progress: ProgressData;
}

const TIMER_OPTIONS: { label: string; value: TimerOption }[] = [
  { label: '∞ No Limit', value: null },
  { label: '⏱ 30 sec', value: 30 },
  { label: '⏱ 60 sec', value: 60 },
  { label: '⏱ 120 sec', value: 120 },
];

export const QuizPage: React.FC<QuizPageProps> = ({ progress }) => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [timerOption, setTimerOption] = useState<TimerOption>(null);
  const [quizKey, setQuizKey] = useState(0);
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (!selectedTable) return;
    setQuizKey(k => k + 1);
    setStarted(true);
  };

  const handleTableChange = (n: number) => {
    setSelectedTable(n);
    setStarted(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="font-display text-4xl text-slate-700 dark:text-slate-200 mb-2">✏️ Quiz Mode</h1>
        <p className="text-slate-500 dark:text-slate-400">Test your knowledge and earn badges!</p>
      </div>

      {/* Table selector */}
      {!started && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50 space-y-6">
          <TableSelector
            selected={selectedTable}
            onSelect={handleTableChange}
            progress={progress}
            label="Select Table"
          />

          {/* Timer selector */}
          <div>
            <h3 className="font-display text-xl text-slate-700 dark:text-slate-200 mb-3 text-center">Timer</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TIMER_OPTIONS.map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => setTimerOption(opt.value)}
                  aria-pressed={timerOption === opt.value}
                  className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
                    timerOption === opt.value
                      ? 'bg-gradient-to-r from-ocean-500 to-primary-500 text-white shadow-lg scale-105'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:scale-105'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Badge criteria */}
          <div className="pt-2">
            <p className="text-center text-sm text-slate-400 mb-3 font-medium">Badge Requirements</p>
            <BadgeCriteria />
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            disabled={!selectedTable}
            aria-disabled={!selectedTable}
            className={`w-full py-4 rounded-2xl font-display text-xl font-bold transition-all duration-200 shadow-lg ${
              selectedTable
                ? 'bg-gradient-to-r from-primary-500 to-ocean-500 text-white hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedTable ? `Start Quiz — Table ${selectedTable}! 🚀` : 'Select a table first'}
          </button>
        </div>
      )}

      {/* Active quiz */}
      {started && selectedTable && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 dark:border-slate-700/50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 text-sm font-medium">Quiz in progress</span>
            <button
              onClick={() => setStarted(false)}
              className="text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold transition-colors"
              aria-label="Go back to table selection"
            >
              ← Change Table
            </button>
          </div>
          <QuizSection
            key={quizKey}
            tableNumber={selectedTable}
            timerOption={timerOption}
          />
        </div>
      )}
    </div>
  );
};
