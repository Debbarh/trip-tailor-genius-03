
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.destinations': 'Destinations',
    'nav.inspiration': 'Inspiration',
    'nav.about': 'À propos',
    'nav.login': 'Se connecter',
    'nav.signup': 'S\'inscrire',
    
    // Hero section
    'hero.adventure': 'L\'aventure',
    'hero.awaits': 'vous attend',
    'hero.description': 'Découvrez des destinations extraordinaires et créez des souvenirs inoubliables avec notre IA de voyage intelligente',
    'hero.travelers': '+50,000 voyageurs inspirés',
    'hero.destinations': '180+ destinations',
    'hero.plan': 'Planifier mon voyage',
    'hero.inspire': 'M\'inspirer',
    
    // Authentication
    'auth.login': 'Connexion',
    'auth.signup': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.noAccount': 'Pas encore de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.signupHere': 'Inscrivez-vous ici',
    'auth.loginHere': 'Connectez-vous ici',
    'auth.welcome': 'Bienvenue',
    'auth.createAccount': 'Créer votre compte',
  },
  en: {
    // Navigation
    'nav.destinations': 'Destinations',
    'nav.inspiration': 'Inspiration',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.signup': 'Sign up',
    
    // Hero section
    'hero.adventure': 'Adventure',
    'hero.awaits': 'awaits you',
    'hero.description': 'Discover extraordinary destinations and create unforgettable memories with our intelligent travel AI',
    'hero.travelers': '+50,000 inspired travelers',
    'hero.destinations': '180+ destinations',
    'hero.plan': 'Plan my trip',
    'hero.inspire': 'Inspire me',
    
    // Authentication
    'auth.login': 'Login',
    'auth.signup': 'Sign up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.signupHere': 'Sign up here',
    'auth.loginHere': 'Login here',
    'auth.welcome': 'Welcome',
    'auth.createAccount': 'Create your account',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.fr] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
