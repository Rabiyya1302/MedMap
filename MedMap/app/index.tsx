import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

const Index = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 768;
  const isSmallScreen = width < 360;

  return (
    <LinearGradient
      colors={['#E8F9FD', '#FDFEFE']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />

      <View style={styles.wrapper}>
        <Surface style={styles.card} elevation={4}>
          <Image
            source={require('../assets/images/logo.png')}
            style={[
              styles.logo,
              {
                width: isLargeScreen ? 220 : isSmallScreen ? 120 : 160,
                height: isLargeScreen ? 220 : isSmallScreen ? 120 : 160,
              },
            ]}
            resizeMode="contain"
          />
        </Surface>

        <Text
          style={[
            styles.brand,
            {
              fontSize: isLargeScreen ? 38 : 32,
            },
          ]}
        >
          MedMap
        </Text>

        <Text
          style={[
            styles.tagline,
            {
              fontSize: isLargeScreen ? 20 : isSmallScreen ? 14 : 16,
              marginBottom: isLargeScreen ? 32 : 24,
            },
          ]}
        >
          Your AI-powered companion for{'\n'}diagnosis & health tracking
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push('/registerScreen')}
          style={styles.cta}
          contentStyle={{
            paddingVertical: isLargeScreen ? 14 : 10,
          }}
          labelStyle={{
            fontSize: isLargeScreen ? 18 : 16,
            fontWeight: '600',
          }}
        >
          Get Started
        </Button>

        <Text
          style={[
            styles.disclaimer,
            { fontSize: isLargeScreen ? 13 : 11 },
          ]}
        >
          Best viewed on a mobile device or emulator.
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  logo: {
    alignSelf: 'center',
  },
  brand: {
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  tagline: {
    textAlign: 'center',
    color: '#444',
    fontWeight: '500',
    lineHeight: 24,
  },
  cta: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    marginTop: 16,
  },
  disclaimer: {
    marginTop: 24,
    textAlign: 'center',
    color: '#777',
    maxWidth: 300,
  },
});

export default Index;
