import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  token: string | null;
  userEmail: string | null;
  isAdmin: boolean;
  login: (token: string, email: string, isAdmin: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('auth_token');
      const storedEmail = await SecureStore.getItemAsync('user_email');
      const storedIsAdmin = await SecureStore.getItemAsync('is_admin');
      
      if (storedToken && storedEmail) {
        setToken(storedToken);
        setUserEmail(storedEmail);
        setIsAdmin(storedIsAdmin === 'true');
      }
    } catch (error) {
      console.error('Failed to load auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string, email: string, admin: boolean) => {
    try {
      await SecureStore.setItemAsync('auth_token', newToken);
      await SecureStore.setItemAsync('user_email', email);
      await SecureStore.setItemAsync('is_admin', admin.toString());
      
      setToken(newToken);
      setUserEmail(email);
      setIsAdmin(admin);
    } catch (error) {
      console.error('Failed to save auth data:', error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('user_email');
      await SecureStore.deleteItemAsync('is_admin');
      
      setToken(null);
      setUserEmail(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};