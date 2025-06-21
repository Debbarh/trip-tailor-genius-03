
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, Globe } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import UserHeader from "@/components/ui/UserHeader";
import MobileNavigationMenu from "../layout/MobileNavigationMenu";
import { Container } from '../design/DesignSystem';

interface UnifiedNavigationProps {
  onModeSelect?: (mode: 'plan' | 'inspire') => void;
  currentMode?: 'plan' | 'inspire' | null;
}

const UnifiedNavigation = ({ onModeSelect, currentMode }: UnifiedNavigationProps) => {
  const { t } = useLanguage();
  const location = useLocation();

  const handleModeSelect = (mode: 'plan' | 'inspire') => {
    if (onModeSelect) {
      onModeSelect(mode);
    } else {
      window.location.href = `/?mode=${mode}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <BrandLogo />
          </Link>
          
          {/* Mode Selector - Centre */}
          <div className="hidden md:flex items-center space-x-2 bg-neutral-100 rounded-full p-1">
            <Button
              onClick={() => handleModeSelect('plan')}
              variant={currentMode === 'plan' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                currentMode === 'plan' 
                  ? 'bg-white shadow-soft text-neutral-900' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t('hero.plan')}
            </Button>
            <Button
              onClick={() => handleModeSelect('inspire')}
              variant={currentMode === 'inspire' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-full px-6 py-2 transition-all duration-200 ${
                currentMode === 'inspire' 
                  ? 'bg-white shadow-soft text-neutral-900' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.inspire')}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/countries" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium flex items-center"
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('nav.adventures')}
            </Link>
            <Link 
              to="/profile" 
              className="text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Profil
            </Link>
            <UserHeader />
            <LanguageSelector />
          </div>

          {/* Mobile Navigation */}
          <MobileNavigationMenu onModeSelect={handleModeSelect} />
        </nav>
      </Container>
    </header>
  );
};

export default UnifiedNavigation;
