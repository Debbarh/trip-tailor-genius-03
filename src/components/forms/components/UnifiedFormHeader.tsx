
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";
import { Container } from '../../design/DesignSystem';

interface UnifiedFormHeaderProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
}

const UnifiedFormHeader = ({ onBack, title, subtitle }: UnifiedFormHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          
          <div className="text-center">
            <BrandLogo textSize="text-xl" />
            {title && (
              <div className="mt-2">
                <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-neutral-600">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          <div className="w-24" />
        </nav>
      </Container>
    </header>
  );
};

export default UnifiedFormHeader;
