import { cn } from '@/lib/utils';

interface CatIconProps {
  className?: string;
  variant?: 'happy' | 'sleepy' | 'alert';
}

export function CatIcon({ className, variant = 'happy' }: CatIconProps) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Ears */}
        <path
          d="M25 35 L15 10 L35 25 Z"
          className="fill-cat-coral"
        />
        <path
          d="M75 35 L85 10 L65 25 Z"
          className="fill-cat-coral"
        />
        {/* Inner ears */}
        <path
          d="M25 32 L20 15 L32 27 Z"
          className="fill-cat-peach"
        />
        <path
          d="M75 32 L80 15 L68 27 Z"
          className="fill-cat-peach"
        />
        {/* Face */}
        <circle cx="50" cy="55" r="35" className="fill-cat-coral" />
        {/* Eyes */}
        {variant === 'happy' && (
          <>
            <ellipse cx="38" cy="50" rx="5" ry="6" className="fill-foreground" />
            <ellipse cx="62" cy="50" rx="5" ry="6" className="fill-foreground" />
            <circle cx="36" cy="48" r="2" className="fill-card" />
            <circle cx="60" cy="48" r="2" className="fill-card" />
          </>
        )}
        {variant === 'sleepy' && (
          <>
            <path d="M33 50 Q38 47 43 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="stroke-foreground" />
            <path d="M57 50 Q62 47 67 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="stroke-foreground" />
          </>
        )}
        {variant === 'alert' && (
          <>
            <circle cx="38" cy="50" r="7" className="fill-foreground" />
            <circle cx="62" cy="50" r="7" className="fill-foreground" />
            <circle cx="38" cy="50" r="4" className="fill-warning" />
            <circle cx="62" cy="50" r="4" className="fill-warning" />
          </>
        )}
        {/* Nose */}
        <path
          d="M50 60 L46 65 L54 65 Z"
          className="fill-cat-peach"
        />
        {/* Mouth */}
        <path
          d="M50 65 L50 70 M50 70 Q44 75 40 72 M50 70 Q56 75 60 72"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-foreground"
        />
        {/* Whiskers */}
        <g className="stroke-foreground" strokeWidth="1.5" strokeLinecap="round">
          <line x1="20" y1="55" x2="35" y2="58" />
          <line x1="18" y1="62" x2="34" y2="62" />
          <line x1="20" y1="69" x2="35" y2="66" />
          <line x1="80" y1="55" x2="65" y2="58" />
          <line x1="82" y1="62" x2="66" y2="62" />
          <line x1="80" y1="69" x2="65" y2="66" />
        </g>
      </svg>
    </div>
  );
}
