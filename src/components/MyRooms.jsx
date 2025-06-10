import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyRooms } from '../api/api';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyRooms();
        setRooms(data);
      } catch (error) {
        console.log('MyRooms Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const renderRoom = ({ item }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => navigation.navigate('RoomDetails', { room: item })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.code}>Code: {item.roomCode}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Rooms</Text>
      {rooms.length === 0 ? (
        <Text>You haven't joined any rooms yet.</Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id}
          renderItem={renderRoom}
        />
      )}
    </View>
  );
};

export default MyRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  roomCard: {
    padding: 14,
    backgroundColor: '#e6f0ff',
    borderRadius: 8,
    marginBottom: 12,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
  },
  code: {
    fontSize: 14,
    color: '#333',
  },
});