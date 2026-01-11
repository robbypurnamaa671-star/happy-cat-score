import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CatProfile, DailyCheckResult } from '@/types/catCare';

const STORAGE_KEY = 'cat_care_data';

interface StorageData {
  cats: CatProfile[];
  activeCatId: string | null;
}

interface CatStorageContextType {
  cats: CatProfile[];
  activeCat: CatProfile | null;
  activeCatId: string | null;
  isLoaded: boolean;
  addCat: (cat: Omit<CatProfile, 'id' | 'createdAt' | 'careLogs'>) => CatProfile;
  updateCat: (catId: string, updates: Partial<Omit<CatProfile, 'id' | 'createdAt' | 'careLogs'>>) => void;
  deleteCat: (catId: string) => void;
  selectCat: (catId: string) => void;
  saveCareLog: (catId: string, result: DailyCheckResult) => void;
  getTodaysLog: (catId: string) => DailyCheckResult | undefined;
  getConsecutiveNoPoop: (catId: string) => number;
}

const CatStorageContext = createContext<CatStorageContextType | null>(null);

export function CatStorageProvider({ children }: { children: ReactNode }) {
  const [cats, setCats] = useState<CatProfile[]>([]);
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored);
        setCats(data.cats || []);
        setActiveCatId(data.activeCatId || (data.cats?.[0]?.id ?? null));
      } catch (e) {
        console.error('Failed to parse cat data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save data whenever it changes
  const saveData = useCallback((newCats: CatProfile[], newActiveCatId: string | null) => {
    const data: StorageData = { cats: newCats, activeCatId: newActiveCatId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const activeCat = cats.find(c => c.id === activeCatId) || null;

  const addCat = useCallback((cat: Omit<CatProfile, 'id' | 'createdAt' | 'careLogs'>) => {
    const newCat: CatProfile = {
      ...cat,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      careLogs: [],
    };
    const newCats = [...cats, newCat];
    setCats(newCats);
    const newActiveId = cats.length === 0 ? newCat.id : activeCatId;
    setActiveCatId(newActiveId);
    saveData(newCats, newActiveId);
    return newCat;
  }, [cats, activeCatId, saveData]);

  const updateCat = useCallback((catId: string, updates: Partial<Omit<CatProfile, 'id' | 'createdAt' | 'careLogs'>>) => {
    const newCats = cats.map(cat => 
      cat.id === catId ? { ...cat, ...updates } : cat
    );
    setCats(newCats);
    saveData(newCats, activeCatId);
  }, [cats, activeCatId, saveData]);

  const deleteCat = useCallback((catId: string) => {
    const newCats = cats.filter(cat => cat.id !== catId);
    setCats(newCats);
    const newActiveId = activeCatId === catId 
      ? (newCats[0]?.id ?? null) 
      : activeCatId;
    setActiveCatId(newActiveId);
    saveData(newCats, newActiveId);
  }, [cats, activeCatId, saveData]);

  const selectCat = useCallback((catId: string) => {
    setActiveCatId(catId);
    saveData(cats, catId);
  }, [cats, saveData]);

  const saveCareLog = useCallback((catId: string, result: DailyCheckResult) => {
    setCats(prevCats => {
      const newCats = prevCats.map(cat => {
        if (cat.id !== catId) return cat;
        // Replace existing log for same date or add new
        const existingIndex = cat.careLogs.findIndex(log => log.date === result.date);
        const newLogs = existingIndex >= 0
          ? cat.careLogs.map((log, i) => i === existingIndex ? result : log)
          : [result, ...cat.careLogs].slice(0, 30);
        return { ...cat, careLogs: newLogs };
      });
      saveData(newCats, activeCatId);
      return newCats;
    });
  }, [activeCatId, saveData]);

  const getTodaysLog = useCallback((catId: string): DailyCheckResult | undefined => {
    const cat = cats.find(c => c.id === catId);
    const today = new Date().toISOString().split('T')[0];
    return cat?.careLogs.find(log => log.date === today);
  }, [cats]);

  const getConsecutiveNoPoop = useCallback((catId: string): number => {
    const cat = cats.find(c => c.id === catId);
    if (!cat) return 0;
    let count = 0;
    for (const log of cat.careLogs) {
      const poopAnswer = log.answers.find(a => a.questionId === 'defecation');
      if (poopAnswer?.value === 'none') {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [cats]);

  return (
    <CatStorageContext.Provider value={{
      cats,
      activeCat,
      activeCatId,
      isLoaded,
      addCat,
      updateCat,
      deleteCat,
      selectCat,
      saveCareLog,
      getTodaysLog,
      getConsecutiveNoPoop,
    }}>
      {children}
    </CatStorageContext.Provider>
  );
}

export function useCatStorage() {
  const context = useContext(CatStorageContext);
  if (!context) {
    throw new Error('useCatStorage must be used within a CatStorageProvider');
  }
  return context;
}
