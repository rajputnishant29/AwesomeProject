import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getMySettlementRequests, approveSettlement } from '../api/api';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const data = await getMySettlementRequests();
      setRequests(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await approveSettlement(requestId);
      Alert.alert('Approved', 'Settlement marked as approved!');
      fetchRequests(); // Refresh list
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕓 Pending Settlement Requests</Text>
      {requests.length === 0 ? (
        <Text style={styles.info}>No pending requests. 🎉</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>
                <Text style={styles.name}>{item.from.name}</Text> has marked ₹
                {item.amount} as paid to you.
              </Text>
              <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(item._id)}>
                <Text style={styles.buttonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PendingRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#713f12',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  approveButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
