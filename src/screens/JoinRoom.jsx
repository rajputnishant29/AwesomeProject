import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { joinRoom } from '../api/api'; // ✅ Import your existing function

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigation = useNavigation();

  const handleJoin = async () => {
    if (!roomCode.trim()) {
      Alert.alert('Error', 'Please enter a room code.');
      return;
    }

    try {
      const res = await joinRoom(roomCode); // ✅ Use your reusable API function
      if (res?.room) {
        navigation.navigate('RoomDetails', { room: res.room });
      } else {
        Alert.alert('Error', 'Room not found.');
      }
    } catch (err) {
      console.log('Join Room Error:', err.message);
      Alert.alert('Error', err.message || 'Failed to join room. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Room</Text>
      <TextInput
        placeholder="Enter Room Code"
        style={styles.input}
        value={roomCode}
        onChangeText={setRoomCode}
        autoCapitalize="characters" // Helpful if your room codes are uppercase
      />
      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 6
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
