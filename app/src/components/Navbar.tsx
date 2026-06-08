// ============================================================
// Navbar — title, navigation links, theme toggle
// ============================================================
import React from 'react';
import { Sun, Moon, BookOpen, LayoutDashboard, Home, Pencil } from 'lucide-react';
import type { AppPage, Theme } from '../types';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const navItems: { label: string; page: AppPage; icon: React.ReactNode }[] = [
  { label: 'Home', page: 'home', icon: <Home size={18} /> },
  { label: 'Learn', page: 'learn', icon: <BookOpen size={18} /> },
  { label: 'Quiz', page: 'quiz', icon: <Pencil size={18} /> },
  { label: 'Progress', page: 'dashboard', icon: <LayoutDashboard size={18} /> },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, theme, onToggleTheme }) => {
  return (
    <nav
      className="sticky top-0 z-50 w-full"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group focus-visible:outline-none"
            aria-label="Go to home"
          >
            <span className="text-3xl animate-float" role="img" aria-label="calculator emoji">🧮</span>
            <span className="font-display text-xl md:text-2xl bg-gradient-to-r from-primary-600 to-ocean-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              TableMaster
            </span>
          </button>

          {/* Nav links — hidden on mobile, shown on md+ */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navItems.map(({ label, page, icon }) => (
              <button
                key={page}
                role="menuitem"
                onClick={() => onNavigate(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary-500 to-ocean-500 text-white shadow-md scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition-transform text-slate-700 dark:text-slate-200"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile bottom nav */}
        <div className="md:hidden flex border-t border-slate-100 dark:border-slate-800">
          {navItems.map(({ label, page, icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-semibold transition-colors ${
                currentPage === page
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
