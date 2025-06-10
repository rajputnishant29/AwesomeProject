import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { createRoom } from '../api/api';

export default function CreateRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');

  const handleCreate = async () => {
    if (!roomName.trim()) return;

    try {
      const data = await createRoom(roomName);
      navigation.navigate('RoomDetails', { room: data.room });
    } catch (error) {
      console.error('Error creating room:', error);
      alert(error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Room</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Room Name"
        placeholderTextColor="#aaa"
        value={roomName}
        onChangeText={setRoomName}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced6e0',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
