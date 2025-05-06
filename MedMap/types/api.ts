export interface DiseaseMapData {
    id: string
    disease: string
    severity: 'low' | 'medium' | 'high'
    region: string
    latitude: number
    longitude: number
    cases: number
    date: string
    symptoms: string[]
    confidence: number
}

export interface OutbreakAlert {
    id: string
    disease: string
    severity: 'low' | 'medium' | 'high'
    region: string
    description: string
    timestamp: string
    read: boolean
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

export interface DiagnosisHistory {
    results: DiagnosisResult;
    symptoms: string[];
    patientInfo?: DiagnosisRequest['patientInfo'];
}

export type ApiErrorType = 
    | 'INVALID_INPUT'
    | 'AUTH_ERROR'
    | 'NETWORK_ERROR'
    | 'SERVER_ERROR'
    | 'MODEL_ERROR'
    | 'API_ERROR'
    | 'REQUEST_ERROR'; 