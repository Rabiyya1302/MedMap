import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface AlertContextType {
  showAlert: (title: string, message: string) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showAlert = useCallback((title: string, message: string) => {
    Alert.alert(title, message);
  }, []);

  const showError = useCallback((message: string) => {
    Alert.alert('Error', message);
  }, []);

  const showSuccess = useCallback((message: string) => {
    Alert.alert('Success', message);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        showError,
        showSuccess,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}; 