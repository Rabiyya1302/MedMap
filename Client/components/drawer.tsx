import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from '../constants/Colors'; // Importing the new color constants
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Importing MaterialCommunityIcons



import { Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

type RootStackParamList = {
  Profile: undefined;
  sympCheck: undefined;
  History: undefined;
  DashBoard: undefined;
  BodyPointing: undefined;
};

type DrawerProps = {
  navigation: StackNavigationProp<RootStackParamList, any>;
  slideAnim: Animated.Value;
};

type MenuItemProps = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap; // Correct icon type
  isHovered: boolean;
  onPress: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
};

const MenuItem = ({
  name,
  icon,
  isHovered,
  onPress,
  onHoverIn,
  onHoverOut,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isHovered && styles.menuItemHover]}
      onPressIn={onHoverIn}
      onPressOut={onHoverOut}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={Math.min(viewportWidth * 0.06, 28)} color="#333" />
      <Text style={styles.menuText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function Drawer({ navigation, slideAnim }: DrawerProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // Menu items
  const menuItems = [
    { name: "Profile", icon: "account" as keyof typeof MaterialCommunityIcons.glyphMap, route: "Profile" },
    { name: "Symptom Checker", icon: "stethoscope" as keyof typeof MaterialCommunityIcons.glyphMap, route: "sympCheck" },
    { name: "History", icon: "history" as keyof typeof MaterialCommunityIcons.glyphMap, route: "History" },
    { name: "Dashboard", icon: "view-dashboard" as keyof typeof MaterialCommunityIcons.glyphMap, route: "DashBoard" },
    { name: "Body Pointing", icon: "human" as keyof typeof MaterialCommunityIcons.glyphMap, route: "BodyPointing" }
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          isHovered={hoveredItem === item.name}
          onPress={() =>
            navigation.navigate(item.route as keyof RootStackParamList)
          } // Ensure type safety
          onHoverIn={() => setHoveredItem(item.name)}
          onHoverOut={() => setHoveredItem(null)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: viewportHeight * 0.025,
    marginLeft: viewportWidth * 0.02,
    paddingHorizontal: viewportWidth * 0.02,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: viewportHeight * 0.016,
    marginVertical: viewportHeight * 0.009,
     // Reverting to previous border color



    borderRadius: viewportWidth * 0.02,
  },
  menuText: {
    fontSize: Math.min(viewportWidth * 0.04, 24),
    marginLeft: viewportWidth * 0.03,
    color: "#333",
    fontFamily: "Montserrat_700Bold"
  },
  menuItemHover: {
    backgroundColor: "#B0E99F", // Reverting to previous background color


    color: "#333", // Reverting to previous text color


    borderRadius: viewportWidth * 0.02,
   
    

  },
 
});
