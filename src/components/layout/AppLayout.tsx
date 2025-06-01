
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import NavigationBreadcrumb from "./NavigationBreadcrumb";
import ProgressIndicator from "./ProgressIndicator";

interface AppLayoutProps {
  children: ReactNode;
  currentStep: string;
  onBack?: () => void;
  onHome?: () => void;
  showProgress?: boolean;
  steps?: string[];
}

const AppLayout = ({ 
  children, 
  currentStep, 
  onBack, 
  onHome,
  showProgress = false,
  steps = []
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50 to-rose-50">
      {/* Header persistant */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Navigation gauche */}
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
              )}
              {onHome && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onHome}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Home className="w-4 h-4" />
                  Accueil
                </Button>
              )}
            </div>

            {/* Logo/Titre central */}
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Votre Voyage de Rêve
              </h1>
            </div>

            {/* Actions droite */}
            <div className="w-32 flex justify-end">
              {showProgress && (
                <div className="text-sm text-gray-500">
                  {currentStep}
                </div>
              )}
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="pb-4">
            <NavigationBreadcrumb currentStep={currentStep} />
          </div>

          {/* Progress Indicator */}
          {showProgress && steps.length > 0 && (
            <div className="pb-4">
              <ProgressIndicator currentStep={currentStep} steps={steps} />
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
