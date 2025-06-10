import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../api/config';

const ViewExpenses = () => {
  const { roomId } = useRoute().params;
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchExpenses();
  }, []);

  const renderExpense = ({ item }) => (
    <View style={styles.expenseCard}>
      <Text style={styles.amount}>₹{item.amount}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.meta}>Added by: {item.addedBy?.name || 'Unknown'}</Text>
      <Text style={styles.meta}>On: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses</Text>
      {expenses.length === 0 ? (
        <Text>No expenses yet.</Text>
      ) : (
        <FlatList data={expenses} keyExtractor={(item) => item._id} renderItem={renderExpense} />
      )}
    </View>
  );
};

export default ViewExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  expenseCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
});
