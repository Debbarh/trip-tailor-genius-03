
import React from 'react';

// Design tokens centralisés
export const designTokens = {
  colors: {
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      900: '#1e1b4b'
    },
    accent: {
      pink: '#ec4899',
      purple: '#8b5cf6',
      cyan: '#06b6d4'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      400: '#a3a3a3',
      600: '#525252',
      800: '#262626',
      900: '#171717'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem'
  },
  shadows: {
    soft: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    medium: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    large: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
};

// Composants de base du design system
export const Container: React.FC<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ children, size = 'lg', className = '' }) => {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl'
  };

  return (
    <div className={`mx-auto px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'minimal';
  className?: string;
}> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white border border-neutral-200 shadow-soft',
    elevated: 'bg-white border-0 shadow-large',
    minimal: 'bg-white/70 backdrop-blur-sm border border-white/20'
  };

  return (
    <div className={`rounded-xl p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const GradientBackground: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'soft';
  className?: string;
}> = ({ children, variant = 'soft', className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-br from-primary-500 via-accent-purple to-accent-pink',
    soft: 'bg-gradient-to-br from-neutral-50 via-primary-50 to-accent-pink/10'
  };

  return (
    <div className={`min-h-screen ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
