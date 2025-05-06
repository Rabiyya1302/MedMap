import React from 'react';
import { View, StyleSheet, FlatList, Platform, Dimensions } from 'react-native';
import { Text, Card, useTheme, Title, Paragraph } from 'react-native-paper';

interface MockDataItem {
  id: string;
  title: string;
  description: string;
  emoji?: string;
}

const mockData: MockDataItem[] = [
  { id: '1', title: 'Symptom Tracker', description: 'Track your symptoms easily and get insights.', emoji: '📝' },
  { id: '2', title: 'Diagnosis History', description: 'View your past diagnoses and treatments.', emoji: '📋' },
  { id: '3', title: 'Health Alerts', description: 'Stay informed with the latest health alerts.', emoji: '🔔' },
];

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const colors = theme.colors;
  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }: { item: MockDataItem }) => (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          width: screenWidth - 40,
          ...Platform.select({
            android: { elevation: 3 },
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
          }),
        },
      ]}
      mode="elevated"
    >
      <Card.Content>
        <Title style={[styles.cardTitle, { color: colors.onSurface }]}>
          {item.emoji} {item.title}
        </Title>
        <Paragraph style={[styles.cardDescription, { color: colors.onSurfaceVariant }]}>
          {item.description}
        </Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.primary }]}>Welcome Back 👋</Text>
      <Text style={[styles.subHeader, { color: colors.onBackground }]}>
        Here's a quick overview of your health features
      </Text>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 48,
  },
  subHeader: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 24,
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  card: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
});

export default HomeScreen;
