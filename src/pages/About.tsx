import { ArrowLeft, Heart, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CatIcon } from '@/components/CatIcon';

const About = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link 
            to="/" 
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">About</h1>
        </div>

        {/* App Icon */}
        <div className="flex justify-center mb-6">
          <CatIcon className="w-24 h-24" variant="happy" />
        </div>

        {/* App Info */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-foreground mb-2">Cat Care Tracker</h2>
          <p className="text-muted-foreground">Version 1.0.0</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4 bg-card rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Daily Health Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your cat's well-being with quick 2-minute daily check-ins covering 10 key health indicators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-card rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Track Trends Over Time</h3>
              <p className="text-sm text-muted-foreground">
                View your cat's care history and spot patterns that may indicate health changes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-card rounded-2xl p-4 shadow-card">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All your data stays on your device. We don't collect, store, or share any information.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted rounded-2xl p-4 mb-8">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Disclaimer:</strong> This app does not provide medical advice or diagnosis. 
            It is designed to help you track daily care patterns only. Always consult a veterinarian 
            for health concerns about your cat.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <Link 
            to="/privacy" 
            className="block w-full py-3 px-4 bg-secondary text-secondary-foreground rounded-xl text-center font-medium hover:bg-secondary/80 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-8">
          Made with ❤️ for cat lovers everywhere
        </p>
      </div>
    </div>
  );
};

export default About;