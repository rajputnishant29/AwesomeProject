import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

const RoomDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { room } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{room.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Room Code:</Text>
        <Text style={styles.value}>{room.roomCode}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Admin:</Text>
        <Text style={styles.value}>{room.admin?.name || 'Unknown'}</Text>
      </View>

      <Text style={styles.subheading}>👥 Members</Text>
      <FlatList
        data={room.members}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.memberItem}>• {item.name}</Text>
        )}
        ListEmptyComponent={<Text style={{ color: '#999' }}>No members found.</Text>}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007bff' }]}
        onPress={() => navigation.navigate('AddExpense', { room })}
      >
        <Text style={styles.buttonText}>➕ Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => navigation.navigate('ViewExpense', { roomId: room._id })}
      >
        <Text style={styles.buttonText}>👀 View Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={[styles.button, { backgroundColor: '#ffa500' }]}
  onPress={() => navigation.navigate('Settlement', { roomId: room._id })}
>
  <Text style={styles.buttonText}>💸 View Settlements</Text>
</TouchableOpacity>

    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f5f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e3a8a',
    marginTop: 20,
    marginBottom: 10,
  },
  memberItem: {
    fontSize: 16,
    color: '#1e293b',
    paddingVertical: 4,
    paddingLeft: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
});
