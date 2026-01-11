import { CatIcon } from './CatIcon';
import { PawPrint } from 'lucide-react';

interface OnboardingProps {
  onAddCat: () => void;
}

export function Onboarding({ onAddCat }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        {/* Animated Cat */}
        <div className="mb-8">
          <CatIcon className="w-32 h-32 mx-auto animate-bounce-gentle" variant="happy" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Welcome to Cat Care Tracker!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track your cat's daily health and care patterns with simple, quick check-ins.
        </p>

        {/* Features */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-3 bg-cat-sage rounded-2xl p-4 text-left">
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold text-foreground">Quick Daily Checks</p>
              <p className="text-sm text-muted-foreground">2 minutes to track 10 key health indicators</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-cat-peach rounded-2xl p-4 text-left">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-foreground">Care Score & Trends</p>
              <p className="text-sm text-muted-foreground">See your cat's wellness over time</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-cat-cream rounded-2xl p-4 text-left">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-foreground">100% Private</p>
              <p className="text-sm text-muted-foreground">All data stays on your device</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onAddCat}
          className="relative z-10 w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-warm hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
        >
          <PawPrint className="w-6 h-6" />
          Add Your First Cat
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-8">
          This app does not provide medical advice or diagnosis. It helps track daily care patterns only.
        </p>
      </div>
    </div>
  );
}
