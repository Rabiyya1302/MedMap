import React from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useFonts, Inter_700Bold } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

interface ProgressBarProps {
  progress: number;
}

const { width } = Dimensions.get("window");

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress }) => {
  const animatedProgress = useSharedValue(progress);
  const [fontsLoaded] = useFonts({ Inter_700Bold });

  // Prevent auto-hiding the splash screen until fonts are loaded
  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  // Animate the progress bar
  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progress]);

  // Create an animated style for the progress bar
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value * 100}%`,
  }));

  // Show a loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>Symptom Checker Finding Score</Text>

      {/* Health-related icon */}
      <View style={styles.iconWrapper}>
        <FontAwesome name="heartbeat" size={24} color="#FF5722" />
        <Text style={styles.progressValue}>{Math.round(progress * 100)}%</Text>
      </View>

      <View style={styles.progressWrapper}>
        <Animated.View style={[styles.progressBar, animatedStyle]}>
          <LinearGradient
            colors={["#FF3E3E", "#FFD700", "#1B6605"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradient}
          />
        </Animated.View>
      </View>

      <Text style={styles.hint}>
        A higher score means more accurate results
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    padding: width * 0.001, // 5% padding
    alignItems: "center", // Center align items
    width: "100%", // Full width
  },
  progressText: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Inter_700Bold",
    marginBottom: width * 0.02,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: width * 0.02,
  },
  progressValue: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
    color: "#FF5722",
    fontWeight: "600",
  },
  progressWrapper: {
    height: width * 0.05,
    borderRadius: width * 0.025,
    backgroundColor: "#e0e0e0",
    width: "100%",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  hint: {
    fontSize: width * 0.035,
    color: "#666",
    marginTop: width * 0.02,
    textAlign: "center",
  },
});

export default ProgressBarComponent;