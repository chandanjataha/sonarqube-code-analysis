// ============================================================
// Core type definitions for the Multiplication Table Learning App
// ============================================================

export interface QuizQuestion {
  table: number;
  multiplier: number;
  answer: number;
}

export interface SessionScore {
  correct: number;
  wrong: number;
  total: number;
  accuracy: number;
}

export interface TableProgress {
  tableNumber: number;
  highestScore: number;       // percentage 0-100
  accuracy: number;           // percentage 0-100
  lastPracticed: string;      // ISO date string
  totalSessions: number;
  bestStreak: number;
}

export type TimerOption = 30 | 60 | 120 | null;
export type Theme = 'light' | 'dark';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | null;
export type AppPage = 'home' | 'learn' | 'quiz' | 'dashboard';

export interface ProgressData {
  tables: Record<number, TableProgress>;
  totalCorrect: number;
  totalWrong: number;
  totalSessions: number;
  earnedBadges: Record<number, BadgeTier>;
}
