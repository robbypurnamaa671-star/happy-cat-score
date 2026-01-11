import { CatIcon } from './CatIcon';
import { useCareStorage } from '@/hooks/useCareStorage';
import { getStatusDisplay } from '@/utils/scoreCalculator';
import { ScoreCircle } from './ScoreCircle';
import { ClipboardCheck, History as HistoryIcon, Heart } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface HomeProps {
  onStartCheck: () => void;
  onViewHistory: () => void;
}

export function Home({ onStartCheck, onViewHistory }: HomeProps) {
  const { getTodaysResult, getLastNDays } = useCareStorage();
  const todaysResult = getTodaysResult();
  const recentResults = getLastNDays(7);

  const averageScore = recentResults.length > 0
    ? Math.round(recentResults.reduce((sum, r) => sum + r.totalScore, 0) / recentResults.length)
    : null;

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cat Care Tracker</h1>
            <p className="text-muted-foreground">Keep your cat healthy & happy</p>
          </div>
          <CatIcon className="w-14 h-14 animate-bounce-gentle" variant="happy" />
        </div>

        {/* Today's Status */}
        {todaysResult ? (
          <div className="bg-card rounded-3xl p-6 mb-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Today's Check</p>
                <p className="text-lg font-bold text-foreground">
                  {format(parseISO(todaysResult.date), 'EEEE, MMM d')}
                </p>
              </div>
              <ScoreCircle score={todaysResult.totalScore} status={todaysResult.status} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getStatusDisplay(todaysResult.status).emoji}</span>
              <span className="font-semibold text-foreground">
                {getStatusDisplay(todaysResult.status).label}
              </span>
            </div>
            {todaysResult.alerts.length > 0 && (
              <div className="mt-4 p-3 bg-danger/10 rounded-xl">
                <p className="text-sm text-danger font-medium">
                  ⚠️ {todaysResult.alerts.length} alert{todaysResult.alerts.length > 1 ? 's' : ''} to review
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="gradient-warm rounded-3xl p-6 mb-6 shadow-warm animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-foreground">No check today yet</h2>
                <p className="text-sm text-muted-foreground">Complete a quick daily check</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {averageScore !== null && (
          <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-sm text-muted-foreground mb-1">7-Day Average</p>
              <p className="text-3xl font-bold text-primary">{averageScore}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Checks This Week</p>
              <p className="text-3xl font-bold text-primary">{recentResults.length}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartCheck}
            className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-warm hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <ClipboardCheck className="w-6 h-6" />
            {todaysResult ? 'Update Today\'s Check' : 'Start Daily Check'}
          </button>

          <button
            onClick={onViewHistory}
            className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-semibold text-base hover:bg-secondary/80 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <HistoryIcon className="w-5 h-5" />
            View History & Trends
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground mt-8 px-4">
          This app does not provide medical advice or diagnosis. It helps track daily care patterns only.
        </p>
      </div>
    </div>
  );
}
