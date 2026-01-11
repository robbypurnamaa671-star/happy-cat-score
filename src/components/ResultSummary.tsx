import { DailyCheckResult } from '@/types/catCare';
import { careQuestions, careTips } from '@/data/questions';
import { getStatusDisplay, getRandomTip } from '@/utils/scoreCalculator';
import { ScoreCircle } from './ScoreCircle';
import { AlertBanner } from './AlertBanner';
import { CatIcon } from './CatIcon';
import { Lightbulb } from 'lucide-react';

interface ResultSummaryProps {
  result: DailyCheckResult;
  onDone: () => void;
}

export function ResultSummary({ result, onDone }: ResultSummaryProps) {
  const statusDisplay = getStatusDisplay(result.status);
  const tip = getRandomTip(careTips);

  const getAnswerLabel = (questionId: string, value: string): string => {
    const question = careQuestions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.value === value);
    return option?.label || value;
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <CatIcon
            className="w-20 h-20 mx-auto mb-4"
            variant={result.status === 'excellent' ? 'happy' : result.status === 'attention' ? 'sleepy' : 'alert'}
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Daily Check Complete!</h1>
          <p className="text-muted-foreground">Here's your cat's care summary</p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ScoreCircle score={result.totalScore} status={result.status} />
          <div className="mt-4 text-center">
            <span className="text-2xl mr-2">{statusDisplay.emoji}</span>
            <span className="text-xl font-bold text-foreground">{statusDisplay.label}</span>
          </div>
        </div>

        {/* Alerts */}
        {result.alerts.length > 0 && (
          <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <AlertBanner alerts={result.alerts} />
          </div>
        )}

        {/* Summary Cards */}
        <div className="bg-card rounded-2xl p-4 mb-6 shadow-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-bold text-foreground mb-3">Today's Summary</h3>
          <div className="space-y-2">
            {result.answers.map((answer) => {
              const question = careQuestions.find(q => q.id === answer.questionId);
              return (
                <div key={answer.questionId} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {question?.icon} {question?.id.charAt(0).toUpperCase()}{question?.id.slice(1)}
                  </span>
                  <span className="font-medium text-foreground">
                    {getAnswerLabel(answer.questionId, answer.value)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Care Tip */}
        <div className="bg-cat-sage rounded-2xl p-4 mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Care Tip</h3>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <button
          onClick={onDone}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-warm hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          Done
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          This app does not provide medical advice or diagnosis. It helps track daily care patterns only.
        </p>
      </div>
    </div>
  );
}
