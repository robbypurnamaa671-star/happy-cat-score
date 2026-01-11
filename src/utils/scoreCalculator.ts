import { DailyCheckAnswer, CareStatus } from '@/types/catCare';
import { careQuestions } from '@/data/questions';

export function calculateScore(answers: DailyCheckAnswer[]): number {
  const maxScore = careQuestions.length * 10;
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  return Math.round((totalScore / maxScore) * 100);
}

export function getStatus(score: number): CareStatus {
  if (score >= 80) return 'excellent';
  if (score >= 50) return 'attention';
  return 'concern';
}

export function getStatusDisplay(status: CareStatus): { label: string; emoji: string; color: string } {
  switch (status) {
    case 'excellent':
      return { label: 'Doing Well', emoji: '🟢', color: 'success' };
    case 'attention':
      return { label: 'Needs Attention', emoji: '🟡', color: 'warning' };
    case 'concern':
      return { label: 'Care Action Recommended', emoji: '🔴', color: 'danger' };
  }
}

export function getAlerts(answers: DailyCheckAnswer[], consecutiveNoPoop: number): string[] {
  const alerts: string[] = [];
  
  answers.forEach(answer => {
    const question = careQuestions.find(q => q.id === answer.questionId);
    const option = question?.options.find(o => o.value === answer.value);
    if (option?.isAlert && option.alertMessage) {
      alerts.push(option.alertMessage);
    }
  });

  if (consecutiveNoPoop >= 2) {
    alerts.push('No poop for 2 consecutive days');
  }

  return alerts;
}

export function getRandomTip(tips: string[]): string {
  return tips[Math.floor(Math.random() * tips.length)];
}
