import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, ProgressBar, Divider, useTheme, Button } from 'react-native-paper';
import { useDiagnosis } from '../context/DiagnosisContext';
import { router } from 'expo-router';

// filepath: c:\Users\Admin\Desktop\ff\MedMap\screens\DiagnosisResultsScreen.tsx

// Extend the DiagnosisResponse type to include all required properties
type DiagnosisResponse = {
  prediction: {
    disease: string;
    confidence: number;
    severity: string;
    description: string;
  };
  probabilities: {
    disease: string;
    probability: number;
    ml_confidence: number;
    rule_confidence: number;
    matched_symptoms: string[];
  }[];
  symptoms: {
    total: number;
    matched: string[];
    severity: string;
  };
  metadata: {
    model_version: string;
    confidence_threshold: number;
    timestamp: string;
  };
};

export default function DiagnosisResultsScreen() {
  const { diagnosis } = useDiagnosis() as { diagnosis: DiagnosisResponse | null };
  const theme = useTheme();

  if (!diagnosis) {
    return (
      <View style={styles.container}>
        <Text>No diagnosis results available</Text>
      </View>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.tertiary;
      case 'low':
        return theme.colors.secondary;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Primary Diagnosis Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Primary Diagnosis
          </Text>
          <View style={styles.primaryDiagnosis}>
            <Text variant="titleLarge">{diagnosis.prediction.disease}</Text>
            <View style={styles.confidenceContainer}>
              <ProgressBar
                progress={diagnosis.prediction.confidence / 100}
                color={getSeverityColor(diagnosis.prediction.severity)}
                style={styles.progressBar}
              />
              <Text variant="bodyLarge">
                {diagnosis.prediction.confidence.toFixed(1)}% Confidence
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
              <Text style={styles.severityText}>{diagnosis.prediction.severity} Severity</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Detailed Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Detailed Analysis
          </Text>
          {diagnosis.probabilities.map((prob: DiagnosisResponse['probabilities'][0], index: number) => (
            <View key={index} style={styles.probabilityItem}>
              <View style={styles.probabilityHeader}>
                <Text variant="titleMedium">{prob.disease}</Text>
                <Text variant="bodyMedium">{prob.probability.toFixed(1)}%</Text>
              </View>
              <ProgressBar
                progress={prob.probability / 100}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <View style={styles.metricsContainer}>
                <View style={styles.metricItem}>
                  <Text variant="labelSmall">ML Confidence</Text>
                  <Text variant="bodySmall">{prob.ml_confidence.toFixed(1)}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text variant="labelSmall">Rule Confidence</Text>
                  <Text variant="bodySmall">{prob.rule_confidence.toFixed(1)}%</Text>
                </View>
              </View>
              <Text variant="bodySmall" style={styles.symptomsText}>
                Matched Symptoms: {prob.matched_symptoms.join(', ')}
              </Text>
              {index < diagnosis.probabilities.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Symptoms Analysis */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Symptoms Analysis
          </Text>
          <View style={styles.symptomsAnalysis}>
            <View style={styles.symptomMetric}>
              <Text variant="titleLarge">{diagnosis.symptoms.total}</Text>
              <Text variant="bodyMedium">Total Symptoms</Text>
            </View>
            <View style={styles.symptomMetric}>
              <Text variant="titleLarge">{diagnosis.symptoms.matched.length}</Text>
              <Text variant="bodyMedium">Matched Symptoms</Text>
            </View>
            <View style={styles.symptomMetric}>
              <Text variant="titleLarge">{diagnosis.symptoms.severity}</Text>
              <Text variant="bodyMedium">Overall Severity</Text>
            </View>
          </View>
          <View style={styles.matchedSymptoms}>
            <Text variant="titleSmall">Matched Symptoms:</Text>
            <View style={styles.symptomsList}>
              {diagnosis.symptoms.matched.map((symptom: string, index: number) => (
                <View key={index} style={styles.symptomTag}>
                  <Text style={styles.symptomText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Additional Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Additional Information
          </Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text variant="labelSmall">Model Version</Text>
              <Text variant="bodyMedium">{diagnosis.metadata.model_version}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text variant="labelSmall">Confidence Threshold</Text>
              <Text variant="bodyMedium">{diagnosis.metadata.confidence_threshold}%</Text>
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

      <Button mode="contained" onPress={() => router.back()} style={styles.backButton}>
        Back to Diagnosis
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
    color: '#333',
  },
  primaryDiagnosis: {
    alignItems: 'center',
    padding: 8,
  },
  confidenceContainer: {
    width: '100%',
    marginVertical: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    marginVertical: 8,
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  severityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  probabilityItem: {
    marginVertical: 8,
  },
  probabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metricItem: {
    alignItems: 'center',
  },
  symptomsText: {
    marginTop: 8,
    color: '#666',
  },
  divider: {
    marginVertical: 16,
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
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  symptomText: {
    color: '#333',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 16,
  },
  backButton: {
    margin: 16,
    marginBottom: 32,
  },
});