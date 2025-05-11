import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import{Picker} from "@react-native-picker/picker";

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role,setRole]=useState<"user"|"official">("user")
  const { register, loading } = useAuth();

  const handleRegister = async () => {
    try {
      // Basic validation
      if (!email || !password || !confirmPassword || !fullname || !phoneNumber) {
        Alert.alert('Missing fields', 'Please fill in all fields.');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match.');
        return;
      }

      await register(email, password, fullname, phoneNumber,role);

      // Navigate to dashboard with query parameter
      router.push('/dashboard?from=register');
    } catch (error: any) {
      Alert.alert('Registration Error', error.message || 'Something went wrong.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
     {/* Role Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Registering as:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="General User" value="user" />
          <Picker.Item label="Health Official" value="official" />
        </Picker>
      </View>
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.onPrimary} />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => router.push('/loginScreen')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    color: theme.colors.onSurface,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: theme.colors.onSurface,
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
    pickerContainer: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
  },
  pickerLabel: {
    color: theme.colors.onSurface,
    paddingLeft: 12,
    paddingTop: 8,
  },
  picker: {
    height: 50,
    color: theme.colors.onSurface,
  },

});
