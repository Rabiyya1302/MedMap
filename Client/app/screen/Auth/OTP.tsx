import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // State for OTP digits
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
    Inter_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {/* Logo in the top left corner */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.subtitle}>Enter Verification Code</Text>
      <Text style={styles.description}>
        We have sent a code to{" "}
        <Text style={styles.phoneNumber}>+923334894500</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      <Button mode="contained" style={styles.button}>
        <Text style={styles.buttonText}>Verify Now</Text>
      </Button>

      <TouchableOpacity>
        <Text style={styles.resendText}>
          Didn’t receive code?{" "}
          <Text style={styles.resendLink}>Resend code</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: viewportHeight * 0.1, // Adjusted padding for responsiveness
    backgroundColor: "#fff",
    justifyContent: "center", // Center content vertically
  },
  logoContainer: {
    position: "absolute",
    top: viewportHeight * 0.05, // 5% from the top
    left: viewportWidth * 0.05, // 5% from the left
  },
  logoImage: {
    width: viewportWidth * 0.2, // 20% of viewport width
    height: viewportWidth * 0.2, // Maintain aspect ratio
    resizeMode: "contain",
  },
  subtitle: {
    fontSize: viewportWidth * 0.06, // 6% of viewport width
    fontFamily: "Poppins_700Bold",
    marginBottom: 8,
    marginTop: 16,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: viewportWidth * 0.04, // 4% of viewport width
    color: "#6b6b6b",
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    marginTop: 8,
    marginBottom: 24,
    textAlign: "center",
  },
  phoneNumber: {
    color: "#007E36",
    fontFamily: "Roboto_700Bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  otpInput: {
    height: 48,
    width: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: viewportWidth * 0.06, // 6% of viewport width
    fontFamily: "Roboto_500Medium",
    color: "#333",
  },
  button: {
    backgroundColor: "#007E36",
    height: 48,
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 32,
    marginTop: 24,
  },
  buttonText: {
    fontSize: viewportWidth * 0.04, // 4% of viewport width
    color: "#fff",
    fontFamily: "Roboto_500Medium",
  },
  resendText: {
    fontSize: viewportWidth * 0.04, // 4% of viewport width
    color: "#666",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  resendLink: {
    color: "#007E36",
    fontFamily: "Roboto_700Bold",
  },
});

export default OTPScreen;