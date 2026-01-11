import { DailyCheckResult } from '@/types/catCare';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { format, parseISO } from 'date-fns';

interface HistoryChartProps {
  history: DailyCheckResult[];
}

export function HistoryChart({ history }: HistoryChartProps) {
  const chartData = [...history]
    .reverse()
    .slice(-7)
    .map(result => ({
      date: format(parseISO(result.date), 'EEE'),
      score: result.totalScore,
      fullDate: format(parseISO(result.date), 'MMM d'),
    }));

  if (chartData.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-muted-foreground">
        No data yet. Complete your first daily check!
      </div>
    );
  }

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            ticks={[0, 50, 80, 100]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
                    <p className="text-sm font-medium">{payload[0].payload.fullDate}</p>
                    <p className="text-sm text-primary font-bold">Score: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine y={80} stroke="hsl(var(--success))" strokeDasharray="3 3" strokeOpacity={0.5} />
          <ReferenceLine y={50} stroke="hsl(var(--warning))" strokeDasharray="3 3" strokeOpacity={0.5} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
            activeDot={{ fill: 'hsl(var(--accent))', strokeWidth: 0, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
