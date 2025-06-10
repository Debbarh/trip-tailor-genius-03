
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/layout/BrandLogo";

const Program = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Accueil
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
            Nos
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
              Programmes
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez nos programmes de voyage soigneusement conçus pour créer des expériences inoubliables
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Program 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Escapade Week-end</h3>
            <p className="text-gray-600 mb-6">
              Programmes courts de 2-3 jours pour découvrir une destination proche
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                2-3 jours
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                Destinations européennes
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                2-8 personnes
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Découvrir
            </Button>
          </div>

          {/* Program 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mb-6">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Voyage Découverte</h3>
            <p className="text-gray-600 mb-6">
              Explorations de 7-10 jours pour s'immerger dans une nouvelle culture
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-purple-500" />
                7-10 jours
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                Destinations mondiales
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-purple-500" />
                4-12 personnes
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Découvrir
            </Button>
          </div>

          {/* Program 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 hover:bg-white/95 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-orange-100 rounded-3xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aventure Prolongée</h3>
            <p className="text-gray-600 mb-6">
              Voyages de 2-3 semaines pour une immersion totale et transformatrice
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-pink-500" />
                14-21 jours
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                Destinations exotiques
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2 text-pink-500" />
                6-15 personnes
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700">
              Découvrir
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Prêt à créer votre programme personnalisé ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-2xl">
                Planifier mon voyage
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="px-8 py-4 text-lg rounded-2xl border-2">
                Être inspiré
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Program;
