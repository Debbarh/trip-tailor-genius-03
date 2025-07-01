// Re-export from unified constants  
export { 
  planTripStepConfigs as stepConfigs,
  travelOptions as travelSegments
} from './formData';

// Keep existing countries data
export const countries = [
  {
    code: 'FR',
    name: 'France',
    cities: ['Paris', 'Lyon', 'Marseille'],
    emoji: '🇫🇷'
  },
  {
    code: 'IT',
    name: 'Italie', 
    cities: ['Rome', 'Milan', 'Venice'],
    emoji: '🇮🇹'
  },
  {
    code: 'ES',
    name: 'Espagne',
    cities: ['Madrid', 'Barcelona', 'Seville'],
    emoji: '🇪🇸'
  }
];
