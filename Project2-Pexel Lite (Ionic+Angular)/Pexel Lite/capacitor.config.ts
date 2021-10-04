import { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/splash-screen" />
const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Pexel Lite',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'true',
      BackupWebStorage: 'none',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#00ff00',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ff00ff',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

export default config;
