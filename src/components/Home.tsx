import { CatProfile } from '@/types/catCare';
import { useCatStorage } from '@/hooks/useCatStorage';
import { getStatusDisplay } from '@/utils/scoreCalculator';
import { ScoreCircle } from './ScoreCircle';
import { CatSelector } from './CatSelector';
import { CatIcon } from './CatIcon';
import { ClipboardCheck, History as HistoryIcon, Heart, Settings, Info } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

interface HomeProps {
  onStartCheck: () => void;
  onViewHistory: () => void;
  onAddCat: () => void;
  onEditCat: (cat: CatProfile) => void;
}

export function Home({ onStartCheck, onViewHistory, onAddCat, onEditCat }: HomeProps) {
  const { cats, activeCat, activeCatId, selectCat, getTodaysLog } = useCatStorage();
  
  const todaysLog = activeCatId ? getTodaysLog(activeCatId) : undefined;
  
  const recentLogs = activeCat?.careLogs.slice(0, 7) || [];
  const averageScore = recentLogs.length > 0
    ? Math.round(recentLogs.reduce((sum, r) => sum + r.totalScore, 0) / recentLogs.length)
    : null;

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cat Care Tracker</h1>
            <p className="text-muted-foreground">Keep your cats healthy & happy</p>
          </div>
          <CatIcon className="w-14 h-14 animate-bounce-gentle" variant="happy" />
        </div>

        {/* Cat Selector */}
        <CatSelector
          cats={cats}
          activeCatId={activeCatId}
          onSelectCat={selectCat}
          onAddCat={onAddCat}
          onEditCat={onEditCat}
        />

        {/* Active Cat Banner */}
        {activeCat && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-3 mb-6 flex items-center gap-3">
            <span className="text-lg">🐾</span>
            <p className="text-sm font-medium text-foreground">
              Tracking care for: <span className="text-primary font-bold">{activeCat.name}</span>
            </p>
            <button 
              onClick={() => onEditCat(activeCat)}
              className="ml-auto p-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Today's Status */}
        {activeCat && todaysLog ? (
          <div className="bg-card rounded-3xl p-6 mb-6 shadow-card animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Today's Check</p>
                <p className="text-lg font-bold text-foreground">
                  {format(parseISO(todaysLog.date), 'EEEE, MMM d')}
                </p>
              </div>
              <ScoreCircle score={todaysLog.totalScore} status={todaysLog.status} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getStatusDisplay(todaysLog.status).emoji}</span>
              <span className="font-semibold text-foreground">
                {getStatusDisplay(todaysLog.status).label}
              </span>
            </div>
            {todaysLog.alerts.length > 0 && (
              <div className="mt-4 p-3 bg-danger/10 rounded-xl">
                <p className="text-sm text-danger font-medium">
                  ⚠️ {todaysLog.alerts.length} alert{todaysLog.alerts.length > 1 ? 's' : ''} to review
                </p>
              </div>
            )}
          </div>
        ) : activeCat ? (
          <div className="gradient-warm rounded-3xl p-6 mb-6 shadow-warm animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-foreground">No check today for {activeCat.name}</h2>
                <p className="text-sm text-muted-foreground">Complete a quick daily check</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Quick Stats */}
        {activeCat && averageScore !== null && (
          <div className="grid grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-sm text-muted-foreground mb-1">7-Day Average</p>
              <p className="text-3xl font-bold text-primary">{averageScore}</p>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Checks This Week</p>
              <p className="text-3xl font-bold text-primary">{recentLogs.length}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {activeCat && (
          <div className="space-y-4">
            <button
              onClick={onStartCheck}
              className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-warm hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <ClipboardCheck className="w-6 h-6" />
              {todaysLog ? 'Update Today\'s Check' : 'Start Daily Check'}
            </button>

            <button
              onClick={onViewHistory}
              className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-semibold text-base hover:bg-secondary/80 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <HistoryIcon className="w-5 h-5" />
              View {activeCat.name}'s History
            </button>
          </div>
        )}

        {/* Footer Links */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link 
            to="/about" 
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="w-4 h-4" />
            About
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link 
            to="/privacy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground mt-4 px-4">
          This app does not provide medical advice or diagnosis.
        </p>
      </div>
    </div>
  );
}
