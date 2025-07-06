import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { joinRoom } from '../api/api';
import socket from '../utils/socket';

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleJoin = async () => {
    if (!roomCode.trim()) {
      ToastAndroid.show('Please enter a room code.', ToastAndroid.SHORT);
      return;
    }

    try {
      setLoading(true);
      Keyboard.dismiss();

      const formattedCode = roomCode.trim().toUpperCase();
      const res = await joinRoom(formattedCode);

      if (res?.room) {
        // 🔔 Emit join room notification to backend
        socket.emit('joinRoomNotification', {
          roomId: res.room._id,
          message: `A new member has joined "${res.room.name}".`,
        });

        ToastAndroid.show('Successfully joined the room!', ToastAndroid.SHORT);
        setRoomCode('');

        // Navigate to room details
        navigation.navigate('Home', { refresh: true, 
          room: res.room})
      } else {
        ToastAndroid.show('Room not found.', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.error('Join Room Error:', err.message);
      ToastAndroid.show(err.message || 'Failed to join room.', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Door.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>🔐 Join a Room</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Enter 6-digit Room Code</Text>

          <TextInput
            placeholder="ABC123"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={roomCode}
            onChangeText={setRoomCode}
            autoCapitalize="characters"
            maxLength={6}
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.joinButton, loading && { opacity: 0.6 }]}
            onPress={handleJoin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0B1D51" />
            ) : (
              <Text style={styles.joinText}>Join Room</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default JoinRoom;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#475569',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f1f5f9',
  },
  joinButton: {
    backgroundColor: '#FFE3A9',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinText: {
    color: '#0B1D51',
    fontWeight: '600',
    fontSize: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
  },
});
