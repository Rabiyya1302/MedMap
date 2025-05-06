import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import Header from '../components/Header';

const ManageUsersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  const roles = [
    { id: 'all', label: 'All' },
    { id: 'admin', label: 'Administrators' },
    { id: 'health', label: 'Health Workers' },
    { id: 'official', label: 'Officials' },
    { id: 'user', label: 'Standard Users' },
  ];
  
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane.smith@health.gov',
      role: 'admin',
      status: 'active',
      avatar: '👩‍⚕️',
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john.doe@health.gov',
      role: 'health',
      status: 'active',
      avatar: '👨‍⚕️',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria.garcia@city.gov',
      role: 'official',
      status: 'pending',
      avatar: '👩‍💼',
    },
    {
      id: '4',
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      role: 'user',
      status: 'active',
      avatar: '👨',
    },
    {
      id: '5',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@health.gov',
      role: 'health',
      status: 'inactive',
      avatar: '👩‍⚕️',
    },
    {
      id: '6',
      name: 'David Lee',
      email: 'david.lee@city.gov',
      role: 'official',
      status: 'active',
      avatar: '👨‍💼',
    },
    {
      id: '7',
      name: 'Olivia Williams',
      email: 'olivia.williams@email.com',
      role: 'user',
      status: 'active',
      avatar: '👩',
    },
  ]);

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <MaterialCommunityIcons name="shield-account" size={20} color="#F44336" />;
      case 'health':
        return <MaterialCommunityIcons name="medical-bag" size={20} color="#2196F3" />;
      case 'official':
        return <MaterialCommunityIcons name="account-tie" size={20} color="#FF9800" />;
      case 'user':
        return <MaterialCommunityIcons name="account" size={20} color="#4CAF50" />;
      default:
        return <MaterialCommunityIcons name="account" size={20} color={theme.colors.primary} />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <View style={[styles.statusBadge, styles.activeStatus]}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        );
      case 'inactive':
        return (
          <View style={[styles.statusBadge, styles.inactiveStatus]}>
            <Text style={styles.statusText}>Inactive</Text>
          </View>
        );
      case 'pending':
        return (
          <View style={[styles.statusBadge, styles.pendingStatus]}>
            <Text style={styles.statusText}>Pending</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    const searchMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return roleMatch && searchMatch;
  });

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
      
      <View style={styles.userDetails}>
        <View style={styles.roleContainer}>
          {getRoleIcon(item.role)}
          <Text style={styles.roleText}>
            {roles.find(role => role.id === item.role)?.label || 'User'}
          </Text>
        </View>
        {getStatusBadge(item.status)}
      </View>
      
      <View style={styles.userActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="pencil" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="email" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="dots-vertical" size={20} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Manage Users" backButton={true} />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color={theme.colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color={theme.colors.onSurfaceVariant} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter by role:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roleFilters}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[styles.roleFilterButton, selectedRole === role.id && styles.activeRoleFilter]}
                onPress={() => setSelectedRole(role.id)}
              >
                <Text 
                  style={[styles.roleFilterText, selectedRole === role.id && styles.activeRoleFilterText]}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{users.length}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(user => user.status === 'active').length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(user => user.status === 'pending').length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {users.filter(user => user.status === 'inactive').length}
            </Text>
            <Text style={styles.statLabel}>Inactive</Text>
          </View>
        </View>
        
        <View style={styles.usersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Users ({filteredUsers.length})
            </Text>
            <TouchableOpacity style={styles.addButton}>
              <MaterialCommunityIcons name="account-plus" size={20} color={theme.colors.onPrimary} />
              <Text style={styles.addButtonText}>Add User</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            style={styles.usersList}
            contentContainerStyle={styles.usersListContent}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: theme.colors.onSurface,
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 8,
    color: theme.colors.onSurfaceVariant,
  },
  roleFilters: {
    flexDirection: 'row',
  },
  roleFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    marginRight: 8,
  },
  activeRoleFilter: {
    backgroundColor: theme.colors.primaryContainer,
    borderColor: theme.colors.primary,
  },
  roleFilterText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  activeRoleFilterText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  usersSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addButtonText: {
    color: theme.colors.onPrimary,
    fontSize: 14,
    marginLeft: 4,
  },
  usersList: {
    flex: 1,
  },
  usersListContent: {
    paddingBottom: 16,
  },
  userCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  userHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  userDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 14,
    color: theme.colors.onSurface,
    marginLeft: 6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeStatus: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  inactiveStatus: {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  pendingStatus: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
    paddingTop: 12,
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
  },
});

const ScrollView = ({ children, horizontal, showsHorizontalScrollIndicator, style }) => {
  return (
    <View style={[style, horizontal && { flexDirection: 'row' }]}>
      {children}
    </View>
  );
};

export default ManageUsersScreen;
