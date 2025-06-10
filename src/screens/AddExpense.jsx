import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createExpense } from '../api/api'; // We'll create this function next

const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const { room } = route.params;

  const handleAddExpense = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Validation Error', 'Title and amount are required.');
      return;
    }

    try {
      await createExpense(room._id, {
        title,
        amount: parseFloat(amount),
        description,
      });

      Alert.alert('Success', 'Expense added successfully.');
      navigation.goBack();
    } catch (err) {
      console.log('Expense Error:', err);
      Alert.alert('Error', err.message || 'Failed to add expense');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Title (e.g. Milk, Electricity)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
