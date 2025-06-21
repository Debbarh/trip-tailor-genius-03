
import React from 'react';
import { GradientBackground } from '../design/DesignSystem';
import UnifiedNavigation from '../navigation/UnifiedNavigation';
import MinimalistHero from './MinimalistHero';
import FeaturesGrid from './FeaturesGrid';
import ToursSection from '../tours/ToursSection';
import Footer from './Footer';

interface UnifiedHomeScreenProps {
  onModeSelect: (mode: 'plan' | 'inspire') => void;
}

const UnifiedHomeScreen = ({ onModeSelect }: UnifiedHomeScreenProps) => {
  return (
    <GradientBackground>
      <UnifiedNavigation onModeSelect={onModeSelect} />
      <MinimalistHero onModeSelect={onModeSelect} />
      <FeaturesGrid />
      <ToursSection />
      <Footer />
    </GradientBackground>
  );
};

export default UnifiedHomeScreen;
