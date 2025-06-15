
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BrandLogo from '@/components/layout/BrandLogo';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

const Signup = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // Simulation d'inscription - remplacer par vraie authentification
    console.log('Signup attempt:', { email, password });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('planTrip.previous')}</span>
          </Button>
          <LanguageSelector />
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <BrandLogo size={60} textSize="text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.createAccount')}</h1>
              <p className="text-gray-600">{t('auth.signup')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  {t('auth.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {t('auth.password')}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  {t('auth.confirmPassword')}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 h-12 rounded-xl border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium text-lg"
              >
                {t('auth.signup')}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('auth.hasAccount')}{' '}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  {t('auth.loginHere')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
