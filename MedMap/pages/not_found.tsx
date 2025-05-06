import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router"; // Use useRouter instead of useNavigation

const NotFound = () => {
  const router = useRouter();  // Using useRouter from Expo Router
  const theme = useTheme();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route.");
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Text variant="displayMedium" style={styles.title}>
          404
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Oops! Page not found
        </Text>
        <Button mode="contained" onPress={() => router.push("/home")}>  {/* Navigate to home or index */}
          Return to Home
        </Button>
      </View>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 16,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
  },
});
