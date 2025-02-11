import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import Voice from "@react-native-community/voice";
import type {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from "@react-native-community/voice";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import the icon component

const SpeechInput: React.FC<{
  selectedLanguage: string;
  value: string;
  onChange: (text: string) => void;
}> = ({ selectedLanguage, value, onChange }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    //Speech result handler
    const onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value?.[0]) {
        onChange(e.value[0]); //update text input
      }
    };
    const onSpeechError = (e: SpeechErrorEvent) => {
      Alert.alert(
        "Speech Error",
        e.error?.message || "an unknown error has occurred."
      );
      setIsRecording(false);
    };
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onChange]);
  // Request microphone permission (Android only)
  const requestMicrophonePermission = useCallback(async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Speech Input Permission",
            message:
              "This app needs access to your microphone to recognize speech.",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert("Permission denied", "Please enable mircophone in phone's settings.");
        }
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn("Permission error:", error);
        return false;
      }
    }
    return true;
  }, []);

  // Start listening
  const startListening = useCallback(async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Microphone access is required.");
      return;
    }

    try {
      await Voice.stop();
      setIsRecording(true);
      await Voice.start(selectedLanguage);
    } catch (error) {
      Alert.alert("Error", "Could not start voice recognition. Try again.");
      setIsRecording(false);
    }
  }, [requestMicrophonePermission, selectedLanguage]);

  // Stop listening
  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      Alert.alert("Error", "Could not stop voice recognition. Try again.");
    }
  }, []);

  return (
    <View style={styles.container}>
    
          <TextInput.Icon
            forceTextInputFocus={false} // Prevents focusing input when clicking icon
            icon={() => (
               <MaterialCommunityIcons
                  name="microphone"
                  size={24}
                  color={isRecording ? "red" : "gray"}
                />
            )} onPress={isRecording?stopListening:startListening}
          />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default SpeechInput;
