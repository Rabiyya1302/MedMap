import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import axios from 'axios';

interface AlertType {
  id: string;
  disease: string;
  region: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  latitude: number;
  longitude: number;
}

const getSeverityColor = (severity: AlertType['severity']) => {
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
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to fetch alerts.');
          setLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        const response = await axios.get('http://localhost:5000/alert', {
          params: { latitude, longitude },
        });

        // Assuming backend returns { message: string } - adapt if backend returns alerts array
        // For demo, create a dummy alert based on message
        if (response.data.message === 'Red zone alert triggered!') {
          setAlerts([
            {
              id: '1',
              disease: 'Red Zone Alert',
              region: 'Your Area',
              severity: 'high',
              description: 'High severity alert in your area.',
              latitude,
              longitude,
            },
          ]);
        } else {
          setAlerts([]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch alerts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
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
            weight:
              alert.severity === 'critical'
                ? 1.0
                : alert.severity === 'high'
                ? 0.75
                : alert.severity === 'medium'
                ? 0.5
                : 0.3,
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
        {alerts.length === 0 ? (
          <Text style={styles.noAlerts}>No alerts in your area.</Text>
        ) : (
          alerts.map((alert) => (
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
          ))
        )}
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
  noAlerts: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OutbreakAlertMapScreen;
