import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Chip, useTheme, Text } from 'react-native-paper';

interface SymptomInputProps {
  onSubmit: (symptoms: string[]) => void;
}

const SymptomInput: React.FC<SymptomInputProps> = ({ onSubmit }) => {
  const [symptomText, setSymptomText] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const theme = useTheme();

  const addSymptom = () => {
    const trimmed = symptomText.trim();
    if (trimmed && !symptoms.includes(trimmed)) {
      setSymptoms((prev) => [...prev, trimmed]);
      setSymptomText('');
    }
  };

  const removeSymptom = (index: number) => {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (symptoms.length > 0) {
      onSubmit(symptoms);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        What symptoms are you experiencing?
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Enter your symptoms one by one and tap Add
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Enter symptom"
          value={symptomText}
          onChangeText={setSymptomText}
          style={styles.input}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="plus"
              onPress={addSymptom}
              disabled={!symptomText.trim()}
            />
          }
          onSubmitEditing={addSymptom}
          returnKeyType="done"
        />
      </View>

      <View style={styles.chipsContainer}>
        {symptoms.map((symptom, index) => (
          <Chip
            key={`${symptom}-${index}`}
            style={styles.chip}
            onClose={() => removeSymptom(index)}
            mode="outlined"
          >
            {symptom}
          </Chip>
        ))}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={symptoms.length === 0}
        style={styles.button}
      >
        Get Diagnosis
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  chip: {
    margin: 4,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
});

export default SymptomInput;
