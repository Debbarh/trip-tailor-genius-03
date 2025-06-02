
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, Phone, User } from "lucide-react";
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
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo TASARINI */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 relative">
                  <div className="w-6 h-6 border-2 border-black rounded-full absolute top-0 left-1"></div>
                  <div className="w-4 h-4 border-2 border-black rounded-full absolute top-1 left-2"></div>
                  <div className="w-1 h-3 bg-black absolute top-6 left-3.5"></div>
                  <div className="w-5 h-3 border-2 border-black border-t-0 rounded-b-lg absolute top-8 left-1.5"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-black">TASARINI</span>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-cyan-600 font-medium"
                onClick={onHome}
              >
                Plan Your Trip
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-cyan-600 font-medium"
              >
                Be Inspired
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-cyan-600 font-medium"
              >
                Tours
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-cyan-600 font-medium"
              >
                Page d'accueil
              </Button>
              <Button 
                variant="ghost" 
                className="text-gray-700 hover:text-cyan-600 font-medium"
              >
                Contactez-nous
              </Button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                +1 555-555-5556
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Se connecter
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6">
                Contactez-nous
              </Button>
            </div>
          </div>

          {/* Progress Section */}
          {showProgress && (
            <div className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{currentStep}</h1>
                <div className="text-sm text-gray-500">
                  {progressCount} of {totalSteps} Completed
                </div>
              </div>
              <ProgressIndicator 
                currentStep={currentStep} 
                steps={steps}
                progressCount={progressCount}
                totalSteps={totalSteps}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
