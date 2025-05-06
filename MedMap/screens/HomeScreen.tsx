import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HomeScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.headerContainer]}>
        <Text variant="headlineLarge" style={[styles.welcomeText, { color: theme.colors.primary }]}>
          Welcome to MedMap
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Your personal health companion
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Quick Diagnosis Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            <MaterialCommunityIcons
              name="stethoscope"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Quick Diagnosis
          </Text>
          <Text variant="bodyMedium" style={[styles.cardText, { color: theme.colors.onSurfaceVariant }]}>
            Get instant medical insights by describing your symptoms
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Diagnosis')}
            style={styles.button}
            contentStyle={{ paddingVertical: 10 }}
            uppercase={false}
            labelStyle={{ fontWeight: '600' }}
          >
            Start Diagnosis
          </Button>
        </View>

        {/* Diagnosis History Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.primary }]}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            <MaterialCommunityIcons
              name="history"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <Text variant="titleLarge" style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
            Diagnosis History
          </Text>
          <Text variant="bodyMedium" style={[styles.cardText, { color: theme.colors.onSurfaceVariant }]}>
            View your past diagnoses and medical history
          </Text>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('History')}
            style={styles.button}
            contentStyle={{ paddingVertical: 10 }}
            uppercase={false}
            labelStyle={{ fontWeight: '600', color: theme.colors.primary }}
            textColor={theme.colors.primary}
          >
            View History
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  welcomeText: {
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: '400',
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    maxWidth: 600,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor set dynamically in component
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    width: '100%',
    borderRadius: 10,
  },
});

export default HomeScreen;
