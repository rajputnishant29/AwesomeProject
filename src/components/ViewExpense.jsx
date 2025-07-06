import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import { getMyProfile, deleteExpense } from '../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ViewExpenses = () => {
  const { roomId, themeColor } = useRoute().params;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = await getMyProfile();
      setUser(userData);
    } catch (err) {
      console.log('User Fetch Error:', err.message);
    }
  };

  const fetchExpenses = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/expenses/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.log('Fetch Expenses Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchExpenses();
  }, []);

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  const renderExpense = ({ item }) => (
    <View style={styles.expenseCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
        {user && item.addedBy?._id === user._id && (
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>

      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      <View style={styles.metaRow}>
        <Text style={styles.meta}>By: {item.addedBy?.name || 'Unknown'}</Text>
        <Text style={styles.meta}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  if (loading)
    return (
      <View style={[styles.loaderContainer, { backgroundColor: themeColor }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <Text style={styles.heading}>Room Expenses</Text>
      <Text style={styles.total}>Total: ₹{totalAmount.toFixed(2)}</Text>

      {expenses.length === 0 ? (
        <Text style={styles.empty}>No expenses added yet 💤</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item._id}
          renderItem={renderExpense}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default ViewExpenses;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0B1D51',
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -24,
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  total: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e7d32',
  },
  expenseCard: {
    backgroundColor: '#FFE3A9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: screenWidth - 32,
    alignSelf: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 40,
  },
});
