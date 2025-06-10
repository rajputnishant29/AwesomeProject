import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyRooms from '../components/MyRooms';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to RoomCart 🛒</Text>
      
      {/* You can uncomment these buttons if needed */}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateRoom')}>
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('MyRooms')}>
        <Text style={styles.linkText}>📂 My Rooms</Text>
      </TouchableOpacity> */}

      <View style={styles.roomsContainer}>
        <MyRooms />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#f0f4ff',
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 18,
    color: '#4a90e2',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  roomsContainer: {
    width: '100%',
    marginTop: 10,
  },
});
