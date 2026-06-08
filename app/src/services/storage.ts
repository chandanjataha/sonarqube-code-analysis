// ============================================================
// localStorage service - all persistence logic lives here
// ============================================================
import type { ProgressData, TableProgress, BadgeTier, Theme } from '../types';

const STORAGE_KEYS = {
  PROGRESS: 'tla_progress',
  THEME: 'tla_theme',
} as const;

const DEFAULT_PROGRESS: ProgressData = {
  tables: {},
  totalCorrect: 0,
  totalWrong: 0,
  totalSessions: 0,
  earnedBadges: {},
};

// ── Read ────────────────────────────────────────────────────
export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return raw ? { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function loadTheme(): Theme {
  return (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) ?? 'light';
}

// ── Write ───────────────────────────────────────────────────
export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
  } catch {
    console.warn('Failed to save progress');
  }
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// ── Update helpers ──────────────────────────────────────────
export function updateTableProgress(
  tableNumber: number,
  correct: number,
  wrong: number
): { data: ProgressData; badge: BadgeTier } {
  const data = loadProgress();
  const total = correct + wrong;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const existing: TableProgress = data.tables[tableNumber] ?? {
    tableNumber,
    highestScore: 0,
    accuracy: 0,
    lastPracticed: '',
    totalSessions: 0,
    bestStreak: 0,
  };

  const updated: TableProgress = {
    ...existing,
    highestScore: Math.max(existing.highestScore, accuracy),
    accuracy: Math.round(
      (existing.accuracy * existing.totalSessions + accuracy) /
        (existing.totalSessions + 1)
    ),
    lastPracticed: new Date().toISOString(),
    totalSessions: existing.totalSessions + 1,
  };

  data.tables[tableNumber] = updated;
  data.totalCorrect += correct;
  data.totalWrong += wrong;
  data.totalSessions += 1;

  // Badge logic
  let badge: BadgeTier = null;
  if (accuracy >= 95) badge = 'gold';
  else if (accuracy >= 80) badge = 'silver';
  else if (accuracy >= 60) badge = 'bronze';

  if (badge) {
    const existing = data.earnedBadges[tableNumber];
    const tier = { bronze: 1, silver: 2, gold: 3 } as const;
    if (!existing || tier[badge] > tier[existing]) {
      data.earnedBadges[tableNumber] = badge;
    }
  }

  saveProgress(data);
  return { data, badge };
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
}
