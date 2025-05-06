// app/AlertsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import { formatDistanceToNow } from 'date-fns';
import { theme } from '../theme/theme';
import Header from '../components/Header';

type NotificationType = 'warning' | 'info' | 'critical';

type Alert = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

type NotificationSettings = {
  outbreaks: boolean;
  trends: boolean;
  reports: boolean;
  system: boolean;
};

const AlertsScreen = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    outbreaks: true,
    trends: true,
    reports: true,
    system: false,
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Influenza Outbreak',
      message: 'Increased cases of influenza reported in the Southern District.',
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Vaccination Campaign',
      message: 'Annual vaccination campaign starts next week.',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true,
    },
    {
      id: '3',
      type: 'critical',
      title: 'COVID-19 New Variant',
      message: 'New variant detected. Authorities monitoring closely.',
      date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      read: false,
    },
  ]);

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => (alert.id === id ? { ...alert, read: true } : alert)));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: NotificationType) => {
    const iconMap = {
      warning: ['alert', '#FF9800'],
      critical: ['alert-octagon', '#F44336'],
      info: ['information', '#2196F3'],
    };
    const [name, color] = iconMap[type] || ['bell', theme.colors.primary];
    return <MaterialCommunityIcons name={name as any} size={24} color={color} />;
  };

const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, id: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => dismissAlert(id)}>
      <MaterialCommunityIcons name="trash-can" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const renderAlertItem = ({ item }: { item: Alert }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
      <TouchableOpacity style={[styles.alertItem, !item.read && styles.unreadAlert]} onPress={() => markAsRead(item.id)}>
        <View style={styles.alertIconContainer}>
          {getAlertIcon(item.type)}
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <View style={styles.alertContent}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertDate}>{formatDistanceToNow(new Date(item.date))} ago</Text>
          </View>
          <Text style={styles.alertMessage}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <Header title="Alerts & Notifications" showBackAction />
      <View style={styles.content}>
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          {[
            ['outbreaks', 'Disease Outbreaks', 'alert'],
            ['trends', 'Health Trends', 'chart-line'],
            ['reports', 'Reports & Analysis', 'file-document'],
            ['system', 'System Notifications', 'cog'],
          ].map(([key, label, icon]) => (
            <View key={key} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <MaterialCommunityIcons name={icon as any} size={24} color={theme.colors.primary} />
                <Text style={styles.settingText}>{label}</Text>
              </View>
              <Switch
                value={notifications[key as keyof NotificationSettings]}
                onValueChange={() => toggleNotification(key as keyof NotificationSettings)}
                trackColor={{ false: theme.colors.surfaceVariant, true: theme.colors.primaryContainer }}
                thumbColor={
                  notifications[key as keyof NotificationSettings] ? theme.colors.primary : theme.colors.surfaceVariant
                }
              />
            </View>
          ))}
        </View>

        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity onPress={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}>
              <Text style={styles.clearAllText}>Mark All as Read</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={alerts}
            renderItem={renderAlertItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.alertsListContent}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: theme.colors.onSurface,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
    color: theme.colors.onSurface,
  },
  alertsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearAllText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  alertsListContent: {
    paddingBottom: 16,
  },
  alertItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  unreadAlert: {
    backgroundColor: theme.colors.primaryContainer + '15',
    borderColor: theme.colors.primary,
  },
  alertIconContainer: {
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  alertContent: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  alertDate: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  alertMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 12,
    marginVertical: 4,
  },
});

export default AlertsScreen;
