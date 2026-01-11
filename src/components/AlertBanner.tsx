import { AlertTriangle } from 'lucide-react';

interface AlertBannerProps {
  alerts: string[];
}

export function AlertBanner({ alerts }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-danger/10 border-2 border-danger/30 rounded-2xl p-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-danger mb-2">Attention Needed</h3>
          <ul className="space-y-1">
            {alerts.map((alert, index) => (
              <li key={index} className="text-sm text-foreground">
                • {alert}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Please consider contacting a veterinarian if symptoms persist.
          </p>
        </div>
      </div>
    </div>
  );
}
