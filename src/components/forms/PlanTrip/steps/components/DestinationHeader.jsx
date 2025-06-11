
import React from 'react';
import { Globe } from 'lucide-react';

export default function DestinationHeader() {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
        <Globe className="w-10 h-10 text-white" />
      </div>
      <div>
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Planifiez votre voyage multi-destinations
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Sélectionnez vos pays, configurez vos villes et définissez vos dates pour créer votre voyage de rêve
        </p>
      </div>
    </div>
  );
}
