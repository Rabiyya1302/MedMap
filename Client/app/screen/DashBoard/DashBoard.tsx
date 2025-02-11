import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Drawer from "@/components/drawer"; // Corrected import path
import Header from "@/components/Header"; // Corrected import path
import WeeklyInput from "@/components/WeeklyInput"; // Corrected import path
import OverviewTab from "@/components/OverviewTab"; // Corrected import path
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For icons
import { Montserrat_700Bold, useFonts } from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
const isTablet = viewportWidth > 768;
const isLandscape = viewportWidth > viewportHeight;
const isCompact = viewportWidth < 350; // Detect small screens

const Tab = createMaterialTopTabNavigator();

const DashBoardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(-viewportWidth * 0.7)).current;
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold
  });

  // Sample data for the OverviewTab
  const temperatureData = [36.5, 37.0, 38.2, 37.5]; // Example temperature data
  const glucoseData = [90, 85, 95, 100]; // Example glucose data
  const pressureData = [120, 125, 130, 115]; // Example blood pressure data

  // Ensure splash screen hides only when fonts are loaded
  useEffect(() => {
    if (!fontsLoaded) return; // Prevent re-rendering issue
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const handleMenuToggle = () => {
    const newMenuState = !menuVisible;
    setMenuVisible(newMenuState);
    Animated.timing(slideAnim, {
      toValue: newMenuState ? 0 : -viewportWidth * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: slideAnim }], width: isTablet ? "40%" : "70%" },
        ]}
      >
        <Drawer navigation={navigation} slideAnim={slideAnim} />
      </Animated.View>

      {/* Tabs Navigation */}
      <View style={styles.content}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "green",
              height: 3,
              borderRadius: 2,
              width: viewportWidth * 0.2,
              marginLeft: viewportWidth * 0.05,
            },
            tabBarLabelStyle: {
              fontSize: isTablet ? 18 : viewportWidth * 0.04,
              fontWeight: "600",
              textTransform: "capitalize",
              color: "#000",
            },
            tabBarStyle: {
              backgroundColor: "white",
              elevation: isTablet ? 6 : 4,
              height: isTablet || isLandscape ? 65 : viewportHeight * 0.1,
            },
            tabBarPressOpacity: 0.7,
            tabBarPressColor: "rgba(0, 123, 255, 0.2)",
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "#666",
            tabBarShowLabel: !isCompact, // Hide labels only on small screens
          }}
        >
          <Tab.Screen
            name="Overview"
            children={() => (
              <OverviewTab 
                temperatureData={temperatureData} 
                glucoseData={glucoseData} 
                pressureData={pressureData} 
              />
            )}
            options={{
              tabBarLabel: isCompact ? "" : "Overview", // Hide label on small screens
              tabBarIcon: () => <MaterialCommunityIcons name="chart-line" size={24} color={"green"} />,
            }}
          />
          <Tab.Screen
            name="Body Temperature"
            children={() => <WeeklyInput title="Body Temperature" unit="°C" onSave={(data) => console.log(data)} />}
            options={{
              tabBarLabel: isCompact ? "" : "Body Temp", // Hide label on small screens
              tabBarIcon: () => <MaterialCommunityIcons name="thermometer" size={24} color={"#FFA500"} />,
            }}
          />
          <Tab.Screen
            name="Blood Glucose Level"
            children={() => <WeeklyInput title="Blood Glucose Level" unit="mg/dL" onSave={(data) => console.log(data)} />}
            options={{
              tabBarLabel: isCompact ? "" : "Glucose Level", // Hide label on small screens
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="water-percent" size={24} color={"#8B0000"} />,
            }}
          />
          <Tab.Screen
            name="Blood Pressure"
            children={() => <WeeklyInput title="Blood Pressure" unit="mmHg" onSave={(data) => console.log(data)} />}
            options={{
              tabBarLabel: isCompact ? "" : "Blood Pressure", // Hide label on small screens
              tabBarIcon: () => <MaterialCommunityIcons name="heart-pulse" size={24} color={"red"} />,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { flex: 1, backgroundColor: "white" },
  drawer: {
    position: "absolute",
    left: 0,
    top: 60,
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 1,
    backgroundColor: "white",
    marginTop: 3,
    fontFamily: "Montserrat_700Bold"
  },
});

export default DashBoardScreen;
