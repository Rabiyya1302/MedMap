import type { PointFeature, ClusterFeature } from 'supercluster';
import type { Feature, Point } from 'geojson';

export interface DiseaseData {
    disease: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    latitude: number;
    longitude: number;
    region: string;
    timestamp: string;
}

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

export interface MapFeatureProperties extends DiseaseMapData {
    cluster: boolean;
    point_count?: number;
}

export interface MapFeature {
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    properties: MapFeatureProperties;
}

export interface MapClusterProperties extends MapFeatureProperties {
    cluster_id: number;
    point_count: number;
    cluster: boolean;
}

export interface MapCluster {
    type: 'Feature';
    id: number;
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
    properties: MapClusterProperties;
}

export interface MapFilters {
    disease?: string;
    region?: string;
    startDate?: string;
    endDate?: string;
    showHeatmap?: boolean;
    showClusters?: boolean;
}

export interface MapState {
    selectedDisease: string | null;
    selectedRegion: string | null;
    timeRange: { start: Date; end: Date } | null;
    setSelectedDisease: (disease: string | null) => void;
    setSelectedRegion: (region: string | null) => void;
    setTimeRange: (timeRange: { start: Date; end: Date } | null) => void;
} 