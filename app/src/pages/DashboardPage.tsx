// ============================================================
// Dashboard Page — wraps ProgressDashboard
// ============================================================
import React from 'react';
import { ProgressDashboard } from '../components/ProgressDashboard';
import type { ProgressData } from '../types';

interface DashboardPageProps {
  progress: ProgressData;
  onProgressUpdate: (data: ProgressData) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ progress, onProgressUpdate }) => (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <ProgressDashboard progress={progress} onProgressUpdate={onProgressUpdate} />
  </div>
);
