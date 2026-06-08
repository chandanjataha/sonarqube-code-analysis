// ============================================================
// QuizSection — random question generator with timer, scoring
// ============================================================
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { generateQuestion, calcAccuracy, TABLE_COLORS } from '../utils/quiz';
import { playCorrect, playWrong, playAchievement, playTimerEnd } from '../utils/sounds';
import { launchConfetti } from '../utils/confetti';
import { updateTableProgress } from '../services/storage';
import { ScoreBoard } from './ScoreBoard';
import { Timer } from './Timer';
import { AchievementPopup } from './BadgeSystem';
import { useTimer } from '../hooks/useTimer';
import type { QuizQuestion, TimerOption, BadgeTier } from '../types';

interface QuizSectionProps {
  tableNumber: number;
  timerOption: TimerOption;
}

type Feedback = 'correct' | 'wrong' | null;
type QuizPhase = 'playing' | 'finished';

export const QuizSection: React.FC<QuizSectionProps> = ({ tableNumber, timerOption }) => {
  const [question, setQuestion] = useState<QuizQuestion>(() => generateQuestion(tableNumber));
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('playing');
  const [earnedBadge, setEarnedBadge] = useState<BadgeTier>(null);
  const [showBadge, setShowBadge] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const gradient = TABLE_COLORS[tableNumber] ?? 'from-primary-400 to-ocean-500';

  // ── Timer ─────────────────────────────────────────────────
  const handleTimerEnd = useCallback(() => {
    playTimerEnd();
    setPhase('finished');
    const total = correct + wrong;
    if (total > 0) {
      const { badge } = updateTableProgress(tableNumber, correct, wrong);
      if (badge) {
        setEarnedBadge(badge);
        setShowBadge(true);
        setTimeout(() => playAchievement(), 200);
        launchConfetti(40);
      }
    }
  }, [correct, wrong, tableNumber]);

  const { timeLeft, running, start, reset } = useTimer(timerOption ?? 60, {
    onEnd: handleTimerEnd,
  });

  useEffect(() => {
    if (timerOption && phase === 'playing') start();
  }, []);  // start once on mount

  // ── Next question ─────────────────────────────────────────
  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(tableNumber));
    setInput('');
    setFeedback(null);
    setError('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [tableNumber]);

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) { setError('Please enter an answer!'); return; }
    if (!/^-?\d+$/.test(trimmed)) { setError('Numbers only please!'); return; }
    setError('');

    const userAnswer = parseInt(trimmed, 10);
    const isCorrect = userAnswer === question.answer;

    if (isCorrect) {
      playCorrect();
      setCorrect(c => c + 1);
      setFeedback('correct');
    } else {
      playWrong();
      setWrong(w => w + 1);
      setFeedback('wrong');
    }

    // If no timer, auto-advance after delay
    if (!timerOption) {
      setTimeout(() => nextQuestion(), 1500);
    }
  }, [input, question, timerOption, nextQuestion]);

  // ── Finish (no timer) ─────────────────────────────────────
  const handleFinish = useCallback(() => {
    const total = correct + wrong;
    if (total === 0) return;
    const { badge } = updateTableProgress(tableNumber, correct, wrong);
    setPhase('finished');
    if (badge) {
      setEarnedBadge(badge);
      setShowBadge(true);
      playAchievement();
      launchConfetti(50);
    }
  }, [correct, wrong, tableNumber]);

  // ── Restart ───────────────────────────────────────────────
  const handleRestart = useCallback(() => {
    setCorrect(0);
    setWrong(0);
    setFeedback(null);
    setInput('');
    setError('');
    setPhase('playing');
    setEarnedBadge(null);
    setShowBadge(false);
    setQuestion(generateQuestion(tableNumber));
    if (timerOption) { reset(); setTimeout(() => start(), 50); }
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [tableNumber, timerOption, reset, start]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (feedback && timerOption) nextQuestion();
      else if (!feedback) handleSubmit();
    }
  };

  // ── Finished screen ───────────────────────────────────────
  if (phase === 'finished') {
    const total = correct + wrong;
    const accuracy = calcAccuracy(correct, total);
    return (
      <div className="animate-bounce-in text-center">
        <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white shadow-xl mb-6`}>
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="font-display text-3xl mb-1">Session Complete!</h2>
          <p className="opacity-80">Table {tableNumber} · {total} questions</p>
        </div>
        <ScoreBoard correct={correct} wrong={wrong} />
        <div className="mt-4 text-4xl font-display text-primary-600 dark:text-primary-400">
          {accuracy}%
        </div>
        <p className="text-slate-500 text-sm mt-1">
          {accuracy >= 95 ? '🌟 Incredible!' : accuracy >= 80 ? '🎊 Great job!' : accuracy >= 60 ? '👍 Good effort!' : '💪 Keep practising!'}
        </p>
        <button
          onClick={handleRestart}
          className="mt-6 flex items-center gap-2 mx-auto bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          <RefreshCw size={18} /> Try Again
        </button>
        {showBadge && earnedBadge && (
          <AchievementPopup
            tier={earnedBadge}
            tableNumber={tableNumber}
            accuracy={accuracy}
            onClose={() => setShowBadge(false)}
          />
        )}
      </div>
    );
  }

  // ── Playing screen ────────────────────────────────────────
  return (
    <div className="animate-slide-up space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className={`bg-gradient-to-r ${gradient} text-white px-4 py-2 rounded-full font-display text-lg shadow`}>
          Table {tableNumber}
        </div>
        {timerOption && (
          <Timer timeLeft={timeLeft} total={timerOption} running={running} />
        )}
      </div>

      {/* Score */}
      <ScoreBoard correct={correct} wrong={wrong} />

      {/* Question card */}
      <div
        className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-center text-white shadow-xl transition-all duration-300 ${feedback ? 'scale-[0.98]' : 'scale-100'}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="font-display text-5xl md:text-6xl">
          {question.table} × {question.multiplier} = ?
        </div>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={input}
            onChange={e => { setInput(e.target.value); setError(''); }}
            onKeyDown={handleKeyDown}
            disabled={!!feedback}
            placeholder="Type your answer…"
            aria-label="Your answer"
            aria-describedby={error ? 'quiz-error' : undefined}
            className={`w-full rounded-2xl border-2 px-5 py-4 text-xl font-bold text-center font-display bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none transition-all duration-200 ${
              feedback === 'correct' ? 'border-mint-400 bg-mint-300/10' :
              feedback === 'wrong'   ? 'border-coral-400 bg-coral-300/10' :
              error ? 'border-red-400' : 'border-slate-200 dark:border-slate-600 focus:border-primary-400'
            }`}
          />
          {/* Feedback icon */}
          {feedback === 'correct' && (
            <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-mint-500 animate-bounce-in" size={28} />
          )}
          {feedback === 'wrong' && (
            <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-coral-500 animate-wiggle" size={28} />
          )}
        </div>

        {error && (
          <p id="quiz-error" role="alert" className="text-red-500 text-sm text-center font-semibold">
            {error}
          </p>
        )}

        {/* Feedback message */}
        {feedback === 'correct' && (
          <p role="status" className="text-mint-600 dark:text-mint-400 font-bold text-center text-lg animate-bounce-in">
            ✅ Correct! Well done!
          </p>
        )}
        {feedback === 'wrong' && (
          <p role="status" className="text-coral-600 dark:text-coral-400 font-bold text-center animate-wiggle">
            ❌ Wrong! Correct answer: <span className="text-xl">{question.answer}</span>
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!feedback ? (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-ocean-500 text-white font-bold py-3 rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
              aria-label="Submit answer"
            >
              <Send size={18} /> Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-mint-400 to-ocean-500 text-white font-bold py-3 rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
              aria-label="Next question"
            >
              Next Question →
            </button>
          )}
          {!timerOption && (
            <button
              onClick={handleFinish}
              className="px-5 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Finish quiz session"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
