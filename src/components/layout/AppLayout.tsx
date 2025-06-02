
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import ProgressIndicator from "./ProgressIndicator";

interface AppLayoutProps {
  children: ReactNode;
  currentStep: string;
  onBack?: () => void;
  onHome?: () => void;
  showProgress?: boolean;
  steps?: string[];
  progressCount?: number;
  totalSteps?: number;
}

const AppLayout = ({ 
  children, 
  currentStep, 
  onBack, 
  onHome,
  showProgress = false,
  steps = [],
  progressCount = 0,
  totalSteps = 5
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header minimal */}
      {showProgress && (
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-6">
              {/* Bouton retour simple */}
              {onBack && (
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-gray-600 hover:text-black"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              )}
              
              {/* Logo minimal */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 relative">
                  <div className="w-4 h-4 border-2 border-black rounded-full absolute top-0 left-1"></div>
                  <div className="w-3 h-3 border-2 border-black rounded-full absolute top-0.5 left-1.5"></div>
                  <div className="w-0.5 h-2 bg-black absolute top-4 left-2.5"></div>
                  <div className="w-3 h-2 border-2 border-black border-t-0 rounded-b-lg absolute top-5 left-1.5"></div>
                </div>
                <span className="text-lg font-bold text-black">TASARINI</span>
              </div>

              {/* Bouton home */}
              {onHome && (
                <Button 
                  variant="ghost" 
                  onClick={onHome}
                  className="text-gray-600 hover:text-black"
                >
                  <Home className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Progress simple */}
            <ProgressIndicator 
              currentStep={currentStep} 
              steps={steps}
              progressCount={progressCount}
              totalSteps={totalSteps}
            />
          </div>
        </header>
      )}

      {/* Contenu principal */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
