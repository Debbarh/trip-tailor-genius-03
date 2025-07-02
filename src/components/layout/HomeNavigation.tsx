
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import MobileNavigationMenu from "./MobileNavigationMenu";

interface HomeNavigationProps {
  onModeSelect?: (mode: 'plan') => void;
}

const HomeNavigation = ({ onModeSelect }: HomeNavigationProps) => {
  const { t } = useLanguage();

  const handlePlanTrip = () => {
    if (onModeSelect) {
      onModeSelect('plan');
    } else {
      window.location.href = `/?mode=plan`;
    }
  };

  return (
    <header className="relative z-10 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <BrandLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Button 
            onClick={handlePlanTrip}
            variant="ghost"
            className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
          >
            Planifier un voyage
          </Button>
          <LanguageSelector />
        </div>

        {/* Mobile Navigation */}
        <MobileNavigationMenu onModeSelect={handlePlanTrip} />
      </nav>
    </header>
  );
};

export default HomeNavigation;
