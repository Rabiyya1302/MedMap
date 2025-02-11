import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface ChartProps {
  title: string;
  data: number[];
}

const viewportWidth = Dimensions.get('window').width;

const Chart: React.FC<ChartProps> = ({ title, data }) => (
  <View style={styles.chartContainer}>
    <Text style={styles.chartTitle}>{title}</Text>
    <BarChart
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ data: data || [0, 0, 0, 0, 0, 0, 0] }],
      }}
      width={viewportWidth - 30}
      height={200}
      chartConfig={chartConfig}
      style={styles.chart}
      yAxisLabel={""}
      yAxisSuffix={""}
    />
  </View>
);

/* Chart Config */
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(27, 102, 5, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.6,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default Chart;
