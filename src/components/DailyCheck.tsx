import { useState } from 'react';
import { DailyCheckAnswer, DailyCheckResult, QuestionOption } from '@/types/catCare';
import { careQuestions } from '@/data/questions';
import { calculateScore, getStatus, getAlerts } from '@/utils/scoreCalculator';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { ResultSummary } from './ResultSummary';
import { useCatStorage } from '@/hooks/useCatStorage';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyCheckProps {
  onComplete: () => void;
}

export function DailyCheck({ onComplete }: DailyCheckProps) {
  const { activeCat, activeCatId, saveCareLog, getTodaysLog, getConsecutiveNoPoop } = useCatStorage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DailyCheckAnswer[]>([]);
  const [result, setResult] = useState<DailyCheckResult | null>(null);

  const existingLog = activeCatId ? getTodaysLog(activeCatId) : undefined;
  const [showExistingWarning, setShowExistingWarning] = useState(!!existingLog);

  const currentQuestion = careQuestions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  if (!activeCat || !activeCatId) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Please select a cat first</p>
          <button
            onClick={onComplete}
            className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (showExistingWarning && existingLog) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-warning" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Already Checked Today
          </h2>
          <p className="text-muted-foreground mb-6">
            You've already completed a check for <strong>{activeCat.name}</strong> today. 
            Would you like to update it?
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                // Pre-fill with existing answers
                setAnswers(existingLog.answers);
                setShowExistingWarning(false);
              }}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-warm"
            >
              Update Today's Check
            </button>
            <button
              onClick={onComplete}
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-2xl font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSelect = (option: QuestionOption) => {
    const newAnswer: DailyCheckAnswer = {
      questionId: currentQuestion.id,
      value: option.value,
      score: option.score,
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    if (currentIndex < careQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Complete the check
      const score = calculateScore(answers);
      const status = getStatus(score);
      const consecutiveNoPoop = getConsecutiveNoPoop(activeCatId);
      const alerts = getAlerts(answers, consecutiveNoPoop + (answers.find(a => a.questionId === 'defecation')?.value === 'none' ? 1 : 0));

      const checkResult: DailyCheckResult = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        answers,
        totalScore: score,
        status: alerts.length > 0 ? 'concern' : status,
        alerts,
      };

      saveCareLog(activeCatId, checkResult);
      setResult(checkResult);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (result) {
    return <ResultSummary result={result} catName={activeCat.name} onDone={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Cat Name Banner */}
        <div className="bg-primary/10 rounded-xl px-4 py-2 mb-4 text-center">
          <span className="text-sm font-medium text-primary">
            🐾 Checking in for {activeCat.name}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar
          current={currentIndex + 1}
          total={careQuestions.length}
          className="mb-8"
        />

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValue={currentAnswer?.value}
            onSelect={handleSelect}
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={cn(
              "flex-1 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]",
              "flex items-center justify-center gap-2",
              currentIndex === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={cn(
              "flex-1 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]",
              "flex items-center justify-center gap-2",
              !currentAnswer
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:opacity-90 shadow-warm"
            )}
          >
            {currentIndex === careQuestions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
