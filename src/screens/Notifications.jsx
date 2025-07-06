import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { getMyNotifications } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchNotifications = async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderTypeIcon = (type) => {
    switch (type) {
      case 'settlement-request':
        return '💰 Settlement Requested';
      case 'settlement-approved':
        return '✅ Settlement Approved';
      case 'expense-added':
        return '🧾 New Expense Added';
      default:
        return '🔔 Notification';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.type === 'settlement-request' && item.roomId?._id) {
          navigation.navigate('Settlement', { roomId: item.roomId._id });
        }
      }}
      style={styles.card}
    >
      <Text style={styles.type}>{renderTypeIcon(item.type)}</Text>

      <Text style={styles.message}>{item.message}</Text>

      {item.roomId?.name && (
        <Text style={styles.room}>
          Room: <Text style={{ fontWeight: '600' }}>{item.roomId.name}</Text>
        </Text>
      )}

      <Text style={styles.sender}>
        From: <Text style={{ fontWeight: '600' }}>{item.sender?.name || 'Someone'}</Text>
      </Text>

      <Text style={styles.time}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#0B1D51" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>🔔 Notifications</Text>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0B1D51" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchNotifications();
              }}
            />
          }
          ListEmptyComponent={
            <Text style={styles.noNotifications}>You have no notifications yet!</Text>
          }
          contentContainerStyle={notifications.length === 0 && styles.centered}
        />
      )}
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0B1D51',
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 4,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFE3A9',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0B1D51',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  room: {
    fontSize: 13,
    color: '#334155',
    marginTop: 6,
  },
  sender: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  noNotifications: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#475569',
  },
  centered: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
