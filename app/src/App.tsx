// ============================================================
// App.tsx — root component, routing, theme, progress state
// ============================================================
import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { DashboardPage } from './pages/DashboardPage';
import { useTheme } from './hooks/useTheme';
import { loadProgress } from './services/storage';
import type { AppPage, ProgressData } from './types';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [page, setPage] = useState<AppPage>('home');
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  const handleProgressUpdate = useCallback((data: ProgressData) => {
    setProgress(data);
  }, []);

  const handleNavigate = useCallback((target: AppPage) => {
    if (target === 'dashboard') setProgress(loadProgress());
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':      return <HomePage onNavigate={handleNavigate} />;
      case 'learn':     return <LearnPage progress={progress} />;
      case 'quiz':      return <QuizPage progress={progress} />;
      case 'dashboard': return <DashboardPage progress={progress} onProgressUpdate={handleProgressUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-app flex flex-col font-body transition-colors duration-300">
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
