import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import Header from "@/components/Header";
import Drawer from "@/components/drawer";
import SymptomInput from "@/components/SymptomInput";
import SymptomChips from "@/components/SymptomChip";
import ProgressBarComponent from "@/components/ProgressBar";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

const SymptomCheckerScreen = ({ navigation }) => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomsInput] = useState<string>("");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-viewportWidth * 0.6)).current;
  const maxSymptoms = 10;
  const progress = symptoms.length / maxSymptoms;

  const handleAddSymptom = () => {
    const trimmedSymptom = symptomInput.trim();
    if (trimmedSymptom && !symptoms.includes(trimmedSymptom)) {
      setSymptoms([...symptoms, trimmedSymptom]);
      setSymptomsInput("");
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom));
  };

  const handleMenuToggle = () => {
    const newValue = menuVisible ? -viewportWidth * 0.6 : 0;
    Animated.timing(slideAnim, {
      toValue: newValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible)); // Toggle state after animation
  };
const handleSubmit=()=>{
  navigation.navigate('QuestionScreen')
}
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Overlay to close drawer when tapping outside */}
      {menuVisible && (
        <TouchableOpacity  onPress={handleMenuToggle} />
      )}

      {/* Drawer Component (Now outside ScrollView) */}
      <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Drawer navigation={navigation} slideAnim={slideAnim} />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header onMenuToggle={handleMenuToggle} />
     
        <View style={styles.inputContainer}>
          <SymptomInput
            symptomInput={symptomInput}
            setSymptomsInput={setSymptomsInput}
            handleAddSymptom={handleAddSymptom}
          />
        </View>
        <View style={styles.chipContainer}>
          <SymptomChips symptoms={symptoms} handleRemoveSymptom={handleRemoveSymptom} handleSubmit={handleSubmit}/>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBarComponent progress={progress} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F9F0",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    
  },
  drawerContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "60%",
    height: "100%",
    zIndex: 1, // Ensures the drawer is above other content
    elevation: 1,
    backgroundColor:'#F0F9F0',
    marginTop:3.1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  inputContainer: {
    marginVertical: 20,
    paddingHorizontal: 2,
    elevation: 2,
  },
  chipContainer: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  progressBarContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SymptomCheckerScreen;
