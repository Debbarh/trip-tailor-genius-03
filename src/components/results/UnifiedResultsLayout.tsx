
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface UnifiedResultsLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  mode: 'plan' | 'inspire';
  onBack: () => void;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

const UnifiedResultsLayout = ({
  title,
  subtitle,
  backgroundImage,
  mode,
  onBack,
  children,
  headerActions
}: UnifiedResultsLayoutProps) => {
  const modeConfig = {
    plan: {
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      buttonGradient: 'from-blue-600 to-purple-600',
      icon: '✈️'
    },
    inspire: {
      gradient: 'from-orange-500 via-rose-500 to-pink-500',
      buttonGradient: 'from-orange-500 to-rose-600',
      icon: '✨'
    }
  };

  const config = modeConfig[mode];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-64 object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-90`}></div>
          </div>
        )}
        
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={onBack}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              
              {headerActions && (
                <div className="flex gap-3">
                  {headerActions}
                </div>
              )}
            </div>

            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                {config.icon} {title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-white/10 to-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedResultsLayout;
