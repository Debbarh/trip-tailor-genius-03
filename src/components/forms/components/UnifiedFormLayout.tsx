
import React from 'react';
import { GradientBackground, Container, Card } from '../../design/DesignSystem';
import UnifiedFormHeader from './UnifiedFormHeader';
import UnifiedProgressIndicator from './UnifiedProgressIndicator';

interface UnifiedFormLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  title: string;
  subtitle?: string;
  stepTitle: string;
  stepSubtitle?: string;
  children: React.ReactNode;
  navigation: React.ReactNode;
}

const UnifiedFormLayout = ({
  currentStep,
  totalSteps,
  onBack,
  title,
  subtitle,
  stepTitle,
  stepSubtitle,
  children,
  navigation
}: UnifiedFormLayoutProps) => {
  return (
    <GradientBackground>
      <UnifiedFormHeader 
        onBack={onBack} 
        title={title}
        subtitle={subtitle}
      />

      <div className="py-8">
        <Container size="md">
          <UnifiedProgressIndicator 
            currentStep={currentStep}
            totalSteps={totalSteps}
            className="mb-8"
          />
          
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              {stepTitle}
            </h2>
            {stepSubtitle && (
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                {stepSubtitle}
              </p>
            )}
          </div>

          <Card variant="elevated" className="mb-8">
            {children}
          </Card>

          {navigation}
        </Container>
      </div>
    </GradientBackground>
  );
};

export default UnifiedFormLayout;
