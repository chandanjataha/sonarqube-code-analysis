// ============================================================
// Quiz utility functions
// ============================================================
import type { QuizQuestion, BadgeTier } from '../types';

/** Generate a random question for a given table */
export function generateQuestion(table: number): QuizQuestion {
  const multiplier = Math.floor(Math.random() * 10) + 1;
  return { table, multiplier, answer: table * multiplier };
}

/** Generate a batch of unique questions for a given table */
export function generateQuestions(table: number, count: number = 10): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (let i = 1; i <= 10; i++) {
    pool.push({ table, multiplier: i, answer: table * i });
  }
  // Shuffle and take `count`
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

/** Calculate accuracy percentage */
export function calcAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/** Get badge tier based on accuracy */
export function getBadge(accuracy: number): BadgeTier {
  if (accuracy >= 95) return 'gold';
  if (accuracy >= 80) return 'silver';
  if (accuracy >= 60) return 'bronze';
  return null;
}

/** Format seconds into MM:SS */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/** Format ISO date to readable string */
export function formatDate(iso: string): string {
  if (!iso) return 'Never';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Get ordinal suffix */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const TABLES = Array.from({ length: 19 }, (_, i) => i + 2); // 2..20

export const TABLE_COLORS: Record<number, string> = {
  2: 'from-pink-400 to-rose-500',
  3: 'from-orange-400 to-amber-500',
  4: 'from-yellow-400 to-lime-500',
  5: 'from-green-400 to-emerald-500',
  6: 'from-teal-400 to-cyan-500',
  7: 'from-sky-400 to-blue-500',
  8: 'from-blue-400 to-indigo-500',
  9: 'from-indigo-400 to-violet-500',
  10: 'from-violet-400 to-purple-500',
  11: 'from-purple-400 to-fuchsia-500',
  12: 'from-fuchsia-400 to-pink-500',
  13: 'from-rose-400 to-orange-500',
  14: 'from-amber-400 to-yellow-500',
  15: 'from-lime-400 to-green-500',
  16: 'from-emerald-400 to-teal-500',
  17: 'from-cyan-400 to-sky-500',
  18: 'from-sky-400 to-blue-600',
  19: 'from-blue-500 to-indigo-600',
  20: 'from-indigo-500 to-purple-600',
};
