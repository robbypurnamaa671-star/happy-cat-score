import { CatProfile } from '@/types/catCare';
import { CatIcon } from './CatIcon';
import { Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CatSelectorProps {
  cats: CatProfile[];
  activeCatId: string | null;
  onSelectCat: (catId: string) => void;
  onAddCat: () => void;
  onEditCat: (cat: CatProfile) => void;
}

export function CatSelector({ cats, activeCatId, onSelectCat, onAddCat, onEditCat }: CatSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-muted-foreground">Your Cats</h2>
        <button
          onClick={onAddCat}
          className="text-sm text-primary font-medium flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add Cat
        </button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
        {cats.map((cat) => {
          const isActive = cat.id === activeCatId;
          const hasPhoto = cat.photo && !cat.photo.startsWith('hsl');
          
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCat(cat.id)}
              onDoubleClick={() => onEditCat(cat)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all",
                "min-w-[80px] active:scale-95",
                isActive
                  ? "bg-primary/10 border-2 border-primary"
                  : "bg-card border-2 border-transparent hover:border-border"
              )}
            >
              <div className="relative">
                {hasPhoto ? (
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={cat.photo} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: cat.photo || 'hsl(var(--cat-peach))' }}
                  >
                    <CatIcon className="w-8 h-8" variant="happy" />
                  </div>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className={cn(
                "text-sm font-medium truncate max-w-[70px]",
                isActive ? "text-primary" : "text-foreground"
              )}>
                {cat.name}
              </span>
            </button>
          );
        })}
        
        {/* Add cat button */}
        <button
          onClick={onAddCat}
          className="flex-shrink-0 flex flex-col items-center justify-center gap-2 p-3 rounded-2xl min-w-[80px] border-2 border-dashed border-border hover:border-primary/50 transition-colors active:scale-95"
        >
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Add</span>
        </button>
      </div>
    </div>
  );
}
