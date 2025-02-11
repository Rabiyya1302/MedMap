import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
interface SymptomInputProps{
  symptomInput:string,
  setSymptomsInput:(value:string)=>void,
  handleAddSymptom:(symptom:string)=>void
}
const SymptomInput:React.FC<SymptomInputProps> = ({
  symptomInput,
  setSymptomsInput,
  handleAddSymptom,
}) => {
  const [fontsLoaded] = useFonts({ Poppins_700Bold });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>What Are Your Symptoms?</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Type or speak your symptoms"
          placeholderTextColor="#8AB591"
          value={symptomInput}
          onChangeText={setSymptomsInput}
        />
        <TouchableOpacity>
          <MaterialIcons name="mic" size={24} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAddSymptom(symptomInput)}>
          <MaterialIcons name="send" size={24} color="#2E7D32" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontFamily: "Poppins_700Bold",
    fontSize:30,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2E7D32",
  },
});

export default SymptomInput;
