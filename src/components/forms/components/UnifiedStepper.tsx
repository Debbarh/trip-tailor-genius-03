
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface UnifiedStepperProps {
  currentStep: number;
  totalSteps: number;
  stepConfig: StepConfig;
  onBack: () => void;
  onNext: () => void;
  onBackToHome: () => void;
  isLastStep: boolean;
  children: React.ReactNode;
  mode: 'plan' | 'inspire';
}

const UnifiedStepper = ({
  currentStep,
  totalSteps,
  stepConfig,
  onBack,
  onNext,
  onBackToHome,
  isLastStep,
  children,
  mode
}: UnifiedStepperProps) => {
  const modeConfig = {
    plan: {
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      buttonGradient: 'from-blue-600 to-purple-600',
      accentColor: 'blue',
      title: 'Plan Your Trip',
      icon: '✈️'
    },
    inspire: {
      gradient: 'from-orange-500 via-rose-500 to-pink-500',
      buttonGradient: 'from-orange-500 to-rose-600',
      accentColor: 'orange',
      title: 'Be Inspired',
      icon: '✨'
    }
  };

  const config = modeConfig[mode];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={stepConfig.image}
          alt={stepConfig.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-80`}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={onBackToHome}
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
              {config.icon} {config.title}
            </h1>
          </div>
          
          <div className="text-white/90 backdrop-blur-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 text-sm font-medium">
            {currentStep + 1} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Title */}
      <div className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {stepConfig.title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            {stepConfig.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {children}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={onBack}
              variant="ghost"
              size="lg"
              disabled={currentStep === 0}
              className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
            
            <Button
              onClick={onNext}
              size="lg"
              className={`bg-gradient-to-r ${config.buttonGradient} hover:opacity-90 text-white px-8 py-3 rounded-2xl shadow-2xl border-0 font-semibold`}
            >
              {isLastStep ? (
                mode === 'inspire' ? '✨ Révéler ma destination' : '🎯 Créer mon voyage'
              ) : (
                'Suivant'
              )}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default UnifiedStepper;
