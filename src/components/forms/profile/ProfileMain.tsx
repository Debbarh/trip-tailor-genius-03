import { useState } from 'react';
import AuthenticationForm from './AuthenticationForm';
import UserDashboard from './UserDashboard';
import { UserProfile } from '@/types/recommendations';

interface ProfileMainProps {
  onBack?: () => void;
}

const ProfileMain = ({ onBack }: ProfileMainProps) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = (userData: UserProfile) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AuthenticationForm
        onAuthSuccess={handleAuthSuccess}
        onBack={onBack}
      />
    );
  }

  return (
    <UserDashboard
      user={user!}
      onLogout={handleLogout}
      onBack={onBack}
    />
  );
};

export default ProfileMain;