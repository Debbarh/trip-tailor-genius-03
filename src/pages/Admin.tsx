
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Settings, Database, Users, MapPin, Calendar, Hotel, Utensils, FileText, Globe } from 'lucide-react';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import CountriesGrid from '@/components/admin/CountriesGrid';
import CitiesGrid from '@/components/admin/CitiesGrid';
import PreferencesGrid from '@/components/admin/PreferencesGrid';
import ProgramsGrid from '@/components/admin/ProgramsGrid';
import ToursGrid from '@/components/admin/ToursGrid';
import WebPagesGrid from '@/components/admin/WebPagesGrid';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('countries');

  const adminSections = [
    { id: 'countries', label: 'Pays', icon: Globe, count: 45, description: 'Gestion des pays et destinations' },
    { id: 'cities', label: 'Villes', icon: MapPin, count: 127, description: 'Villes et informations locales' },
    { id: 'preferences', label: 'Préférences', icon: Users, count: 89, description: 'Préférences utilisateurs' },
    { id: 'programs', label: 'Programmes', icon: Calendar, count: 34, description: 'Itinéraires générés' },
    { id: 'tours', label: 'Tours', icon: Hotel, count: 23, description: 'Circuits et packages' },
    { id: 'pages', label: 'Pages Web', icon: FileText, count: 12, description: 'Contenu CMS' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-white/20 bg-white/30 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <BrandLogo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/countries" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Pays
            </Link>
            <Link to="/admin" className="text-purple-600 font-medium flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin
            </Link>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">
            Administration
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
              Backend
            </span>
          </h1>
          <p className="text-xl text-gray-700 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Gestion complète de vos données
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminSections.map((section) => (
            <Card 
              key={section.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activeTab === section.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'bg-white/80'
              }`}
              onClick={() => setActiveTab(section.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-purple-600" />
                    {section.label}
                  </div>
                  <Badge variant="secondary">{section.count}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Management Tabs */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/30">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
              {adminSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="p-6">
              <TabsContent value="countries">
                <CountriesGrid />
              </TabsContent>

              <TabsContent value="cities">
                <CitiesGrid />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesGrid />
              </TabsContent>

              <TabsContent value="programs">
                <ProgramsGrid />
              </TabsContent>

              <TabsContent value="tours">
                <ToursGrid />
              </TabsContent>

              <TabsContent value="pages">
                <WebPagesGrid />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
