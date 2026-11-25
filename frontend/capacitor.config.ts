import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.undec.fisica2',
  appName: 'Física 2 Dominio Total',
  webDir: 'dist/app',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0B0D20',
    },
  },
};

export default config;
