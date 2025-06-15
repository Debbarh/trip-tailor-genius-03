
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import UserHeader from '@/components/ui/UserHeader';
import LanguageSelector from '@/components/ui/LanguageSelector';
import MobileNavigation from '@/components/layout/MobileNavigation';
import BrandLogo from '@/components/layout/BrandLogo';
import { Plane, SparklesIcon, MapPin, Users } from 'lucide-react';

interface GlobalNavigationProps {
  onModeSelect?: (mode: 'plan' | 'inspire') => void;
}

const GlobalNavigation = ({ onModeSelect }: GlobalNavigationProps) => {
  const { t } = useLanguage();
  const location = useLocation();

  const handleModeSelect = (mode: 'plan' | 'inspire') => {
    if (location.pathname === '/' && onModeSelect) {
      onModeSelect(mode);
    } else {
      // Navigate to home and trigger mode
      window.location.href = `/?mode=${mode}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              onClick={() => handleModeSelect('plan')}
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium"
            >
              <Plane className="w-4 h-4" />
              <span>{t('hero.plan')}</span>
            </Button>

            <Button
              onClick={() => handleModeSelect('inspire')}
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium"
            >
              <SparklesIcon className="w-4 h-4" />
              <span>{t('hero.inspire')}</span>
            </Button>

            <Link to="/countries">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('nav.adventures')}</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium"
            >
              <Users className="w-4 h-4" />
              <span>{t('nav.about')}</span>
            </Button>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <div className="hidden md:block">
              <UserHeader />
            </div>
            <MobileNavigation onModeSelect={handleModeSelect} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalNavigation;
