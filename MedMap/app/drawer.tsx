import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Text, useTheme, Divider, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DrawerItem {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
}

interface DrawerContentProps {
  navigation: any;
  currentRoute: string;
  toggleRole: () => void;
  isAdmin: boolean;
}

const DrawerContent = ({
  navigation,
  currentRoute,
  toggleRole,
  isAdmin,
}: DrawerContentProps) => {
  const theme = useTheme();
  const colors = theme.colors;

  const drawerItems: DrawerItem[] = isAdmin
    ? [
        { label: 'Dashboard', icon: 'view-dashboard', route: 'Dashboard' },
        { label: 'Manage Users', icon: 'account-group', route: 'ManageUsers' },
        { label: 'Settings', icon: 'cog', route: 'Settings' },
      ]
    : [
        { label: 'Home', icon: 'home', route: 'home' },
        { label: 'My Health', icon: 'heart-pulse', route: 'MyHealth' },
        { label: 'Alerts', icon: 'bell-alert', route: 'alertScreen' },
        { label: 'Settings', icon: 'cog', route: 'settings' },
      ];

  return (
    <View style={[styles.drawerContainer, { backgroundColor: colors.surface }]}>
      <DrawerContentScrollView>
        <View style={styles.headerSection}>
          <Avatar.Icon icon="account-circle" size={56} style={{ backgroundColor: colors.primary }} />
          <Text variant="titleMedium" style={[styles.username, { color: colors.onSurface }]}>
            {isAdmin ? 'Admin User' : 'General User'}
          </Text>
        </View>

        <Divider style={styles.divider} />

        <Drawer.Section style={styles.drawerSection}>
          {drawerItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => navigation.navigate(item.route)}
                style={[
                  styles.drawerItem,
                  isActive && { backgroundColor: colors.primaryContainer },
                  Platform.OS === 'android' && { elevation: isActive ? 2 : 0 },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={isActive ? colors.onPrimaryContainer : colors.onSurface}
                />
                <Text
                  style={[
                    styles.drawerItemText,
                    {
                      color: isActive ? colors.onPrimaryContainer : colors.onSurface,
                      fontWeight: isActive ? '600' : '400',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Drawer.Section>

        <Divider style={styles.divider} />

        <View style={styles.roleToggleSection}>
          <Text style={[styles.roleText, { color: colors.onSurfaceVariant }]}>
            Role:
          </Text>
          <TouchableOpacity
            onPress={toggleRole}
            style={[styles.toggleButton, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.toggleButtonText, { color: colors.onPrimary }]}>
              Switch to {isAdmin ? 'User' : 'Admin'}
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  drawerSection: {
    marginTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  drawerItemText: {
    marginLeft: 20,
    fontSize: 16,
  },
  roleToggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  roleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    marginHorizontal: 16,
    marginVertical: 8,
    height: 1,
  },
});

export default DrawerContent;
