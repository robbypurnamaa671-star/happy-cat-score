import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a827b3056171449294bd4a3a9bc99455',
  appName: 'Cat Care Tracker',
  webDir: 'dist',
  server: {
    url: 'https://a827b305-6171-4492-94bd-4a3a9bc99455.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    backgroundColor: '#f7f5f0',
    allowMixedContent: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f7f5f0',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#5a8a6b'
    }
  }
};

export default config;
