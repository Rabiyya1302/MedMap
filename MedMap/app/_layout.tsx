// MedMap/app/_layout.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { DiagnosisProvider } from '../context/DiagnosisContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import DrawerContent from './drawer';

const DRAWER_WIDTH = 280;

function RootLayoutContent() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const segments = useSegments();
  const { user } = useAuth();

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const currentRoute = segments[segments.length - 1] as string;
  const isAuthScreen = currentRoute === 'login' || currentRoute === 'registerScreen';

  const navigation = {
    navigate: (route: string) => {
      router.push(`/${route}` as any); // TypeScript workaround for dynamic routes
      setDrawerVisible(false);
    },
  };

  return (
    <View style={styles.container}>
      {!isAuthScreen && drawerVisible && (
        <View style={[styles.drawerContainer, { width: DRAWER_WIDTH }]}>
          <DrawerContent
            navigation={navigation}
            currentRoute={currentRoute || ''}
            toggleRole={() => {}}
            isAdmin={user?.role === 'official'}
          />
        </View>
      )}
      <View style={styles.stackContainer}>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: !drawerVisible,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="loginScreen" />
          <Stack.Screen name="registerScreen" />
          <Stack.Screen name="dashboard" initialParams={{ toggleDrawer }} />
          {user?.role === 'user' && (
            <>
              <Stack.Screen name="diagnosis" />
              <Stack.Screen name="diagnosis-results" />
            </>
          )}
          {user?.role === 'official' && (
            <>
              <Stack.Screen name="outbreak-alert" />
              <Stack.Screen name="disease-tracker" />
              <Stack.Screen name="manage-users" />
            </>
          )}
          <Stack.Screen name="map" />
          <Stack.Screen name="history" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="alerts" />
          <Stack.Screen name="analytics" />
          <Stack.Screen name="language-settings" />
        </Stack>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <DiagnosisProvider>
            <StatusBar style="auto" />
            <RootLayoutContent />
          </DiagnosisProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    zIndex: 1000,
    paddingTop: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
  },
  stackContainer: {
    flex: 1,
  },
});