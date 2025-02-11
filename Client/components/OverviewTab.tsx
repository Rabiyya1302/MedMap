import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import Chart from './Charts'; // Importing the Chart component

const { width: viewportWidth } = Dimensions.get('window');

interface OverviewTabProps {
  temperatureData: number[];
  glucoseData: number[];
  pressureData: number[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  temperatureData,
  glucoseData,
  pressureData,
}) => (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.OverviewTab}>
      <View style={styles.chartContainer}>
        <Chart title="Body Temperature (°C)" data={temperatureData} />
      </View>
      <View style={styles.chartContainer}>
        <Chart title="Blood Glucose Level (mg/dL)" data={glucoseData} />
      </View>
      <View style={styles.chartContainer}>
        <Chart title="Blood Pressure (mmHg)" data={pressureData} />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollContent: {
    padding: viewportWidth * 0.04,
    backgroundColor: "#F0F9F0" // Responsive padding
  },
  OverviewTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: viewportWidth * 0.05, // Responsive vertical padding
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    
  },
  chartContainer: {
    width: '100%', // Ensure charts take full width
    alignItems: 'center', // Center align the charts
    marginBottom: viewportWidth * 0.03, // Responsive margin between charts
  },
});

export default OverviewTab;
