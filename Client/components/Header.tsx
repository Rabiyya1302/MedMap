import React, { useEffect } from "react";
import { Appbar } from "react-native-paper";
import { TouchableOpacity, StyleSheet, View, Dimensions } from "react-native";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";
import { useNavigationState } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importing MaterialCommunityIcons

interface HeaderProps {
  onMenuToggle: () => void;
}

const { width } = Dimensions.get("window");
const isTablet = width > 786;

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Roboto_700Bold,
  });

  // Ensure splash screen hides only when fonts are loaded
  useEffect(() => {
    if (!fontsLoaded) return; // Prevent re-rendering issue
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // Ensure hooks always execute in the same order
  const currentRouteName = useNavigationState((state) => {
    return state?.routes?.[state.index]?.name || "Home"; // Default to "Home"
  });

  // Always render component to prevent breaking hook order
  return (
    <Appbar.Header style={styles.appbar}>
      <TouchableOpacity onPress={onMenuToggle} style={styles.menuIcon}>
        <MaterialCommunityIcons name="menu" size={isTablet ? 36 : 30} color="green" />
      </TouchableOpacity>
      <Appbar.Content title={currentRouteName} color="green" titleStyle={styles.title} />

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => alert("Notifications")} style={styles.iconButton}>
          <MaterialCommunityIcons name="bell-outline" size={isTablet ? 32 : 28} color="green" />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: isTablet ? 12 : 8,
  },
  menuIcon: {
    marginRight: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  title: {
    fontSize: isTablet ? 30 : 20,
    fontFamily: "Montserrat_700Bold",
    color: "green",
  },
});

export default Header;
