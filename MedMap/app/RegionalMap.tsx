import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Card, Title, useTheme, Text, Chip } from 'react-native-paper';

interface DiseaseCluster {
  id: string;
  latitude: number;
  longitude: number;
  disease: string;
  count: number;
}

interface RegionalMapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  diseaseClusters: DiseaseCluster[];
}

const RegionalMap: React.FC<RegionalMapProps> = ({
  initialRegion,
  diseaseClusters,
}) => {
  const [mapType, setMapType] = useState<'standard' | 'heatmap'>('standard');
  const [selectedCluster, setSelectedCluster] = useState<DiseaseCluster | null>(null);
  const theme = useTheme();

  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'heatmap' : 'standard');
  };

  const handleMarkerPress = (cluster: DiseaseCluster) => {
    setSelectedCluster(cluster);
  };

  const getDiseaseColor = (disease: string) => {
    const nameHash = disease.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    const colors = [
      theme.colors.primary,
      theme.colors.secondary,
      '#F59E0B',
      theme.colors.error,
      '#8B5CF6',
    ];

    return colors[Math.abs(nameHash) % colors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.placeholderText}>Map View (Mobile Preview)</Text>
        <Text style={styles.placeholderSubtext}>
          {diseaseClusters.length} disease clusters loaded
        </Text>
        <Text style={styles.placeholderInfo}>
          This is a placeholder for the map view.
          The actual map will be displayed with react-native-maps or similar.
        </Text>

        <View style={styles.clustersPreview}>
          {diseaseClusters.map((cluster) => (
            <View
              key={cluster.id}
              style={[
                styles.clusterMarker,
                { backgroundColor: getDiseaseColor(cluster.disease) },
              ]}
              onTouchEnd={() => handleMarkerPress(cluster)}
            >
              <Text style={styles.clusterText}>{cluster.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {selectedCluster && (
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>{selectedCluster.disease}</Title>
            <View style={styles.chipRow}>
              <Chip
                icon="alert-circle"
                style={[
                  styles.countChip,
                  { backgroundColor: getDiseaseColor(selectedCluster.disease) },
                ]}
              >
                {selectedCluster.count} reported cases
              </Chip>
            </View>
            <Text style={styles.locationText}>
              Location: {selectedCluster.latitude.toFixed(4)}, {selectedCluster.longitude.toFixed(4)}
            </Text>
          </Card.Content>
        </Card>
      )}

      <FAB
        icon={mapType === 'standard' ? 'map-outline' : 'map-marker'}
        style={styles.fab}
        onPress={toggleMapType}
        label={mapType === 'standard' ? 'Heatmap' : 'Markers'}
        color={theme.colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    marginBottom: 20,
  },
  placeholderInfo: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: 300,
  },
  clustersPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  clusterMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  clusterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  infoCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 76,
    elevation: 4,
  },
  chipRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  countChip: {
    marginRight: 8,
  },
  locationText: {
    marginTop: 8,
    opacity: 0.7,
  },
});

export default RegionalMap;
