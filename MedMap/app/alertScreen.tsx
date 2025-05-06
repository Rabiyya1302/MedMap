import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    title: 'COVID-19 Update',
    description: 'New variants detected in your area. Stay cautious and follow guidelines.',
    date: '2024-06-01',
  },
  {
    id: '2',
    title: 'Flu Season Alert',
    description: 'Flu cases are rising. Consider getting your flu shot.',
    date: '2024-05-15',
  },
  {
    id: '3',
    title: 'Heatwave Warning',
    description: 'High temperatures expected this week. Stay hydrated and avoid outdoor activities during peak hours.',
    date: '2024-06-05',
  },
];

const AlertScreen: React.FC = () => {
  const theme = useTheme();

  const renderItem = ({ item }: { item: AlertItem }) => (
    <Card style={styles.card}>
      <Card.Title title={item.title} subtitle={item.date} />
      <Card.Content>
        <Text>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={mockAlerts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
});

export default AlertScreen;
