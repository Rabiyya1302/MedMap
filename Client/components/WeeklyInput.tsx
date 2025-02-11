import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

interface WeeklyInputProps {
  title: string;
  unit: string;
  onSave: (data: number[]) => void;
}

const WeeklyInput: React.FC<WeeklyInputProps> = ({ title, unit, onSave }) => {
  const [inputData, setInputData] = useState<string[]>(Array(7).fill(""));

  const handleInputChange = (value: string, index: number) => {
    const newData = [...inputData];
    newData[index] = value;
    setInputData(newData);
  };

  return (
    <View style={styles.weeklyContainer}>
      <Text style={styles.weeklyTitle}>{title} ({unit})</Text>
      <View style={styles.weekRow}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <View key={day} style={styles.dayInput}>
            <Text style={styles.dayLabel}>{day}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="-"
              value={inputData[index]}
              onChangeText={(text) => handleInputChange(text, index)}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onSave(inputData.map(Number))}
      >
        <Text style={styles.addButtonText}>Save {title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyContainer: {
    padding: viewportWidth * 0.04, // Responsive padding
    backgroundColor: "white",
    marginVertical: viewportWidth * 0.02,
// Responsive margin
    
    
  },
  weeklyTitle: {
    fontSize: viewportWidth * 0.05, // Responsive font size
    fontWeight: 'bold',
    marginBottom: viewportWidth * 0.02,
    textAlign:"center"// Responsive margin
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayInput: {
    flex: 1,
    marginHorizontal: viewportWidth * 0.02, // Responsive margin
    alignItems: "center",
  },
  dayLabel: {
    textAlign: 'center',
    fontSize: viewportWidth * 0.04, // Responsive font size
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: viewportWidth * 0.02, // Responsive padding
    textAlign: 'center',
    width: '100%', // Full width for input
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: viewportWidth * 0.03, // Responsive padding
    borderRadius: 5,
    marginTop: viewportWidth * 0.02, // Responsive margin
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WeeklyInput;
