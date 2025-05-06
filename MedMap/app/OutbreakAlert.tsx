import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

interface Alert {
  id: string;
  disease: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  latitude: number;
  longitude: number;
}

const mockData: Alert[] = [
  {
    id: '1',
    disease: 'Dengue Fever',
    region: 'Lahore, Pakistan',
    severity: 'high',
    description: 'A high number of Dengue fever cases have been reported in Lahore.',
    latitude: 31.5497,
    longitude: 74.3436,
  },
  {
    id: '2',
    disease: 'COVID-19',
    region: 'Karachi, Pakistan',
    severity: 'critical',
    description: 'COVID-19 cases are rising rapidly in Karachi, hospitals are overwhelmed.',
    latitude: 24.8607,
    longitude: 67.0011,
  },
  {
    id: '3',
    disease: 'Cholera',
    region: 'Rawalpindi, Pakistan',
    severity: 'medium',
    description: 'Several cases of Cholera have been confirmed in Rawalpindi.',
    latitude: 33.5651,
    longitude: 73.0169,
  },
  {
    id: '4',
    disease: 'Malaria',
    region: 'Islamabad, Pakistan',
    severity: 'low',
    description: 'Malaria cases have slightly increased in Islamabad, but are under control.',
    latitude: 33.6844,
    longitude: 73.0479,
  },
];

const getSeverityColor = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
      return '#FF2A68';
    case 'high':
      return '#FF8C00';
    case 'medium':
      return '#FFD700';
    case 'low':
      return '#32CD32';
    default:
      return '#90EE90';
  }
};

const getSeverityIcon = (severity: string): keyof typeof Ionicons.glyphMap => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'alert-circle';
    case 'high':
      return 'warning';
    case 'medium':
      return 'information-circle';
    case 'low':
      return 'checkmark-circle';
    default:
      return 'help-circle';
  }
};

const OutbreakAlertMapScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setAlerts(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outbreak Alerts</Text>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 30.3753,
          longitude: 69.3451,
          latitudeDelta: 6,
          longitudeDelta: 6,
        }}
      >
        {alerts.map((alert) => (
          <Marker
            key={alert.id}
            coordinate={{ latitude: alert.latitude, longitude: alert.longitude }}
            title={alert.disease}
            description={alert.description}
            pinColor={getSeverityColor(alert.severity)}
          />
        ))}

        <Heatmap
          points={alerts.map((alert) => ({
            latitude: alert.latitude,
            longitude: alert.longitude,
            weight: alert.severity === 'critical' ? 1.0 :
                    alert.severity === 'high' ? 0.75 :
                    alert.severity === 'medium' ? 0.5 : 0.3,
          }))}
          radius={50}
          opacity={0.6}
          gradient={{
            colors: ['green', 'yellow', 'orange', 'red'],
            startPoints: [0.1, 0.3, 0.5, 0.9],
            colorMapSize: 256,
          }}
        />
      </MapView>

      <ScrollView style={styles.alertList}>
        {alerts.map((alert) => (
          <View
            key={alert.id}
            style={[styles.alertItem, { borderLeftColor: getSeverityColor(alert.severity) }]}
          >
            <View style={styles.alertHeader}>
              <Ionicons
                name={getSeverityIcon(alert.severity)}
                size={20}
                color={getSeverityColor(alert.severity)}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.alertTitle}>{alert.disease}</Text>
            </View>
            <Text style={styles.alertRegion}>{alert.region}</Text>
            <Text style={styles.alertDescription}>{alert.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  map: {
    height: 300,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  alertList: {
    padding: 16,
  },
  alertItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 6,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  alertRegion: {
    fontSize: 14,
    color: '#ccc',
  },
  alertDescription: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OutbreakAlertMapScreen;
