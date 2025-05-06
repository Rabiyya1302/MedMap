import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import type { DiagnosisResult } from '../types/api';
import { Platform } from 'react-native';
import *as Location from "expo-location";
// For Android emulator, use 10.0.2.2 to access localhost
// For iOS simulator, use localhost
// For physical devices, use your computer's local IP
const getBaseUrl = () => {
  if (__DEV__) {
    return 'http://192.168.189.114:5000';  // Use the specified IP for all platforms
  }
  return 'https://api.medmap.com';  // Production
};

const API_BASE_URL = getBaseUrl();

interface DiagnosisContextType {
  symptoms: string[];
  diagnosis: DiagnosisResult | null;
  loading: boolean;
  error: string | null;
  addSymptom: (symptom: string) => void;
  removeSymptom: (symptom: string) => void;
  getDiagnosis: (location?:any) => Promise<void>;
  clearDiagnosis: () => void;
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSymptom = useCallback((symptom: string) => {
    if (symptom.trim() && !symptoms.includes(symptom.trim())) {
      setSymptoms(prev => [...prev, symptom.trim()]);
    }
  }, [symptoms]);

  const removeSymptom = useCallback((symptom: string) => {
    setSymptoms(prev => prev.filter(s => s !== symptom));
  }, []);

  const getDiagnosis = useCallback(async (location?:any):Promise<void> => {
    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {status}=await Location.requestForegroundPermissionsAsync();
      if(status!=="granted"){
        setError("Location permission denied.");
        setLoading(false);
        return;
      }
      const location=await Location.getCurrentPositionAsync({});
      const latitude=location.coords.latitude;
      const longitude=location.coords.longitude;
      console.log('Making request to:', `${API_BASE_URL}/api/ai/predict`);
      const response = await axios.post(`${API_BASE_URL}/api/ai/predict`, {
        text: symptoms.join(', '),
        location:{latitude,longitude}
      }, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      setDiagnosis(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error response:', err.response);
        console.error('Axios error request:', err.request);
        console.error('Axios error message:', err.message);
        if (err.code === 'ECONNABORTED') {
          setError('Request timed out. Please check your internet connection.');
        } else if (err.response) {
          setError(`Server error: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          setError('Could not connect to the server. Please check your internet connection and make sure the server is running.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Diagnosis error:', err);
    } finally {
      setLoading(false);
    }
  }, [symptoms]);

  const clearDiagnosis = useCallback(() => {
    setDiagnosis(null);
    setError(null);
  }, []);

  return (
    <DiagnosisContext.Provider
      value={{
        symptoms,
        diagnosis,
        loading,
        error,
        addSymptom,
        removeSymptom,
        getDiagnosis,
        clearDiagnosis
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (context === undefined) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
}; 