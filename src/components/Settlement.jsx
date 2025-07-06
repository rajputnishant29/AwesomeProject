import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getRoomSettlements, requestSettlement, getMyProfile} from '../api/api';
import {useRoute, useNavigation} from '@react-navigation/native';

const Settlement = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {roomId} = route.params;

  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getMyProfile();
        setUserId(user._id);

        const data = await getRoomSettlements(roomId);
        setSettlements(data);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const handleMarkAsPaid = async item => {
    try {
      await requestSettlement({
        from: item.from._id,
        to: item.to._id,
        amount: item.amount,
        roomId,
      });
      Alert.alert('Request Sent', 'Marked as paid. Awaiting confirmation.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{marginTop: 40}} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💸 Room Settlements</Text>
      {settlements.length === 0 ? (
        <Text style={styles.info}>All settled up! 🥳</Text>
      ) : (
        <FlatList
          data={settlements}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.text}>
                <Text style={styles.name}>{item.from.name}</Text> has to pay{' '}
                <Text style={styles.amount}>₹{item.amount}</Text> to{' '}
                <Text style={styles.name}>{item.to.name}</Text>
              </Text>

              {item.from._id === userId && (
                <TouchableOpacity
                  style={styles.paidButton}
                  onPress={() => handleMarkAsPaid(item)}>
                  <Text style={styles.buttonText}>Mark as Paid</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'red'}]}
        onPress={() =>
          navigation.navigate('PendingRequests', {roomId})
        }>
        <Text style={styles.buttonText}>💸 Requests</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settlement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3a8a',
    textAlign: 'center',
     backgroundColor: '#8CCDEB', // light pink, or use any hex code you like
  paddingHorizontal: 30,
  marginHorizontal: -24,
  marginTop: -40,
  paddingTop: 50,
  paddingBottom: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  },
  info: {
    fontSize: 18,
    textAlign: 'center',
    color: '#777',
  },
  card: {
    backgroundColor: '#FFE3A9',
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#22c55e', // Green indicator
  },
  text: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  amount: {
    fontWeight: 'bold',
    color: '#dc2626',
  },
  paidButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
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
