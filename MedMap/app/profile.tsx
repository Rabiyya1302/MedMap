import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, List, Switch, Button, Divider, useTheme } from 'react-native-paper';
import Header from '../components/Header';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [shareDiagnosisEnabled, setShareDiagnosisEnabled] = useState(false);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView>
        <View style={styles.profileHeader}>
          <Avatar.Icon 
            size={80} 
            icon="account" 
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text variant="headlineSmall" style={styles.userName}>
            John Doe
          </Text>
          <Text variant="bodyMedium" style={styles.userEmail}>
            johndoe@example.com
          </Text>
          
          <Button 
            mode="outlined" 
            icon="pencil" 
            style={styles.editButton}
          >
            Edit Profile
          </Button>
        </View>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          
          <List.Item
            title="Enable Notifications"
            right={() => 
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            }
          />
          
          <List.Item
            title="Enable Location"
            description="Required for regional disease mapping"
            right={() => 
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
              />
            }
          />
          
          <List.Item
            title="Share Anonymous Diagnosis Data"
            description="Help improve public health monitoring"
            right={() => 
              <Switch
                value={shareDiagnosisEnabled}
                onValueChange={setShareDiagnosisEnabled}
              />
            }
          />
        </List.Section>
        
        <Divider />
        
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          
          <List.Item
            title="Personal Information"
            left={props => <List.Icon {...props} icon="card-account-details" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <List.Item
            title="Medical History"
            left={props => <List.Icon {...props} icon="medical-bag" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <List.Item
            title="Privacy Settings"
            left={props => <List.Icon {...props} icon="shield-lock" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <List.Item
            title="Help & Support"
            left={props => <List.Icon {...props} icon="help-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
        
        <View style={styles.logoutButtonContainer}>
          <Button 
            mode="contained" 
            icon="logout" 
            buttonColor={theme.colors.error}
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Log Out
          </Button>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MedMap v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  userName: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    opacity: 0.7,
  },
  editButton: {
    marginTop: 16,
  },
  logoutButtonContainer: {
    padding: 16,
    paddingVertical: 24,
  },
  logoutButton: {
    borderRadius: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  versionText: {
    opacity: 0.5,
    fontSize: 12,
  },
});

export default ProfileScreen;
