import { useState, useEffect } from 'react';
import { CatProfile } from '@/types/catCare';
import { useCatStorage, CatStorageProvider } from '@/hooks/useCatStorage';
import { Home } from '@/components/Home';
import { DailyCheck } from '@/components/DailyCheck';
import { History } from '@/components/History';
import { Onboarding } from '@/components/Onboarding';
import { CatProfileForm } from '@/components/CatProfileForm';

type View = 'loading' | 'onboarding' | 'home' | 'check' | 'history' | 'add-cat' | 'edit-cat';

function IndexContent() {
  const { cats, isLoaded, addCat, updateCat, deleteCat } = useCatStorage();
  const [view, setView] = useState<View>('loading');
  const [editingCat, setEditingCat] = useState<CatProfile | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Only decide the initial landing view.
    // Don't override user-driven navigation like "add-cat".
    if (cats.length === 0) {
      if (view === 'loading') setView('onboarding');
      return;
    }

    if (view === 'loading' || view === 'onboarding') {
      setView('home');
    }
  }, [isLoaded, cats.length, view]);

  const handleAddCat = (data: { name: string; photo?: string; gender?: 'male' | 'female' | 'unknown'; age?: string; notes?: string }) => {
    addCat(data);
    setView('home');
  };

  const handleUpdateCat = (data: { name: string; photo?: string; gender?: 'male' | 'female' | 'unknown'; age?: string; notes?: string }) => {
    if (editingCat) {
      updateCat(editingCat.id, data);
      setEditingCat(null);
      setView('home');
    }
  };

  const handleDeleteCat = () => {
    if (editingCat) {
      deleteCat(editingCat.id);
      setEditingCat(null);
      // If no cats left, go to onboarding
      if (cats.length <= 1) {
        setView('onboarding');
      } else {
        setView('home');
      }
    }
  };

  const handleEditCat = (cat: CatProfile) => {
    setEditingCat(cat);
    setView('edit-cat');
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-soft">
          <span className="text-4xl">🐱</span>
        </div>
      </div>
    );
  }

  return (
    <div className="font-nunito">
      {view === 'onboarding' && (
        <Onboarding onAddCat={() => {
          console.log('[onboarding] Add first cat clicked');
          setView('add-cat');
        }} />
      )}
      {view === 'home' && (
        <Home
          onStartCheck={() => setView('check')}
          onViewHistory={() => setView('history')}
          onAddCat={() => setView('add-cat')}
          onEditCat={handleEditCat}
        />
      )}
      {view === 'check' && (
        <DailyCheck onComplete={() => setView('home')} />
      )}
      {view === 'history' && (
        <History onBack={() => setView('home')} />
      )}
      {view === 'add-cat' && (
        <CatProfileForm
          onSave={handleAddCat}
          onCancel={() => setView(cats.length === 0 ? 'onboarding' : 'home')}
        />
      )}
      {view === 'edit-cat' && editingCat && (
        <CatProfileForm
          cat={editingCat}
          onSave={handleUpdateCat}
          onCancel={() => {
            setEditingCat(null);
            setView('home');
          }}
          onDelete={handleDeleteCat}
        />
      )}
    </div>
  );
}

const Index = () => {
  return (
    <CatStorageProvider>
      <IndexContent />
    </CatStorageProvider>
  );
};

export default Index;
