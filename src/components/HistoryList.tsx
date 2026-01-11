import { DailyCheckResult } from '@/types/catCare';
import { getStatusDisplay } from '@/utils/scoreCalculator';
import { format, parseISO } from 'date-fns';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryListProps {
  history: DailyCheckResult[];
  onSelectResult: (result: DailyCheckResult) => void;
}

export function HistoryList({ history, onSelectResult }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No history yet. Complete your first daily check!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((result) => {
        const statusDisplay = getStatusDisplay(result.status);
        return (
          <button
            key={result.id}
            onClick={() => onSelectResult(result)}
            className="w-full bg-card rounded-xl p-4 flex items-center gap-4 shadow-card hover:shadow-warm transition-shadow active:scale-[0.99]"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
              result.status === 'excellent' && "bg-success/20 text-success",
              result.status === 'attention' && "bg-warning/20 text-warning",
              result.status === 'concern' && "bg-danger/20 text-danger",
            )}>
              {result.totalScore}
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">
                {format(parseISO(result.date), 'EEEE, MMM d')}
              </p>
              <p className="text-sm text-muted-foreground">
                {statusDisplay.emoji} {statusDisplay.label}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        );
      })}
    </div>
  );
}
