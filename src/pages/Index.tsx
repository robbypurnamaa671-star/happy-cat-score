import { useState } from 'react';
import { Home } from '@/components/Home';
import { DailyCheck } from '@/components/DailyCheck';
import { History } from '@/components/History';

type View = 'home' | 'check' | 'history';

const Index = () => {
  const [view, setView] = useState<View>('home');

  return (
    <div className="font-nunito">
      {view === 'home' && (
        <Home
          onStartCheck={() => setView('check')}
          onViewHistory={() => setView('history')}
        />
      )}
      {view === 'check' && (
        <DailyCheck onComplete={() => setView('home')} />
      )}
      {view === 'history' && (
        <History onBack={() => setView('home')} />
      )}
    </div>
  );
};

export default Index;
