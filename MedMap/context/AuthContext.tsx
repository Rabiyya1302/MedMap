import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../services/types/api';

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'official';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
    phone: string,
    role: 'user' | 'official'
  ) => Promise<void>;
  logout: () => Promise<void>;
}

interface LoginResponse {
  token: string;
  userData: User;
}

interface RegisterResponse {
  token: string;
  userData: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const user = JSON.parse(await AsyncStorage.getItem('user') || '{}');
          setUser(user);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser(email, password) as LoginResponse;

      const { token, userData } = response;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
    } catch (error: any) {
      Alert.alert('Login Error', error.message || 'Failed to login');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (
    email: string,
    password: string,
    displayName: string,
    phone: string,
    role: 'user' | 'official',
    adminSecret?: string
  ) => {
    try {
      setLoading(true);
      const response = await registerUser(displayName, email, password, role, adminSecret) as RegisterResponse;

      const { token, userData } = response;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);
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
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
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
