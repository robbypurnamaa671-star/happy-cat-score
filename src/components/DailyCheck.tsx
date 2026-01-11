import { useState } from 'react';
import { DailyCheckAnswer, DailyCheckResult, QuestionOption } from '@/types/catCare';
import { careQuestions } from '@/data/questions';
import { calculateScore, getStatus, getAlerts } from '@/utils/scoreCalculator';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { ResultSummary } from './ResultSummary';
import { useCareStorage } from '@/hooks/useCareStorage';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyCheckProps {
  onComplete: () => void;
}

export function DailyCheck({ onComplete }: DailyCheckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<DailyCheckAnswer[]>([]);
  const [result, setResult] = useState<DailyCheckResult | null>(null);
  const { saveResult, getConsecutiveNoPoop } = useCareStorage();

  const currentQuestion = careQuestions[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

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
      const consecutiveNoPoop = getConsecutiveNoPoop();
      const alerts = getAlerts(answers, consecutiveNoPoop + (answers.find(a => a.questionId === 'defecation')?.value === 'none' ? 1 : 0));

      const checkResult: DailyCheckResult = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        answers,
        totalScore: score,
        status: alerts.length > 0 ? 'concern' : status,
        alerts,
      };

      saveResult(checkResult);
      setResult(checkResult);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (result) {
    return <ResultSummary result={result} onDone={onComplete} />;
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
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
