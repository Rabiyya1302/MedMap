import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Modal, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Heatmap, Region, Details } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import { getDiseaseMapData } from '../services/types/api';
import SuperCluster from 'supercluster';
import { BlurView } from '@react-native-community/blur';
import { LineChart } from 'react-native-chart-kit';
import { useMapStore, useUIStore } from '../services/lib/store';
import type { MapFeature, MapFeatureProperties, MapCluster, DiseaseMapData } from '../types/map';

// Cache for storing API responses
const dataCache: {
    data: MapFeature[] | null;
    timestamp: number | null;
    CACHE_DURATION: number;
} = {
    data: null,
    timestamp: null,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

interface InteractiveMapProps {
    initialRegion?: Region;
}

const StatsModal = ({ visible, onClose, timeSeriesData }: { 
    visible: boolean; 
    onClose: () => void; 
    timeSeriesData: { labels: string[]; datasets: { data: number[] }[] } 
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsTitle}>Disease Statistics</Text>
                    <LineChart
                        data={timeSeriesData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={styles.chart}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({ initialRegion }) => {
    const { selectedDisease, selectedRegion, timeRange, setSelectedDisease, setSelectedRegion, setTimeRange } = useMapStore();
    const { setLoading, setError, loading: showLoading, error } = useUIStore();
    
    const [diseaseData, setDiseaseData] = useState<MapFeature[]>([]);
    const [clusters, setClusters] = useState<MapCluster[]>([]);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [timeSeriesData, setTimeSeriesData] = useState<{ labels: string[]; datasets: { data: number[] }[] }>({
        labels: [],
        datasets: [{ data: [] }]
    });

    const mapRef = useRef<MapView>(null);
    const superclusterRef = useRef<SuperCluster<MapFeature['properties']> | null>(null);
    const theme = useTheme();

    const loadDiseaseData = useCallback(async () => {
        try {
            setLoading(true);
            const filters = {
                disease: selectedDisease || undefined,
                region: selectedRegion || undefined,
                timeRange: timeRange ? `${timeRange.start.toISOString()}/${timeRange.end.toISOString()}` : undefined
            };
            const data = await getDiseaseMapData(filters);
            const mapData: MapFeature[] = data.map(item => ({
                type: 'Feature',
                properties: {
                    ...item,
                    cluster: false
                },
                geometry: {
                    type: 'Point',
                    coordinates: [item.longitude, item.latitude],
                },
            }));
            setDiseaseData(mapData);
            updateClusters(mapData);
            generateTimeSeriesData(mapData);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load disease data');
        } finally {
            setLoading(false);
        }
    }, [selectedDisease, selectedRegion, timeRange, setLoading, setError]);

    const updateClusters = (data: MapFeature[]) => {
        if (!superclusterRef.current) {
            superclusterRef.current = new SuperCluster<MapFeature['properties']>({
                radius: 40,
                maxZoom: 16,
            });
        }

        superclusterRef.current.load(data);
        const newClusters = superclusterRef.current.getClusters([-180, -90, 180, 90], 2);
        setClusters(newClusters as unknown as MapCluster[]);
    };

    const generateTimeSeriesData = (data: MapFeature[]) => {
        const casesByDate = data.reduce((acc, feature) => {
            const date = feature.properties.createdAt?.split('T')[0] || '';
            acc[date] = (acc[date] || 0) + feature.properties.cases;
            return acc;
        }, {} as Record<string, number>);

        const labels = Object.keys(casesByDate).sort();
        const cases = labels.map(date => casesByDate[date]);

        setTimeSeriesData({
            labels,
            datasets: [{ data: cases }],
        });
    };

    useEffect(() => {
        loadDiseaseData();
    }, [loadDiseaseData]);

    const getSeverityColor = (severity: 'low' | 'medium' | 'high'): string => {
        switch (severity) {
            case 'low':
                return '#4CAF50';
            case 'medium':
                return '#FFC107';
            case 'high':
                return '#F44336';
            default:
                return '#2196F3';
        }
    };

    const renderCluster = (cluster: MapCluster) => {
        const { properties } = cluster;
        const severity = properties.severity || 'mild';
        const pointCount = properties.point_count || properties.cases;
        
        return (
            <Marker
                key={cluster.properties.id}
                coordinate={{
                    latitude: cluster.geometry.coordinates[1],
                    longitude: cluster.geometry.coordinates[0]
                }}
                onPress={() => handleClusterPress(cluster)}
            >
                <View style={[
                    styles.cluster,
                    { backgroundColor: getSeverityColor(severity) }
                ]}>
                    <Text style={styles.clusterText}>{pointCount}</Text>
                </View>
            </Marker>
        );
    };

    const handleClusterPress = (cluster: MapCluster) => {
        setSelectedDisease(cluster.properties.disease || 'Multiple Cases');
        setSelectedRegion(cluster.properties.region || 'Multiple Regions');
    };

    const handleMarkerPress = (disease: DiseaseMapData) => {
        setSelectedDisease(disease.disease);
        setSelectedRegion(disease.region);
    };

    const handleHeatmapToggle = () => {
        setShowHeatmap(!showHeatmap);
    };

    const handleClusterToggle = () => {
        setShowHeatmap(false);
    };

    const renderHeatmap = () => {
        if (!showHeatmap) return null;
        
        const heatmapPoints = diseaseData.map(item => ({
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
            weight: item.properties.cases,
        }));

        return (
            <Heatmap
                points={heatmapPoints}
                radius={30}
                opacity={0.7}
            />
        );
    };

    const handleRegionChange = (region: Region) => {
        if (superclusterRef.current && diseaseData.length > 0) {
            const newClusters = superclusterRef.current.getClusters(
                [region.longitude - region.longitudeDelta, region.latitude - region.latitudeDelta,
                 region.longitude + region.longitudeDelta, region.latitude + region.latitudeDelta],
                Math.floor(Math.log2(360 / region.longitudeDelta))
            );
            setClusters(newClusters as unknown as MapCluster[]);
        }
    };

    return (
        <View style={styles.container}>
            {showLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading data...</Text>
                </View>
            )}

            {error && (
                <View style={styles.errorOverlay}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={loadDiseaseData}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onRegionChangeComplete={handleRegionChange}
                initialRegion={initialRegion}
            >
                {renderHeatmap()}
                {clusters.map(cluster => (
                    <Marker
                        key={cluster.id}
                        coordinate={{
                            latitude: cluster.geometry.coordinates[1],
                            longitude: cluster.geometry.coordinates[0],
                        }}
                        onPress={() => {
                            if (cluster.properties.cluster && superclusterRef.current) {
                                const children = superclusterRef.current.getLeaves(cluster.id, Infinity);
                                if (children) {
                                    setDiseaseData(children as unknown as MapFeature[]);
                                }
                            }
                        }}
                    >
                        <View style={[styles.marker, { backgroundColor: getSeverityColor(cluster.properties.severity) }]}>
                            <Text style={styles.markerText}>
                                {cluster.properties.cluster ? cluster.properties.point_count : cluster.properties.cases}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.controlButton, showHeatmap && styles.activeButton]}
                    onPress={handleHeatmapToggle}
                >
                    <Text style={styles.controlText}>
                        {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.controlButton, showHeatmap && styles.activeButton]}
                    onPress={() => setShowStats(true)}
                >
                    <Text style={styles.controlText}>Show Statistics</Text>
                </TouchableOpacity>
            </View>

            <StatsModal
                visible={showStats}
                onClose={() => setShowStats(false)}
                timeSeriesData={timeSeriesData}
            />

            {selectedDisease && (
                <View style={styles.diseaseInfo}>
                    <Text style={styles.diseaseTitle}>
                        {selectedDisease}
                    </Text>
                    <Text style={styles.diseaseLocation}>
                        Location: {selectedRegion}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    marker: {
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    cluster: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    markerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    controls: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
    },
    controlButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        elevation: 3,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    statsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: Platform.OS === 'web' ? '50%' : '90%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    closeButton: {
        marginTop: 20,
        padding: 12,
        backgroundColor: '#2196F3',
        borderRadius: 8,
        alignSelf: 'center',
        minWidth: 100,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        backgroundColor: '#fff',
        padding: 10,
    },
    diseaseInfo: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    diseaseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    diseaseLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeButton: {
        backgroundColor: '#007AFF',
    },
    controlText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    clusterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default InteractiveMap; 