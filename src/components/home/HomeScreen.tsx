
import React from 'react';
import UnifiedHomeScreen from './UnifiedHomeScreen';

interface HomeScreenProps {
  onModeSelect: (mode: 'plan' | 'inspire') => void;
}

const HomeScreen = ({ onModeSelect }: HomeScreenProps) => {
  return <UnifiedHomeScreen onModeSelect={onModeSelect} />;
};

export default HomeScreen;
