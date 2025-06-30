
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/layout/BrandLogo";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import UserHeader from "@/components/ui/UserHeader";
import MobileNavigationMenu from "./MobileNavigationMenu";

interface HomeNavigationProps {
  onModeSelect?: (mode: 'plan' | 'inspire') => void;
}

const HomeNavigation = ({ onModeSelect }: HomeNavigationProps) => {
  const { t } = useLanguage();

  const handleModeSelect = (mode: 'plan' | 'inspire') => {
    if (onModeSelect) {
      onModeSelect(mode);
    } else {
      window.location.href = `/?mode=${mode}`;
    }
  };

  const navigationItems = [
    {
      key: 'plan',
      onClick: () => handleModeSelect('plan'),
      label: t('hero.plan'),
      type: 'button' as const
    },
    {
      key: 'inspire', 
      onClick: () => handleModeSelect('inspire'),
      label: t('hero.inspire'),
      type: 'button' as const
    },
    {
      key: 'adventures',
      to: '/countries',
      label: t('nav.adventures'),
      type: 'link' as const
    },
    {
      key: 'profile',
      to: '/profile', 
      label: 'Profil',
      type: 'link' as const
    },
    {
      key: 'about',
      to: '#',
      label: t('nav.about'),
      type: 'link' as const
    }
  ];

  return (
    <header className="relative z-10 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <BrandLogo />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            item.type === 'button' ? (
              <Button 
                key={item.key}
                onClick={item.onClick}
                variant="ghost"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                {item.label}
              </Button>
            ) : (
              <Link 
                key={item.key}
                to={item.to!} 
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            )
          ))}
          <UserHeader />
          <LanguageSelector />
        </div>

        {/* Mobile Navigation */}
        <MobileNavigationMenu onModeSelect={handleModeSelect} />
      </nav>
    </header>
  );
};

export default HomeNavigation;
