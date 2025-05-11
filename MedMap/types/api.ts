export interface DiseaseMapData {
  id: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  region: string;
  latitude: number;
  longitude: number;
  cases: number;
  date: string;
  symptoms: string[];
  confidence: number;
}

export interface OutbreakAlert {
  id: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  region: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  error: string;
  message: string;
  status?: number;
}

export interface DiagnosisRequest {
  symptoms: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface DiagnosisResponse {
  query_symptoms: string[];
  possible_diseases: Array<{
    disease: string;
    confidence: string;
    health_tip_en: string;
  }>;
}

export interface DiagnosisHistory {
  results: DiagnosisResponse;
  symptoms: string[];
}

export const getDiagnosis = async (
  request: DiagnosisRequest
): Promise<DiagnosisResponse> => {
  const response = await apiCall<DiagnosisResponse>(
    "/api/report",
    "POST",
    request,
    10000
  );

  if (!response.query_symptoms || !response.possible_diseases) {
    throw new Error("Invalid response from server");
  }

  return response;
};

export type ApiErrorType =
  | "INVALID_INPUT"
  | "AUTH_ERROR"
  | "NETWORK_ERROR"
  | "SERVER_ERROR"
  | "MODEL_ERROR"
  | "API_ERROR"
  | "REQUEST_ERROR";

async function apiCall<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  request: any,
  timeout: number
): Promise<T> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    }
    throw new Error("An unknown error occurred");
  }
}

// ===============================
// ✅ AUTH SERVICES BELOW
// ===============================

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: 'user' | 'official'
): Promise<{ token: string; userData: any }> => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json(); // Should return { token, userData }
  } catch (error: any) {
    throw new Error(error.message || "An unknown error occurred during registration");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; userData: any }> => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // Should return { token, userData }
  } catch (error: any) {
    throw new Error(error.message || "An unknown error occurred during login");
  }
};
