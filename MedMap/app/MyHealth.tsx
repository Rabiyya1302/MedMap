import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, useTheme, Avatar, TextInput } from 'react-native-paper';

const MyHealth: React.FC = () => {
  const theme = useTheme();

  // State for user profile and health info
  const [userName, setUserName] = useState('John Doe');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [editProfile, setEditProfile] = useState(false);

  const [lastCheckup, setLastCheckup] = useState('2024-05-20');
  const [editCheckup, setEditCheckup] = useState(false);
  const [checkupInput, setCheckupInput] = useState(lastCheckup);

  const [upcomingAppointments] = useState([
    { id: '1', date: '2024-06-15', type: 'General Checkup' },
    { id: '2', date: '2024-07-10', type: 'Dental Cleaning' },
  ]);

  const [healthTips] = useState([
    '💧 Stay hydrated by drinking at least 8 glasses of water daily.',
    '🏃‍♂️ Exercise for at least 30 minutes, 5 times a week.',
    '🥗 Eat a balanced diet rich in fruits and vegetables.',
  ]);

  const initials = userName.split(' ').map(n => n[0]).join('');

  const handleSaveCheckup = () => {
    setLastCheckup(checkupInput);
    setEditCheckup(false);
  };

  const handleUpdateHealthInfo = () => {
    setEditProfile(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Avatar.Text size={72} label={initials} />
        <Text style={styles.greeting}>Hello, {userName}!</Text>
        <Text style={styles.subGreeting}>Manage your health effortlessly 🌿</Text>
      </View>

      <Card style={styles.card}>
        <Card.Title title="My Health Info" titleStyle={styles.cardTitle} />
        <Card.Content>
          {editProfile ? (
            <>
              <TextInput
                label="Full Name"
                value={userName}
                onChangeText={setUserName}
                style={styles.input}
              />
              <TextInput
                label="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                label="Weight (kg)"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                label="Blood Pressure"
                value={bloodPressure}
                onChangeText={setBloodPressure}
                style={styles.input}
              />
              <Button mode="contained" onPress={handleUpdateHealthInfo} style={styles.button}>
                Save Info
              </Button>
              <Button mode="text" onPress={() => setEditProfile(false)} style={styles.button}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>👤 Name: {userName}</Text>
              <Text style={styles.infoText}>🎂 Age: {age || 'Not set'}</Text>
              <Text style={styles.infoText}>⚖️ Weight: {weight || 'Not set'}</Text>
              <Text style={styles.infoText}>❤️ Blood Pressure: {bloodPressure || 'Not set'}</Text>
              <Button mode="outlined" onPress={() => setEditProfile(true)} style={styles.button}>
                Edit Info
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Last Checkup" titleStyle={styles.cardTitle} />
        <Card.Content>
          {editCheckup ? (
            <>
              <TextInput
                label="Last Checkup Date"
                value={checkupInput}
                onChangeText={setCheckupInput}
                style={styles.input}
              />
              <Button mode="contained" onPress={handleSaveCheckup} style={styles.button}>
                Save
              </Button>
              <Button mode="text" onPress={() => setEditCheckup(false)} style={styles.button}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Text>Your last checkup was on {lastCheckup}.</Text>
              <Button mode="outlined" onPress={() => setEditCheckup(true)} style={styles.button}>
                Update Details
              </Button>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Upcoming Appointments" titleStyle={styles.cardTitle} />
        <Card.Content>
          {upcomingAppointments.map(({ id, date, type }) => (
            <View key={id} style={styles.appointment}>
              <Text>{date} - {type}</Text>
              <Button mode="text" compact>Reschedule</Button>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Health Tips" titleStyle={styles.cardTitle} />
        <Card.Content>
          {healthTips.map((tip, index) => (
            <Text key={index} style={styles.tip}>{tip}</Text>
          ))}
        </Card.Content>
      </Card>

      {!editProfile && (
        <Button mode="contained" style={styles.finalButton} onPress={() => setEditProfile(true)}>
          Update Health Info
        </Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 42,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  appointment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tip: {
    marginBottom: 6,
  },
  finalButton: {
    marginTop: 24,
    marginBottom: 32,
  },
  infoText: {
    marginBottom: 6,
    fontSize: 16,
  },
});

export default MyHealth;
