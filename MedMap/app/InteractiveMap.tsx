import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
}

interface RouteParams {
  diseaseName: string;
  locations: Location[];
}

const InteractiveMap: React.FC = () => {
  const route = useRoute();
  const { diseaseName, locations } = route.params as RouteParams;

  const initialRegion = {
    latitude: locations[0]?.latitude || 30.3753,
    longitude: locations[0]?.longitude || 69.3451,
    latitudeDelta: 6,
    longitudeDelta: 6,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            title={loc.city || `Location ${index + 1}`}
            description={`Reported cases of ${diseaseName}`}
            pinColor="#FF3B30"
          />
        ))}
      </MapView>

      <View style={styles.label}>
        <Text style={styles.labelText}>{diseaseName} - Affected Locations</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  label: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    zIndex: 999,
  },
  labelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InteractiveMap;
