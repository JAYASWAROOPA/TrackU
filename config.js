import { Platform } from 'react-native';

const isProduction = true;  // set false while developing

export const API_BASE = isProduction
  ? "https://passionate-reverence-production-0490.up.railway.app"
  : Platform.OS === 'android'
      ? "http://10.0.2.2:5000"
      : "http://localhost:5000";
