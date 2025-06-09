
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
        className="text-sm font-medium text-gray-600 hover:text-purple-600"
      >
        {language === 'fr' ? 'EN' : 'FR'}
      </Button>
    </div>
  );
};

export default LanguageSelector;
