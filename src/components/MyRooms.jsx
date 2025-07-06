import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMyRooms, getMyProfile } from '../api/api';

const CARD_WIDTH = Dimensions.get('window').width - 65;

const MyRooms = ({ refreshKey, filter, searchQuery }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const user = await getMyProfile();
        const userId = user?._id;

        const data = await getMyRooms();

        const roomsWithColor = data.map((room) => ({
          ...room,
          bgColor: room.themeColor || '#f1f5f9',
        }));

        let filteredRooms = roomsWithColor;

        if (filter === 'admin') {
          filteredRooms = roomsWithColor.filter(
            (room) => room.admin._id === userId
          );
        } else if (filter === 'joined') {
          filteredRooms = roomsWithColor.filter(
            (room) =>
              room.members.some((member) => member._id === userId) &&
              room.admin._id !== userId
          );
        }

        // ✅ Search filtering logic
        if (searchQuery && searchQuery.trim() !== '') {
          const lowerQuery = searchQuery.toLowerCase();
          filteredRooms = filteredRooms.filter(
            (room) =>
              room.name.toLowerCase().includes(lowerQuery) ||
              room.roomCode.toLowerCase().includes(lowerQuery)
          );
        }

        setRooms(filteredRooms);
      } catch (error) {
        console.log('MyRooms Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [refreshKey, filter, searchQuery]);

  const renderRoom = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.roomCard, { backgroundColor: item.bgColor }]}
      onPress={() => navigation.navigate('RoomDetails', { room: item })}
    >
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.code}>Room Code: {item.roomCode}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#2c3e50" style={{ marginTop: 40 }} />
    );
  }

  return (
    <View style={styles.container}>
      {rooms.length === 0 ? (
        <Text style={styles.noRoomsText}>
          {searchQuery
            ? 'No matching rooms found.'
            : filter === 'admin'
            ? "You haven't created any rooms yet."
            : "You haven't joined any rooms yet."}
        </Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item._id}
          renderItem={renderRoom}
          numColumns={1}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MyRooms;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingTop: 8,
  },
  noRoomsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 30,
  },
  flatListContent: {
    paddingBottom: 40,
    alignItems: 'center',
    gap: 16,
  },
  roomCard: {
    width: CARD_WIDTH,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  roomName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  code: {
    fontSize: 16,
    color: '#475569',
  },
});
