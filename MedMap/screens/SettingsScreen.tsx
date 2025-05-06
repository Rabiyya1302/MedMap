import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, List, Switch, useTheme, ActivityIndicator, Snackbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';
import { api } from '../services/types/api';

interface SettingsScreenProps {
  navigation: any;
}

interface UserSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
  language: string;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchSettings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await api.getSettings();
      setSettings(response);
    } catch (err) {
      setError('Failed to load settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (setting: string, value: any) => {
    try {
      if (!user) {
        setSnackbarMessage('Please sign in to save settings');
        setSnackbarVisible(true);
        return;
      }

      const response = await api.updateSetting(setting, value);
      setSettings(response);
      setSnackbarMessage('Settings updated successfully');
      setSnackbarVisible(true);
    } catch (err) {
      setError('Failed to update setting');
      console.error('Error updating setting:', err);
      setSnackbarMessage('Failed to update settings');
      setSnackbarVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={{ color: theme.colors.error }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
          Settings
        </Text>
      </Surface>

      <View style={styles.content}>
        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <List.Section>
            <List.Subheader>Appearance</List.Subheader>
            <List.Item
              title="Dark Mode"
              description="Switch between light and dark theme"
              left={props => (
                <MaterialCommunityIcons
                  {...props}
                  name="theme-light-dark"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
              right={() => (
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                />
              )}
            />
          </List.Section>
        </Surface>

        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <List.Section>
            <List.Subheader>Notifications</List.Subheader>
            <List.Item
              title="Enable Notifications"
              description="Receive updates about your diagnoses"
              left={props => (
                <MaterialCommunityIcons
                  {...props}
                  name="bell"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
              right={() => (
                <Switch
                  value={settings?.notificationsEnabled || false}
                  onValueChange={(value) => updateSetting('notificationsEnabled', value)}
                />
              )}
            />
            {settings?.notificationsEnabled && (
              <>
                <List.Item
                  title="Email Notifications"
                  left={props => (
                    <MaterialCommunityIcons
                      {...props}
                      name="email"
                      size={24}
                      color={theme.colors.primary}
                    />
                  )}
                  right={() => (
                    <Switch
                      value={settings?.notificationPreferences?.email || false}
                      onValueChange={(value) => updateSetting('notificationPreferences', {
                        ...settings.notificationPreferences,
                        email: value
                      })}
                    />
                  )}
                />
                <List.Item
                  title="Push Notifications"
                  left={props => (
                    <MaterialCommunityIcons
                      {...props}
                      name="cellphone"
                      size={24}
                      color={theme.colors.primary}
                    />
                  )}
                  right={() => (
                    <Switch
                      value={settings?.notificationPreferences?.push || false}
                      onValueChange={(value) => updateSetting('notificationPreferences', {
                        ...settings.notificationPreferences,
                        push: value
                      })}
                    />
                  )}
                />
              </>
            )}
          </List.Section>
        </Surface>

        <Surface style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <List.Section>
            <List.Subheader>About</List.Subheader>
            <List.Item
              title="Version"
              description="1.0.0"
              left={props => (
                <MaterialCommunityIcons
                  {...props}
                  name="information"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
            />
            <List.Item
              title="Privacy Policy"
              left={props => (
                <MaterialCommunityIcons
                  {...props}
                  name="shield-lock"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            <List.Item
              title="Terms of Service"
              left={props => (
                <MaterialCommunityIcons
                  {...props}
                  name="file-document"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
              onPress={() => navigation.navigate('TermsOfService')}
            />
          </List.Section>
        </Surface>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.surface }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen; 