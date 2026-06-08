// ============================================================
// Home Page — landing screen with hero, features, CTA
// ============================================================
import React, { useEffect, useState } from 'react';
import { BookOpen, Pencil, BarChart2, Zap } from 'lucide-react';
import type { AppPage } from '../types';

interface HomePageProps {
  onNavigate: (page: AppPage) => void;
}

const features = [
  { icon: <BookOpen size={24} />, title: 'Learn Mode', desc: 'Visual multiplication tables from 2 to 20', color: 'from-pink-400 to-rose-500', page: 'learn' as AppPage },
  { icon: <Pencil size={24} />, title: 'Quiz Mode', desc: 'Practice with instant feedback & scoring', color: 'from-ocean-400 to-blue-500', page: 'quiz' as AppPage },
  { icon: <BarChart2 size={24} />, title: 'Progress', desc: 'Track accuracy, badges, and streaks', color: 'from-mint-400 to-teal-500', page: 'dashboard' as AppPage },
  { icon: <Zap size={24} />, title: 'Timer Mode', desc: '30s / 60s / 120s challenge rounds', color: 'from-sunshine-400 to-orange-500', page: 'quiz' as AppPage },
];

const floatingEmojis = ['✖️', '➕', '2️⃣', '🔢', '🧮', '📐', '⭐', '🏆'];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      {/* Floating background emojis (decorative) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        {floatingEmojis.map((e, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-5 dark:opacity-10 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + ((i * 17) % 80)}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${2 + (i % 3)}rem`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Hero */}
      <div
        className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-7xl md:text-8xl mb-4 animate-float" role="img" aria-label="calculator">🧮</div>
        <h1 className="font-display text-4xl md:text-6xl bg-gradient-to-r from-primary-600 via-ocean-500 to-mint-500 bg-clip-text text-transparent leading-tight mb-4">
          Multiplication Table<br />Learning App
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-xl mx-auto font-semibold leading-relaxed">
          Master tables from <span className="text-primary-500 font-bold">2 to 20</span> through fun, interactive practice — perfect for kids and learners of all ages! 🌟
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('learn')}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-display text-xl px-10 py-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform animate-pulse-glow"
            aria-label="Start learning"
          >
            <BookOpen size={22} /> Start Learning! 🚀
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-400 text-primary-600 dark:text-primary-300 font-display text-xl px-10 py-4 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            aria-label="Jump to quiz"
          >
            <Pencil size={22} /> Take a Quiz
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex justify-center gap-8 md:gap-16 mb-12 text-center">
        {[
          { num: '19', label: 'Tables' },
          { num: '10×', label: 'Multipliers' },
          { num: '3', label: 'Badges' },
        ].map(s => (
          <div key={s.label}>
            <div className="font-display text-3xl md:text-4xl text-primary-600 dark:text-primary-400">{s.num}</div>
            <div className="text-sm font-semibold text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <button
            key={f.title}
            onClick={() => onNavigate(f.page)}
            className={`text-left rounded-3xl p-6 bg-white dark:bg-slate-800/80 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/50 dark:border-slate-700/50 animate-slide-up`}
            style={{ animationDelay: `${i * 0.1}s` }}
            aria-label={`Go to ${f.title}`}
          >
            <div className={`inline-flex p-3 bg-gradient-to-br ${f.color} text-white rounded-2xl shadow mb-4`}>
              {f.icon}
            </div>
            <h3 className="font-display text-xl text-slate-800 dark:text-slate-100 mb-1">{f.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{f.desc}</p>
          </button>
        ))}
      </div>

      {/* Badge teaser */}
      <div className="mt-8 bg-gradient-to-r from-primary-50 to-ocean-50 dark:from-primary-900/20 dark:to-ocean-900/20 rounded-3xl p-6 text-center">
        <h3 className="font-display text-xl text-slate-700 dark:text-slate-200 mb-3">Earn Badges!</h3>
        <div className="flex justify-center gap-6">
          {[
            { e: '🥉', l: 'Bronze', r: '60%+' },
            { e: '🥈', l: 'Silver', r: '80%+' },
            { e: '🥇', l: 'Gold',   r: '95%+' },
          ].map(b => (
            <div key={b.l} className="flex flex-col items-center">
              <span className="text-4xl">{b.e}</span>
              <span className="font-bold text-sm text-slate-700 dark:text-slate-200 mt-1">{b.l}</span>
              <span className="text-xs text-slate-500">{b.r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
