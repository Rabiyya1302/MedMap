import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Card,
  ProgressBar,
  Divider,
  useTheme,
  Button,
  FAB,
  Avatar,
} from 'react-native-paper';
import { useDiagnosis } from '../context/DiagnosisContext';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiagnosisResultsScreen() {
  const { diagnosis } = useDiagnosis();
  const theme = useTheme();
  const [fabOpen, setFabOpen] = React.useState(false);

  if (!diagnosis) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall" style={styles.noResultsText}>
          🚫 No diagnosis results available
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.goBackButton}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return '#facc15'; // amber-400
      case 'low':
        return '#4ade80'; // green-400
      default:
        return theme.colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Primary Diagnosis */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              🩺 Primary Diagnosis
            </Text>
            <View style={styles.primaryDiagnosis}>
              <Avatar.Icon icon="hospital-box" size={64} style={styles.avatar} />
              <Text variant="headlineMedium" style={styles.diseaseName}>
                {diagnosis.prediction.disease}
              </Text>
              <View style={styles.confidenceContainer}>
                <ProgressBar
                  progress={diagnosis.prediction.confidence}
                  color={getSeverityColor(diagnosis.prediction.severity)}
                  style={styles.progressBar}
                />
                <Text variant="bodyLarge" style={styles.confidenceText}>
                  {Math.round(diagnosis.prediction.confidence * 100)}% Confidence
                </Text>
              </View>
              <Text variant="bodyMedium" style={styles.description}>
                {diagnosis.prediction.description}
              </Text>
              <View
                style={[
                  styles.severityBadge,
                  { backgroundColor: getSeverityColor(diagnosis.prediction.severity) },
                ]}
              >
                <Text style={styles.severityText}>
                  {diagnosis.prediction.severity.toUpperCase()} Severity
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Detailed Analysis */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>📊 Detailed Analysis</Text>
            {diagnosis.probabilities.map((prob, index) => (
              <View key={index} style={styles.probabilityItem}>
                <View style={styles.probabilityHeader}>
                  <Text variant="titleMedium">{prob.disease}</Text>
                  <Text variant="bodyMedium">
                    {Math.round(prob.probability * 100)}%
                  </Text>
                </View>
                <ProgressBar
                  progress={prob.probability}
                  color={theme.colors.primary}
                  style={styles.progressBar}
                />
                <View style={styles.metricsContainer}>
                  <View style={styles.metricItem}>
                    <MaterialCommunityIcons name="robot" size={20} color={theme.colors.primary} />
                    <Text variant="labelSmall">ML Confidence</Text>
                    <Text variant="bodySmall">
                      {Math.round(prob.ml_confidence * 100)}%
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <MaterialCommunityIcons name="scale-balance" size={20} color={theme.colors.secondary} />
                    <Text variant="labelSmall">Rule Confidence</Text>
                    <Text variant="bodySmall">
                      {Math.round(prob.rule_confidence * 100)}%
                    </Text>
                  </View>
                </View>
                <Text variant="bodySmall" style={styles.symptomsText}>
                  Matched Symptoms: {prob.matched_symptoms.join(', ')}
                </Text>
                {index < diagnosis.probabilities.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Symptoms Analysis */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>🧪 Symptoms Analysis</Text>
            <View style={styles.symptomsAnalysis}>
              <View style={styles.symptomMetric}>
                <Text variant="headlineSmall">{diagnosis.symptoms.total}</Text>
                <Text variant="bodyMedium">Total</Text>
              </View>
              <View style={styles.symptomMetric}>
                <Text variant="headlineSmall">{diagnosis.symptoms.matched.length}</Text>
                <Text variant="bodyMedium">Matched</Text>
              </View>
              <View style={styles.symptomMetric}>
                <Text variant="headlineSmall">{diagnosis.symptoms.severity}</Text>
                <Text variant="bodyMedium">Severity</Text>
              </View>
            </View>
            <View style={styles.matchedSymptoms}>
              <Text variant="titleSmall">Matched Symptoms:</Text>
              <View style={styles.symptomsList}>
                {diagnosis.symptoms.matched.map((symptom, index) => (
                  <View key={index} style={styles.symptomTag}>
                    <Text style={styles.symptomText}>✅ {symptom}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Additional Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>ℹ️ Additional Info</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text variant="labelSmall">Model Version</Text>
                <Text variant="bodyMedium">{diagnosis.metadata.model_version}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text variant="labelSmall">Confidence Threshold</Text>
                <Text variant="bodyMedium">
                  {Math.round(diagnosis.metadata.confidence_threshold * 100)}%
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text variant="labelSmall">Timestamp</Text>
                <Text variant="bodyMedium">
                  {new Date(diagnosis.metadata.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          Back to Diagnosis
        </Button>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB.Group
        open={fabOpen}
        icon={fabOpen ? 'close' : 'plus'}
        actions={[
          {
            icon: 'home',
            label: 'Go to Home',
            onPress: () => router.replace('/'),
          },
          {
            icon: 'restart',
            label: 'Redo Diagnosis',
            onPress: () => router.replace('/diagnosis'),
          },
        ]}
        onStateChange={({ open }) => setFabOpen(open)}
        visible
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 12,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  avatar: {
    backgroundColor: '#e0f2fe',
    marginBottom: 12,
  },
  primaryDiagnosis: {
    alignItems: 'center',
    padding: 12,
  },
  diseaseName: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0f172a',
  },
  confidenceContainer: {
    width: '100%',
    marginVertical: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 6,
  },
  confidenceText: {
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    textAlign: 'center',
    marginTop: 12,
    color: '#475569',
  },
  severityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  severityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  probabilityItem: {
    marginBottom: 20,
  },
  probabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  metricItem: {
    alignItems: 'center',
    width: '48%',
  },
  symptomsText: {
    marginTop: 8,
    color: '#64748b',
  },
  divider: {
    marginVertical: 12,
  },
  symptomsAnalysis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  symptomMetric: {
    alignItems: 'center',
  },
  matchedSymptoms: {
    marginTop: 16,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  symptomTag: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  symptomText: {
    color: '#1e293b',
    fontSize: 13,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 14,
  },
  backButton: {
    margin: 20,
    marginBottom: 32,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#334155',
    marginHorizontal: 20,
  },
  goBackButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
