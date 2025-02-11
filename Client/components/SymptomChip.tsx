import React from 'react';
import { View, StyleSheet, Dimensions, AccessibilityInfo } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const { width: viewportWidth } = Dimensions.get("window");

interface SymptomChipsProps {
    symptoms: string[];
    handleRemoveSymptom: (symptom: string) => void;
    handleSubmit: () => void;
}

const SymptomChips: React.FC<SymptomChipsProps> = ({ symptoms, handleRemoveSymptom, handleSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.symptomChipsContainer}>
                {symptoms.map((symptom, index) => (
                    <Chip 
                        key={index} 
                        style={styles.chip} 
                        onClose={() => handleRemoveSymptom(symptom)}
                        accessibilityLabel={`Remove ${symptom}`}
                    >
                        {symptom}
                    </Chip>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    mode="contained" 
                    onPress={handleSubmit} 
                    style={styles.submitButton} 
                    labelStyle={styles.submitButtonLabel}
                    icon={() => <MaterialIcons name="check" size={20} color="white" />}
                    accessibilityLabel="Submit symptoms"
                >
                    Submit
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    symptomChipsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        padding: 10,
        flex: 1,
        width: '100%',
    },
    chip: {
        margin: 5,
        backgroundColor: "#c8e6c9",
        maxWidth: viewportWidth * 0.4,
        borderRadius: 20,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: "#4caf50",
        borderRadius: 20,
        paddingVertical: 2,
        paddingHorizontal: 20,
    },
    submitButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SymptomChips;