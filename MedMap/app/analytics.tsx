import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Header from '@/components/Header';

interface AnalyticsCardData {
  title: string;
  value: number;
  change: string;
  icon: string;
}

const data: AnalyticsCardData[] = [
  {
    title: 'Daily Cases',
    value: 120,
    change: '+10%',
    icon: '📈',
  },
  {
    title: 'Recovered',
    value: 95,
    change: '+5%',
    icon: '❤️',
  },
  {
    title: 'Deaths',
    value: 5,
    change: '-2%',
    icon: '💀',
  },
];

const Analytics: React.FC<{ navigation: any }> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Header
        title="Analytics"
        leftIcon="arrow-left"
        onLeftIconPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map(({ title, value, change, icon }, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title
              title={title}
              left={() => (
                <Text style={styles.icon}>{icon}</Text>
              )}
            />
            <Card.Content>
              <Text variant="titleLarge">{value}</Text>
              <Text
                variant="bodySmall"
                style={[styles.changeText, { color: theme.colors.primary }]}
              >
                Change: {change}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
    marginLeft: 8,
    marginTop: 4,
  },
  changeText: {
    marginTop: 4,
  },
});
