import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

type RootStackParamList = {
  Register: undefined;
  OTP: undefined;
  Login: undefined;
};
type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;
type Props = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Centered Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logoImage}
            />
          </View>

          {/* Form Section */}
          <View style={styles.formWrapper}>
            <Text style={styles.subtitle}>Create an Account</Text>

            {/* Input Fields with Icons */}
            <View style={styles.inputContainer}>
              <Feather
                name="user"
                size={20}
                color="green"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="phone"
                size={20}
                color="green"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={20}
                color="green"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color="green"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>

            {/* Register Button */}
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate("OTP")}
              labelStyle={styles.buttonText}
            >
              Register
            </Button>

            {/* Google Sign-in Button */}
            <TouchableOpacity style={styles.googleButton}>
              <View style={styles.googleButtonContent}>
                <Image
                  source={require("../../../assets/images/google-icon.png")}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>

            {/* Log-in Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={() => navigation.navigate("Login")}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },
  logoContainer: {
    alignSelf: "center",
    marginBottom: height * 0.03,
  },
  logoImage: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: "contain",
  },
  formWrapper: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: width * 0.06,
    fontFamily: "Poppins_700Bold",
    color: "#222",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: width * 0.03,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.03,
    height: height * 0.06,
    marginBottom: height * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    paddingHorizontal: width * 0.02,
  },
  inputIcon: {
    marginRight: width * 0.02, // Space between icon and text input
  },
  button: {
    backgroundColor: "#007E36",
    height: height * 0.07,
    justifyContent: "center",
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
  },
  buttonText: {
    fontSize: width * 0.04,
    color: "#fff",
    fontFamily: "Roboto_500Medium",
  },
  googleButton: {
    borderColor: "#ddd",
    borderWidth: 1,
    height: height * 0.07,
    justifyContent: "center",
    borderRadius: width * 0.04,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.02,
  },
  googleButtonText: {
    fontSize: width * 0.04,
    color: "#444",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.015,
  },
  loginText: {
    fontSize: width * 0.04,
    color: "#666",
  },
  loginLink: {
    fontWeight: "bold",
    color: "#007E36",
    fontSize: width * 0.04,
  },
});

export default RegisterScreen;
