import { useState } from 'react';
import { CatProfile } from '@/types/catCare';
import { CatIcon } from './CatIcon';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CatProfileFormProps {
  cat?: CatProfile;
  onSave: (data: { name: string; photo?: string; gender?: 'male' | 'female' | 'unknown'; age?: string; notes?: string }) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const CAT_COLORS = [
  'hsl(20, 60%, 70%)',   // Orange
  'hsl(30, 50%, 60%)',   // Ginger
  'hsl(0, 0%, 40%)',     // Gray
  'hsl(0, 0%, 20%)',     // Black
  'hsl(45, 40%, 85%)',   // Cream
  'hsl(200, 30%, 60%)',  // Blue-gray
];

export function CatProfileForm({ cat, onSave, onCancel, onDelete }: CatProfileFormProps) {
  const [name, setName] = useState(cat?.name || '');
  const [photo, setPhoto] = useState(cat?.photo || '');
  const [gender, setGender] = useState<'male' | 'female' | 'unknown' | undefined>(cat?.gender);
  const [age, setAge] = useState(cat?.age || '');
  const [notes, setNotes] = useState(cat?.notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isEditing = !!cat;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), photo: photo || undefined, gender, age: age || undefined, notes: notes || undefined });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectRandomColor = () => {
    const color = CAT_COLORS[Math.floor(Math.random() * CAT_COLORS.length)];
    setPhoto(color);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Edit Cat Profile' : 'Add New Cat'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {photo && !photo.startsWith('hsl') ? (
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20">
                <img src={photo} alt="Cat" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div 
                className="w-28 h-28 rounded-full flex items-center justify-center border-4 border-primary/20"
                style={{ backgroundColor: photo || 'hsl(var(--cat-peach))' }}
              >
                <CatIcon className="w-16 h-16" variant="happy" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-warm">
              <Camera className="w-5 h-5 text-primary-foreground" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
          <button 
            onClick={selectRandomColor}
            className="mt-3 text-sm text-primary font-medium"
          >
            Use random color instead
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Cat Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your cat's name"
              className="w-full p-4 rounded-2xl bg-card border-2 border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {(['male', 'female', 'unknown'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={cn(
                    "p-3 rounded-xl font-medium transition-all",
                    gender === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {g === 'male' ? '♂ Male' : g === 'female' ? '♀ Female' : '? Unknown'}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Age</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 3 years, 6 months"
              className="w-full p-4 rounded-2xl bg-card border-2 border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special notes about your cat..."
              rows={3}
              className="w-full p-4 rounded-2xl bg-card border-2 border-border focus:border-primary focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className={cn(
              "w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]",
              name.trim()
                ? "bg-primary text-primary-foreground shadow-warm hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {isEditing ? 'Save Changes' : 'Add Cat'}
          </button>

          {isEditing && onDelete && (
            <>
              {showDeleteConfirm ? (
                <div className="bg-danger/10 border-2 border-danger/30 rounded-2xl p-4">
                  <p className="text-sm text-foreground mb-3">
                    Are you sure you want to delete <strong>{cat.name}</strong>? All care logs will be lost.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-2 rounded-xl bg-secondary text-secondary-foreground font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onDelete}
                      className="flex-1 py-2 rounded-xl bg-danger text-danger-foreground font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full py-3 rounded-2xl text-danger font-medium hover:bg-danger/10 transition-colors"
                >
                  Delete Cat Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
