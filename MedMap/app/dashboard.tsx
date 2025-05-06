import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import Header from '../components/Header';
import DrawerContent from './drawer';

const DRAWER_WIDTH = 280;

type DashboardCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    style={styles.card}
    onPress={onPress}
  >
    <View style={styles.cardHeader}>
      <MaterialCommunityIcons name={icon} size={36} color={theme.colors.primary} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

const DashboardScreen: React.FC = () => {
  const { from } = useLocalSearchParams();
  const [activeSection, setActiveSection] = useState<'general' | 'official'>('general');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { width } = useWindowDimensions();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (from === 'register') {
      setShowWelcome(true);
    }
  }, [from]);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const navigateTo = (route: Parameters<typeof router.push>[0]) => {
    router.push(route);
    toggleDrawer();
  };

  const toggleRole = () => {
    const newRole = !isAdmin;
    setIsAdmin(newRole);
    setActiveSection(newRole ? 'official' : 'general');
  };

  return (
    <View style={styles.container}>
      <Header title="Dashboard" leftIcon="menu" onLeftIconPress={toggleDrawer} />

      <View style={styles.contentContainer}>
        {drawerVisible && (
          <View style={[styles.drawerContainer, { width: DRAWER_WIDTH }]}>
            <DrawerContent
              navigation={{ navigate: navigateTo }}
              currentRoute=""
              toggleRole={toggleRole}
              isAdmin={isAdmin}
            />
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} style={styles.mainContent}>
          <View style={styles.welcomeSection}>
            {showWelcome && (
              <View style={styles.welcomeCard}>
                <Text style={styles.welcomeText}>🎉 Welcome! You've successfully registered.</Text>
              </View>
            )}
            <Text style={styles.welcomeTitle}>👋 Welcome to MedMap</Text>
            <Text style={styles.welcomeSubtitle}>
              AI-Powered Disease Diagnosis & Regional Tracking
            </Text>
          </View>

          <View style={styles.cardsSection}>
            <Text style={styles.sectionTitle}>
              {activeSection === 'general' ? 'For General Users' : 'For Health Officials'}
            </Text>

            {activeSection === 'general' ? (
              <>
                <DashboardCard
                  icon="stethoscope"
                  title="Symptom Checker"
                  description="AI-based quick health assessments"
                  onPress={() => navigateTo('/diagnosis')}
                />
                <DashboardCard
                  icon="history"
                  title="Symptom History"
                  description="View your past diagnoses"
                  onPress={() => navigateTo('/history')}
                />
                <DashboardCard
                  icon="translate"
                  title="Language Settings"
                  description="Choose your preferred language"
                  onPress={() => navigateTo('/language-settings')}
                />
              </>
            ) : (
              <>
                <DashboardCard
                  icon="map"
                  title="Disease Map"
                  description="Live visual outbreak data"
                  onPress={() => navigateTo('/mapScreen')}
                />
                <DashboardCard
                  icon="radar"
                  title="Disease Tracker"
                  description="Monitor disease trends"
                  onPress={() => navigateTo('/disease-tracker')}
                />
                <DashboardCard
                  icon="map-marker-radius-outline"
                  title="Regional Map"
                  description="Zoom into regional health stats"
                  onPress={() => navigateTo('/regional-map')}
                />
                <DashboardCard
                  icon="alert-circle"
                  title="Outbreak Alerts"
                  description="Track and manage outbreaks"
                  onPress={() => navigateTo('/outbreak-alert')}
                />
                <DashboardCard
                  icon="chart-bar"
                  title="Analytics & Reports"
                  description="View deep insights and graphs"
                  onPress={() => navigateTo('/analytics')}
                />
                <DashboardCard
                  icon="bell-outline"
                  title="Notifications"
                  description="Manage public alerts"
                  onPress={() => navigateTo('/alerts')}
                />
                <DashboardCard
                  icon="account-group"
                  title="User Management"
                  description="Control users and permissions"
                  onPress={() => navigateTo('/manage-users')}
                />
              </>
            )}
          </View>

          <View style={styles.toggleSection}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeSection === 'general' && styles.activeToggleButton,
              ]}
              onPress={() => setActiveSection('general')}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  activeSection === 'general' && styles.activeToggleButtonText,
                ]}
              >
                General User
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                activeSection === 'official' && styles.activeToggleButton,
              ]}
              onPress={() => setActiveSection('official')}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  activeSection === 'official' && styles.activeToggleButtonText,
                ]}
              >
                Officials
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    zIndex: 1000,
    paddingTop: 50,
    borderRightWidth: 1,
    borderRightColor: theme.colors.outlineVariant,
  },
  mainContent: {
    flex: 1,
  },
  welcomeSection: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  welcomeCard: {
    backgroundColor: theme.colors.surface,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  welcomeText: {
    fontSize: 15,
    color: theme.colors.onSurface,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardsSection: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: theme.roundness * 2,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 48,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceVariant,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  activeToggleButton: {
    backgroundColor: theme.colors.primary,
  },
  toggleButtonText: {
    fontSize: 15,
    color: theme.colors.onSurface,
  },
  activeToggleButtonText: {
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
});

export default DashboardScreen;
