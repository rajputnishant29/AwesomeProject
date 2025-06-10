import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyProfile, logoutUser } from '../api/api';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getMyProfile();
        setUser(userData);
      } catch (err) {
        console.log('Profile Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace('Login'); // Update based on your navigator
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👤 Profile</Text>
      {user ? (
        <>
          <Text style={styles.label}>Name: <Text style={styles.value}>{user.name}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
          <Text style={styles.label}>Joined: <Text style={styles.value}>{new Date(user.createdAt).toLocaleDateString()}</Text></Text>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Unable to load profile data.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
