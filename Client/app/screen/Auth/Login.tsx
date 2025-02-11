import React, { useState } from "react";
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
import CheckBox from "react-native-check-box";
import { Button } from "react-native-paper";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  DashBoard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
    Inter_400Regular,
    Poppins_700Bold,
  });

  const [isChecked, setIsChecked] = useState(false); // Checkbox state

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
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={styles.logoImage}
            />
          </View>

          {/* Form Section */}
          <View style={styles.formWrapper}>
            <Text style={styles.subtitle}>Welcome Back!</Text>
          
            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsContainer}>
              <View style={styles.rememberMeContainer}>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  checkBoxColor="#34A853"
                />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate("DashBoard")}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </Button>

            {/* Google Sign-in Button */}
            <TouchableOpacity style={styles.googleButton}>
              <View style={styles.googleButtonContent}>
                <Image
                  source={require("../../../assets/images/google-icon.png")}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </View>
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Not registered yet?{" "}
 
                  <Text style={styles.loginLink} onPress={() => navigation.navigate("Register")}>Create an account</Text>
                
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
    backgroundColor: "#fff",
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
  description: {
    fontSize: width * 0.04,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: height * 0.03,
    lineHeight: 22,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: width * 0.04,
    color: "#666",
    fontFamily: "Inter_400Regular",
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: width * 0.04,
    color: "#007E36",
    fontFamily: "Roboto_700Bold",
  },
  button: {
    backgroundColor: "#007E36",
    height:height*0.07 ,
    justifyContent: "center",
    borderRadius:width*0.05,
    marginBottom:height*0.02,
  },
  buttonText: {
    fontSize: width * 0.04,
    color: "#fff",
    fontFamily: "Roboto_500Medium",
  },
  googleButton: {
    borderColor: "#ddd",
    borderWidth: 1,
    height:height*0.07,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:width*0.04,
    
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: width * 0.04,
    color: "#444",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop:height*0.03,
  },
  loginText: {
    fontSize: width * 0.04,
    color: "#666",
    fontFamily: "Inter_400Regular",
  },
  loginLink: {
    fontFamily: "Roboto_700Bold",
    color: "#007E36",
  },
});

export default LoginScreen;
