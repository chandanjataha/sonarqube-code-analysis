// ============================================================
// Theme hook — persists to localStorage and applies dark class
// ============================================================
import { useState, useEffect } from 'react';
import type { Theme } from '../types';
import { loadTheme, saveTheme } from '../services/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(loadTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => setThemeState(t => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
