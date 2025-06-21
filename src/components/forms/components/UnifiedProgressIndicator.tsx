
import React from 'react';

interface UnifiedProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const UnifiedProgressIndicator = ({ currentStep, totalSteps, className = '' }: UnifiedProgressIndicatorProps) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-neutral-600">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sm text-neutral-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary-500 to-accent-purple h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default UnifiedProgressIndicator;
