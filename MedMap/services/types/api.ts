// API service to interact with the backend
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore, useMapStore, useUIStore } from '../lib/store';
import type { DiseaseMapData, MapFilters } from '../../types/map';
import type { Alert } from '../../types/alert';

// Error response interface
interface ErrorResponse {
  message?: string;
  detail?: string;
}
export type OutbreakAlert={
  id:string;
  title:string;
  description:string;
  date:Date;
}

// Get API URL from environment or use default
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.189.114:5000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global response error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const errorData = error.response.data;
      const errorMessage =
        errorData?.message || errorData?.detail || 'An error occurred';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error(
        'No response from server. Please check your connection and ensure the backend server is running on port 3000.'
      );
    } else {
      throw new Error('Request failed. Please try again.');
    }
  }
);

// Retry logic
apiClient.interceptors.response.use(null, async (error: AxiosError) => {
  const config = error.config as AxiosRequestConfig & { retryCount?: number };

  if (!config) return Promise.reject(error);

  const retryCount = config.retryCount || 0;
  const maxRetries = 2;

  if (retryCount >= maxRetries) return Promise.reject(error);

  config.retryCount = retryCount + 1;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return apiClient(config);
});

// Error wrapper
export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Cache definitions
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATIONS = {
  diseaseMap: 5 * 60 * 1000,
  outbreakAlerts: 30 * 1000,
  diagnosis: 0,
  diagnosisHistory: 5 * 60 * 1000,
};

const cache: Record<string, CacheEntry<any>> = {};

// API call helper
async function apiCall<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any,
  cacheDuration: number = CACHE_DURATIONS.diseaseMap
): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      method,
      url: endpoint,
      data: method === 'POST' || method === 'PUT' ? data : undefined,
      params: method === 'GET' ? data : undefined,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please try again.');
      }
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your connection.');
      }
      const errorData = error.response?.data as ErrorResponse;
      throw new Error(errorData?.message || 'Server error');
    }
    throw error;
  }
}

// Auth API
export const loginUser = (email: string, password: string) =>
  apiCall('/api/users/login', 'POST', { email, password });

export const registerUser = (name: string, email: string, password: string, role: string, adminSecret?: string) =>
  apiCall('/api/auth/register', 'POST', { name, email, password, role, adminSecret });

export const getUserProfile = (userId: string): Promise<any> =>
  apiCall(`/api/users/profile/${userId}`, 'GET', undefined, 0);

// Diagnosis types
export interface DiagnosisRequest {
  symptoms: string[];
  patientInfo?: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    medicalHistory?: string[];
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: 'severe' | 'moderate' | 'mild';
  recommendedActions: string[];
  symptoms: string[];
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  outbreakRisk?: {
    level: 'high' | 'medium' | 'low';
    region: string;
    cases: number;
  };
}

// Prediction type
export interface PredictionResponse {
  prediction: {
    disease: string;
    confidence: number;
    severity: string;
    description: string;
  };
  probabilities: Array<{
    disease: string;
    probability: number;
    matched_symptoms: string[];
    ml_confidence: number;
    rule_confidence: number;
  }>;
  symptoms: {
    matched: string[];
    total: number;
    severity: string;
  };
  metadata: {
    timestamp: string;
    model_version: string;
    confidence_threshold: number;
  };
}

// Diagnosis API
export const getDiagnosis = async (
  request: DiagnosisRequest
): Promise<DiagnosisResult> => {
  const response = await apiCall<DiagnosisResult>(
    '/api/diagnosis',
    'POST',
    request,
    0
  );

  if (!response.disease || !response.confidence) {
    throw new Error('Invalid response from diagnosis service');
  }

  return response;
};

export const submitSymptoms = async (
  symptoms: string[],
  patientInfo?: any
): Promise<PredictionResponse> => {
  try {
    const response = await apiClient.post('/api/ai/predict', {
      text: symptoms.join(', '),
    });
    return response.data;
  } catch (error: any) {
    throw new ApiError(error?.message || 'Failed to submit symptoms');
  }
};

export const getDiagnosisHistory = async (): Promise<DiagnosisResult[]> => {
  try {
    const response = await apiClient.get('/diagnosis/history');
    return response.data;
  } catch (error: any) {
    throw new ApiError(error?.message || 'Failed to fetch diagnosis history');
  }
};

export const getDiagnosisById = async (
  diagnosisId: string
): Promise<DiagnosisResult> => {
  try {
    return await apiCall<DiagnosisResult>(`/diagnosis/${diagnosisId}`, 'GET');
  } catch (error: any) {
    if (
      error instanceof Error &&
      error.message.includes('Failed to connect to diagnosis service')
    ) {
      throw new Error(
        'Unable to retrieve diagnosis details. The service is currently unavailable.'
      );
    }
    throw error;
  }
};

// Disease Map API
export const getAllDiseaseMapData = async (): Promise<DiseaseMapData[]> =>
  apiCall('/disease-map');

export const getDiseasesByRegion = async (
  region: string
): Promise<DiseaseMapData[]> =>
  apiCall(`/disease-map/region/${region}`);

export const getDiseasesByType = async (
  diseaseType: string
): Promise<DiseaseMapData[]> =>
  apiCall(`/disease-map/disease/${diseaseType}`);

export const getDiseaseMapData = async (
  filters?: MapFilters
): Promise<DiseaseMapData[]> => apiCall('/disease-map', 'GET', filters);

export const addDiseaseOutbreak = async (
  diseaseData: DiseaseMapData
): Promise<DiseaseMapData> =>
  apiCall('/api/disease-map', 'POST', diseaseData, 0);

export const createDiseaseMapData = async (
  diseaseData: Partial<DiseaseMapData>
): Promise<DiseaseMapData> =>
  apiCall('/api/disease-map', 'POST', diseaseData, 0);

export const getOutbreakAlerts = async (): Promise<Alert[]> =>
  apiCall('/api/outbreak-alerts', 'GET', undefined, CACHE_DURATIONS.outbreakAlerts);

// User Settings
export interface UserSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
  language: string;
}

export const api = {
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  predict: async (symptoms: string): Promise<PredictionResponse> => {
    const response = await apiClient.post('/api/ai/predict', { text: symptoms });
    return response.data;
  },

  getSettings: async (): Promise<UserSettings> => {
    const response = await apiClient.get('/settings');
    return response.data;
  },

  updateSettings: async (settings: Partial<UserSettings>) => {
    const response = await apiClient.put('/settings', settings);
    return response.data;
  },

  updateSetting: async (setting: string, value: any) => {
    const response = await apiClient.patch(`/settings/${setting}`, { value });
    return response.data;
  },
};
