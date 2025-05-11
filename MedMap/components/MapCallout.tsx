// components/MapCallout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Report {
  disease: string;
  symptoms: string[];
  severity?: string;
}

const MapCallout = ({ report }: { report: Report }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{report.disease}</Text>
    <Text>Symptoms: {report.symptoms.join(', ')}</Text>
    <Text>Severity: {report.severity || 'Unknown'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { width: 200 },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default MapCallout;
