import React from 'react';
import RegionalMap from './RegionalMap';

export default function RegionalMapScreen() {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const diseaseClusters = [
    {
      id: '1',
      latitude: 37.78825,
      longitude: -122.4324,
      disease: 'Influenza',
      count: 5,
    },
    {
      id: '2',
      latitude: 37.78925,
      longitude: -122.4334,
      disease: 'COVID-19',
      count: 3,
    },
  ];

  return <RegionalMap initialRegion={initialRegion} diseaseClusters={diseaseClusters} />;
} 