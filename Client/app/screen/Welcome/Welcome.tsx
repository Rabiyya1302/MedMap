import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Dimensions, Animated, TouchableOpacity } from "react-native";
import { Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Roboto_700Bold, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { Montserrat_700Bold, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
};
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;
type Props = { navigation: WelcomeScreenNavigationProp };

const { width, height } = Dimensions.get("window");

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
    Inter_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade-in animation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Scale animation for button
  const imageAnim = useRef(new Animated.Value(0)).current; // Bounce effect for image

  useEffect(() => {
    // Fade-in animation for text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Bounce effect for image
    Animated.spring(imageAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    navigation.navigate("Register");
  };

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient colors={["#E3F2FD", "#ffffff"]} style={styles.gradientBackground} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Animated Image */}
        <Animated.Image
          source={require("../../../assets/images/welLogo.png")}
          style={[styles.mainImage, { transform: [{ scale: imageAnim }] }]}
        />

        {/* Animated Text Section */}
        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Welcome to MedMap</Text>
          <Text style={styles.subtitle}>AI Powered Symptom Checker And Disease Tracker</Text>
        </Animated.View>

        {/* Animated Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.buttonWrapper}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.buttonText}>Get Started</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  mainImage: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    marginBottom: 24,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: "Montserrat_700Bold",
    color: "#007E36",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    color: "#444",
    lineHeight: 22,
  },
  buttonWrapper: {
    overflow: "hidden",
    borderRadius: 60,
  },
  button: {
    backgroundColor: "#007E36",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Roboto_700Bold",
  },
});

export default WelcomeScreen;
