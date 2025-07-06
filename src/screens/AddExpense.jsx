import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createExpense } from '../api/api';

const AddExpense = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const { room } = route.params;

  const themeColor = room?.themeColor || '#8CCDEB';

  const handleAddExpense = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Validation Error', 'Title and amount are required.');
      return;
    }

    try {
      setLoading(true);
      Keyboard.dismiss();

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#F9FCFF' }]}>
      <Text style={styles.heading}>➕ Add New Expense</Text>

      <TextInput
        style={[
          styles.input,
          focused === 'title' && { borderColor: themeColor }
        ]}
        placeholder="Title (e.g. Milk, Electricity)"
        placeholderTextColor="#888"
        value={title}
        onChangeText={setTitle}
        onFocus={() => setFocused('title')}
        onBlur={() => setFocused(null)}
        editable={!loading}
      />

      <View
        style={[
          styles.amountWrapper,
          focused === 'amount' && { borderColor: themeColor }
        ]}
      >
        <Text style={styles.rsSymbol}>₹</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="Amount"
          placeholderTextColor="#888"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          onFocus={() => setFocused('amount')}
          onBlur={() => setFocused(null)}
          editable={!loading}
        />
      </View>

      <TextInput
        style={[
          styles.input,
          styles.textarea,
          focused === 'description' && { borderColor: themeColor }
        ]}
        placeholder="Description (optional)"
        placeholderTextColor="#888"
        value={description}
        onChangeText={setDescription}
        multiline
        onFocus={() => setFocused('description')}
        onBlur={() => setFocused(null)}
        editable={!loading}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: '#FFE3A9' },
          loading && { opacity: 0.6 },
        ]}
        onPress={handleAddExpense}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#0B1D51" />
        ) : (
          <Text style={styles.buttonText}>Add Expense</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddExpense;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
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
  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
    elevation: 2,
  },
  textarea: {
    height: 90,
    textAlignVertical: 'top',
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 18,
    backgroundColor: '#fff',
    elevation: 2,
  },
  rsSymbol: {
    fontSize: 18,
    color: '#0B1D51',
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#000',
  },
  button: {
    marginTop: 15,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#0B1D51',
    fontWeight: '600',
    fontSize: 17,
  },
});
