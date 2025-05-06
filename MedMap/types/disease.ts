export interface DiseaseMapData {
    id: string;
    disease: string;
    severity: 'low' | 'medium' | 'high';
    confidence: number;
    latitude: number;
    longitude: number;
    region: string;
    cases: number;
    createdAt?: string;
}

export interface OutbreakAlert {
    id: string;
    disease: string;
    severity: 'low' | 'medium' | 'high';
    region: string;
    cases: number;
    timestamp: string;
}

export interface DiseaseMapFilters {
    showHeatmap?: boolean;
    showClusters?: boolean;
    timeRange?: string;
    region?: string;
    disease?: string;
} 