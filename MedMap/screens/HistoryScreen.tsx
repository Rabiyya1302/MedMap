import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, List, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDiagnosis } from '../context/DiagnosisContext';

interface HistoryScreenProps {
  navigation: any;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { diagnosisHistory } = useDiagnosis();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
          Diagnosis History
        </Text>
      </Surface>

      <View style={styles.content}>
        {diagnosisHistory.length === 0 ? (
          <Surface style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
            <MaterialCommunityIcons
              name="history"
              size={48}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text variant="titleMedium" style={[styles.emptyText, { color: theme.colors.onSurface }]}>
              No diagnosis history yet
            </Text>
            <Text variant="bodyMedium" style={[styles.emptySubtext, { color: theme.colors.onSurface }]}>
              Your past diagnoses will appear here
            </Text>
          </Surface>
        ) : (
          diagnosisHistory.map((diagnosis, index) => (
            <Surface
              key={index}
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <List.Item
                title={diagnosis.disease}
                description={`Confidence: ${(diagnosis.confidence * 100).toFixed(1)}%`}
                left={props => (
                  <MaterialCommunityIcons
                    {...props}
                    name="medical-bag"
                    size={24}
                    color={theme.colors.primary}
                  />
                )}
                onPress={() => navigation.navigate('Diagnosis', { diagnosis })}
              />
            </Surface>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  emptyCard: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
    marginTop: 32,
  },
  icon: {
    marginBottom: 16,
  },
  emptyText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    opacity: 0.7,
  },
});

export default HistoryScreen; 