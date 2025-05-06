import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { loginUser, registerUser } from '../services/types/api';

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      // For now, we'll use the email as the ID since the API response doesn't include an ID
      setUser({
        id: email,
        email: email,
        displayName: email.split('@')[0], // Use the part before @ as display name
      });
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Failed to login');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string, phone: string) => {
    try {
      setLoading(true);
      const response = await registerUser(displayName, email, password, phone);
      // For now, we'll use the email as the ID since the API response doesn't include an ID
      setUser({
        id: email,
        email: email,
        displayName: displayName,
      });
    } catch (error: any) {
      Alert.alert('Registration Error', error.message || 'Failed to register');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setUser(null);
    } catch (error: any) {
      Alert.alert('Logout Error', error.message || 'Failed to logout');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 