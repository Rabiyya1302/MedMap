import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Card, RadioButton, Button } from "react-native-paper";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { AnswerType, RootStackParamList } from "../../../navigation/types"; // Corrected import path
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import Header from "@/components/Header";
import Drawer from "@/components/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
export interface DynamicQuestionsScreenProps {
  route: QuestionScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "QuestionScreen">; // Add navigation prop if needed
}

type QuestionScreenRouteProp = RouteProp<RootStackParamList, "QuestionScreen">;

const DynamicQuestionsScreen: React.FC<DynamicQuestionsScreenProps> = ({
  route,
  navigation
}) => {
  const [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_400Regular });
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { symptoms, onSubmit } = route.params;
  const slideAnim = useRef(new Animated.Value(-viewportWidth * 0.6)).current;
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const handleMenuToggle = () => {
    const newValue = menuVisible ? -viewportWidth * 0.6 : 0;
    Animated.timing(slideAnim, {
      toValue: newValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible)); // Toggle state after animation
  };
  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
  }

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };

  const handleSubmit = () => {
    const formattedAnswers: AnswerType[] = Object.entries(answers).map(
      ([question, answer]) => ({
        question,
        answer,
      })
    );
    onSubmit(formattedAnswers);
  };

  const questions = symptoms.map((symptom: string) => ({
    id: symptom,
    question: `How severe is your ${symptom}?`,
    options: ["Mild", "Moderate", "Severe"],
  }));

  return (
    <SafeAreaView style={styles.container}>
      {menuVisible && <TouchableOpacity onPress={handleMenuToggle} />}

      {/* Drawer Component (Now outside ScrollView) */}
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <Drawer navigation={navigation} slideAnim={slideAnim} />
      </Animated.View>
      <Header onMenuToggle={handleMenuToggle} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Answer the following questions:</Text>
        {questions.map(
          (q: { id: string; question: string; options: string[] }) => (
            <Card key={q.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.questionText}>{q.question}</Text>
                <RadioButton.Group
                  onValueChange={(value) => handleAnswerChange(q.id, value)}
                  value={answers[q.id] || ""}
                >
                  {q.options.map((option: string) => (
                    <View key={option} style={styles.radioButtonContainer}>
                      <RadioButton value={option} />
                      <Text style={styles.radioButtonText}>{option}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
              </Card.Content>
            </Card>
          )
        )}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  questionText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
    justifyContent:'center'
  },

  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
  },
  drawerContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "60%",
    height: "100%",
    zIndex: 1, // Ensures the drawer is above other content
    elevation: 1,
    backgroundColor: "white",
    marginTop: 3.1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default DynamicQuestionsScreen;
