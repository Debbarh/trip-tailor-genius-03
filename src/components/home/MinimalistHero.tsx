
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container, GradientBackground } from '../design/DesignSystem';

interface MinimalistHeroProps {
  onModeSelect: (mode: 'plan' | 'inspire') => void;
}

const MinimalistHero = ({ onModeSelect }: MinimalistHeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32">
      <Container className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Votre Voyage
            <span className="bg-gradient-to-r from-primary-600 via-accent-purple to-accent-pink bg-clip-text text-transparent block">
              Commence Ici
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Planifiez votre aventure parfaite ou laissez-vous inspirer par des expériences uniques
          </p>

          {/* Mode Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div 
              onClick={() => onModeSelect('plan')}
              className="group cursor-pointer bg-white rounded-2xl p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {t('hero.plan')}
              </h3>
              <p className="text-neutral-600 mb-6">
                Créez votre itinéraire personnalisé étape par étape
              </p>
              <Button 
                variant="ghost" 
                className="group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors"
              >
                Commencer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div 
              onClick={() => onModeSelect('inspire')}
              className="group cursor-pointer bg-white rounded-2xl p-8 border border-neutral-200 hover:border-accent-pink/30 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-pink rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {t('hero.inspire')}
              </h3>
              <p className="text-neutral-600 mb-6">
                Découvrez des destinations qui vous ressemblent
              </p>
              <Button 
                variant="ghost" 
                className="group-hover:bg-accent-pink/10 group-hover:text-accent-pink transition-colors"
              >
                Explorer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MinimalistHero;
