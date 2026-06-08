// ============================================================
// ProgressDashboard — shows per-table stats and overall stats
// ============================================================
import React from 'react';
import { BarChart2, Star, Trophy, Calendar, Trash2 } from 'lucide-react';
import { formatDate, TABLE_COLORS } from '../utils/quiz';
import { BadgeDisplay } from './BadgeSystem';
import { clearProgress, loadProgress } from '../services/storage';
import type { ProgressData } from '../types';

interface ProgressDashboardProps {
  progress: ProgressData;
  onProgressUpdate: (data: ProgressData) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  onProgressUpdate,
}) => {
  const tableEntries = Object.values(progress.tables);
  const totalQuestions = progress.totalCorrect + progress.totalWrong;
  const overallAccuracy = totalQuestions > 0
    ? Math.round((progress.totalCorrect / totalQuestions) * 100)
    : 0;
  const topTable = tableEntries.reduce<typeof tableEntries[0] | null>((best, t) =>
    !best || t.highestScore > best.highestScore ? t : best, null);

  const handleClear = () => {
    if (window.confirm('Clear all progress? This cannot be undone.')) {
      clearProgress();
      onProgressUpdate(loadProgress());
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <h2 className="font-display text-3xl text-center text-slate-700 dark:text-slate-200">
        📊 Your Progress
      </h2>

      {/* Overall stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: <Star size={20} />, label: 'Sessions', value: progress.totalSessions, color: 'text-sunshine-500 bg-sunshine-300/20' },
          { icon: <Trophy size={20} />, label: 'Correct', value: progress.totalCorrect, color: 'text-mint-500 bg-mint-300/20' },
          { icon: <BarChart2 size={20} />, label: 'Accuracy', value: `${overallAccuracy}%`, color: 'text-primary-500 bg-primary-300/20' },
          { icon: <Calendar size={20} />, label: 'Tables Done', value: tableEntries.length, color: 'text-ocean-500 bg-ocean-300/20' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="font-display text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-semibold opacity-70">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Best table */}
      {topTable && (
        <div className={`bg-gradient-to-br ${TABLE_COLORS[topTable.tableNumber]} rounded-2xl p-5 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold opacity-80 text-sm">🏆 Best Table</p>
              <p className="font-display text-4xl">{topTable.tableNumber}</p>
              <p className="opacity-80 text-sm mt-1">Highest score: {topTable.highestScore}%</p>
            </div>
            <BadgeDisplay tier={progress.earnedBadges[topTable.tableNumber] ?? null} size="lg" />
          </div>
        </div>
      )}

      {/* Per-table list */}
      {tableEntries.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <div className="text-6xl mb-3">📚</div>
          <p className="font-semibold text-lg">No practice sessions yet!</p>
          <p className="text-sm mt-1">Head to the Quiz page to get started.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="font-bold text-slate-600 dark:text-slate-300 mb-2">All Tables</h3>
          {tableEntries
            .sort((a, b) => b.highestScore - a.highestScore)
            .map(t => {
              const gradient = TABLE_COLORS[t.tableNumber];
              const badge = progress.earnedBadges[t.tableNumber];
              return (
                <div
                  key={t.tableNumber}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow flex items-center gap-4"
                >
                  <div className={`bg-gradient-to-br ${gradient} text-white w-12 h-12 rounded-xl flex items-center justify-center font-display text-xl font-bold shrink-0`}>
                    {t.tableNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-200">Table {t.tableNumber}</span>
                      {badge && <BadgeDisplay tier={badge} size="sm" />}
                    </div>
                    {/* Accuracy bar */}
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${gradient} transition-all duration-700`}
                        style={{ width: `${t.highestScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                      <span>{t.totalSessions} session{t.totalSessions !== 1 ? 's' : ''}</span>
                      <span>Best: {t.highestScore}%</span>
                      <span>{formatDate(t.lastPracticed)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Clear button */}
      {tableEntries.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-600 transition-colors font-semibold"
            aria-label="Clear all progress"
          >
            <Trash2 size={16} /> Clear All Progress
          </button>
        </div>
      )}
    </div>
  );
};
