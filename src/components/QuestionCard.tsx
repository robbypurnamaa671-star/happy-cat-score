import { Question, QuestionOption } from '@/types/catCare';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedValue?: string;
  onSelect: (option: QuestionOption) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <span className="text-5xl mb-4 block animate-bounce-gentle">{question.icon}</span>
        <h2 className="text-xl font-bold text-foreground leading-snug">
          {question.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option)}
            className={cn(
              "w-full p-4 rounded-2xl text-left transition-all duration-200",
              "border-2 font-medium text-base",
              "active:scale-[0.98]",
              selectedValue === option.value
                ? "border-primary bg-primary text-primary-foreground shadow-warm"
                : "border-border bg-card hover:border-primary/50 hover:bg-cat-sage/30"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
