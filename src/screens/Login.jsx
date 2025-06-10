import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { loginUser } from '../api/api';

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

const handleLogin = async () => {
  const { email, password } = form;

  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  try {
    const userData = await loginUser(email, password);
    Alert.alert('Success', 'Logged in successfully!');
    console.log('User Data:', userData); 
    navigation.navigate('MainTabs');
  } catch (error) {
    console.log('🔴 Login screen error:', error.message);
  Alert.alert('Login Failed', error.message || 'Something went wrong');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={!showPassword}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.showPasswordBtn}
      >
        <Text style={styles.showPasswordText}>
          {showPassword ? 'Hide Password' : 'Show Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerRedirect}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  showPasswordBtn: {
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  showPasswordText: {
    color: '#007bff',
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerRedirect: {
    textAlign: 'center',
    color: '#555',
  },
});
