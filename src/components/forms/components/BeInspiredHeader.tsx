
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

interface BeInspiredHeaderProps {
  onBack: () => void;
}

const BeInspiredHeader = ({ onBack }: BeInspiredHeaderProps) => {
  return (
    <header className="relative z-10 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">TASARINI</span>
        </div>

        <div className="w-24" />
      </nav>
    </header>
  );
};

export default BeInspiredHeader;
