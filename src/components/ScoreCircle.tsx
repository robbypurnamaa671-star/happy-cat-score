import { CareStatus } from '@/types/catCare';
import { cn } from '@/lib/utils';

interface ScoreCircleProps {
  score: number;
  status: CareStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreCircle({ score, status, size = 'lg' }: ScoreCircleProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const strokeColors = {
    excellent: 'stroke-success',
    attention: 'stroke-warning',
    concern: 'stroke-danger',
  };

  return (
    <div className={cn("relative", sizeClasses[size])}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          className="fill-none stroke-cat-beige"
          strokeWidth="8"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          className={cn("fill-none transition-all duration-1000 ease-out", strokeColors[status])}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn("font-bold text-foreground", textSizes[size])}>
          {score}
        </span>
      </div>
    </div>
  );
}
