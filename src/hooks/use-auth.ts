
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'support';
  image?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  error: string | null;
}

// Mock user for development
const mockUser: User = {
  id: 'user-001',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  image: '/placeholder.svg',
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser(mockUser);
    } catch (err) {
      setError('Authentication failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    // Mock sign out
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
    isLoading,
    error,
  };
};
