import { useState } from 'react';
import { DailyCheckResult } from '@/types/catCare';
import { useCatStorage } from '@/hooks/useCatStorage';
import { HistoryChart } from './HistoryChart';
import { HistoryList } from './HistoryList';
import { ResultSummary } from './ResultSummary';
import { ArrowLeft } from 'lucide-react';

interface HistoryProps {
  onBack: () => void;
}

export function History({ onBack }: HistoryProps) {
  const { activeCat } = useCatStorage();
  const [selectedResult, setSelectedResult] = useState<DailyCheckResult | null>(null);

  const history = activeCat?.careLogs || [];

  if (selectedResult) {
    return (
      <ResultSummary
        result={selectedResult}
        catName={activeCat?.name}
        onDone={() => setSelectedResult(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">History</h1>
            {activeCat && (
              <p className="text-sm text-muted-foreground">
                🐾 {activeCat.name}'s care logs
              </p>
            )}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-card rounded-2xl p-4 mb-6 shadow-card">
          <h2 className="font-bold text-foreground mb-4">7-Day Trend</h2>
          <HistoryChart history={history} />
          <div className="flex justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-success rounded" /> 80+ Doing Well
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-warning rounded" /> 50+ Needs Attention
            </span>
          </div>
        </div>

        {/* List */}
        <div>
          <h2 className="font-bold text-foreground mb-4">Past Results</h2>
          <HistoryList history={history} onSelectResult={setSelectedResult} />
        </div>
      </div>
    </div>
  );
}
