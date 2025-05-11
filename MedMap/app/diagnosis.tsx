import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Surface,
  useTheme,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import { useDiagnosis } from '../context/DiagnosisContext';
import { useRouter } from 'expo-router';
import useLocation from '../hooks/useLocation';
import Voice from '@react-native-voice/voice';

export default function DiagnosisScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 600;
  const {
    symptoms,
    addSymptom,
    removeSymptom,
    getDiagnosis,
    loading,
    error,
  } = useDiagnosis();
  const [symptomInput, setSymptomInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const router = useRouter();

  // Get user location
  const { location, loading: locationLoading, error: locationError } = useLocation();

  // Voice recognition handlers
  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      const spokenText = event.value?.[0];
      if (spokenText) {
        setSymptomInput(spokenText);
      }
      setIsRecording(false);
    };

    Voice.onSpeechError = (e) => {
      console.error('Voice error:', e);
      setRecordingError('Voice recognition error. Please try again.');
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const handleVoiceInput = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
      } else {
        await Voice.start('en-US');
        setIsRecording(true);
        setRecordingError(null);
      }
    } catch (e) {
      console.error('Voice start error:', e);
      setRecordingError('Failed to start voice recognition. Please try again.');
    }
  };

  const handleAddSymptom = () => {
    if (symptomInput.trim()) {
      addSymptom(symptomInput.trim());
      setSymptomInput('');
    }
  };

  const handleGetDiagnosis = async () => {
    try {
      await getDiagnosis();
      await router.push({ pathname: '/diagnosis-results' });
    } catch (error) {
      console.error('Error during diagnosis or navigation:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[styles.wrapper, { paddingHorizontal: isLargeScreen ? 32 : 16 }]}>
          <Surface
            style={[
              styles.card,
              {
                paddingHorizontal: isLargeScreen ? 32 : 20,
                paddingVertical: isLargeScreen ? 28 : 20,
                borderRadius: isLargeScreen ? 20 : 16,
                elevation: isLargeScreen ? 4 : 6,
              },
            ]}
          >
            <View style={styles.titleWrapper}>
              <Text variant="headlineMedium" style={[styles.title, { textAlign: 'center' }]}>
                🩺 Enter Your Symptoms
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: isLargeScreen ? 16 : 13,
                  marginTop: 4,
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                Speak or type your symptoms below
              </Text>

              {location && (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: isLargeScreen ? 14 : 12,
                    marginTop: 6,
                    color: theme.colors.primary,
                  }}
                >
                  📍 Location: {location.city}, {location.region}, {location.country}
                </Text>
              )}

              {locationError && (
                <Text style={{ color: theme.colors.error, textAlign: 'center', marginTop: 6 }}>
                  ⚠️ Could not fetch location
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Symptom"
                value={symptomInput}
                onChangeText={setSymptomInput}
                style={[styles.input, { fontSize: isLargeScreen ? 18 : 14 }]}
                right={
                  <TextInput.Icon
                    icon="plus"
                    onPress={handleAddSymptom}
                  />
                }
              />
              <IconButton
                icon={isRecording ? 'microphone-off' : 'microphone'}
                onPress={handleVoiceInput}
                style={styles.micButton}
                size={24}
                iconColor={isRecording ? theme.colors.error : theme.colors.primary}
              />
            </View>

            {recordingError && (
              <Text style={{ color: theme.colors.error, textAlign: 'center', marginTop: 6 }}>
                {recordingError}
              </Text>
            )}

            {symptoms.length > 0 && (
              <View style={styles.symptomsList}>
                <Text variant="titleMedium" style={styles.subtitle}>
                  Added Symptoms:
                </Text>
                <View style={styles.symptomPillContainer}>
                  {symptoms.map((symptom, index) => (
                    <View key={index} style={styles.symptomPill}>
                      <Text style={[styles.symptomText, { fontSize: isLargeScreen ? 16 : 13 }]}>
                        {symptom}
                      </Text>
                      <IconButton
                        icon="close"
                        size={isLargeScreen ? 16 : 14}
                        onPress={() => removeSymptom(symptom)}
                        style={styles.removeButton}
                        iconColor={theme.colors.error}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Button
              mode="contained"
              onPress={handleGetDiagnosis}
              loading={loading}
              disabled={symptoms.length === 0 || loading}
              style={[styles.diagnosisButton, { paddingVertical: isLargeScreen ? 14 : 10 }]}
              labelStyle={{ fontSize: isLargeScreen ? 16 : 13 }}
              contentStyle={{ flexDirection: 'row-reverse' }}
              icon="stethoscope"
            >
              Get Diagnosis
            </Button>

            {error && (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {error}
              </Text>
            )}
          </Surface>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MD3Colors.neutral95,
  },
  wrapper: {
    paddingVertical: 28,
  },
  card: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginTop: 60,
  },
  titleWrapper: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '700',
    color: '#00796b',
  },
  inputContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
  },
  micButton: {
    marginLeft: 8,
  },
  symptomsList: {
    marginBottom: 24,
  },
  subtitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  symptomPillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
  },
  symptomText: {
    color: '#00695c',
    marginRight: 4,
  },
  removeButton: {
    margin: 0,
  },
  diagnosisButton: {
    marginTop: 16,
    borderRadius: 10,
  },
  error: {
    marginTop: 16,
    textAlign: 'center',
  },
});
