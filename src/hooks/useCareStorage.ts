import { useState, useEffect } from 'react';
import { DailyCheckResult } from '@/types/catCare';

const STORAGE_KEY = 'cat_care_history';

export function useCareStorage() {
  const [history, setHistory] = useState<DailyCheckResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse care history:', e);
      }
    }
  }, []);

  const saveResult = (result: DailyCheckResult) => {
    const newHistory = [result, ...history.filter(r => r.date !== result.date)].slice(0, 30);
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const getLastNDays = (n: number): DailyCheckResult[] => {
    return history.slice(0, n);
  };

  const getTodaysResult = (): DailyCheckResult | undefined => {
    const today = new Date().toISOString().split('T')[0];
    return history.find(r => r.date === today);
  };

  const getConsecutiveNoPoop = (): number => {
    let count = 0;
    for (const result of history) {
      const poopAnswer = result.answers.find(a => a.questionId === 'defecation');
      if (poopAnswer?.value === 'none') {
        count++;
      } else {
        break;
      }
    }
    return count;
  };

  return {
    history,
    saveResult,
    getLastNDays,
    getTodaysResult,
    getConsecutiveNoPoop,
  };
}
