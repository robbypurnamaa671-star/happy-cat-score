export interface DailyCheckAnswer {
  questionId: string;
  value: string;
  score: number;
}

export interface DailyCheckResult {
  id: string;
  date: string;
  answers: DailyCheckAnswer[];
  totalScore: number;
  status: 'excellent' | 'attention' | 'concern';
  alerts: string[];
}

export interface Question {
  id: string;
  title: string;
  icon: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  label: string;
  value: string;
  score: number;
  isAlert?: boolean;
  alertMessage?: string;
}

export type CareStatus = 'excellent' | 'attention' | 'concern';
