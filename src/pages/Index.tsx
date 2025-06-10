import React from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-purple-600 font-medium">
              Accueil
            </Link>
            <Link to="/countries" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pays
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur notre plateforme !
          </h1>
          <p className="text-xl text-gray-700">
            Explorez le monde et planifiez votre prochaine aventure.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
