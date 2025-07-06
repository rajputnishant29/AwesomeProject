import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';

const Feedback = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendFeedback = () => {
    if (!message.trim()) {
      Alert.alert('Message Required', 'Please enter your feedback.');
      return;
    }

    const email = 'support@owezone.app'; // replace with your real email
    const mailUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject || 'Feedback from OweZone App'
    )}&body=${encodeURIComponent(message)}`;

    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Error', 'Could not open mail client.');
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Feedback</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Optional"
          placeholderTextColor="#94a3b8"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Your Feedback</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your valuable feedback here..."
          placeholderTextColor="#94a3b8"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={6}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendFeedback}>
          <Text style={styles.sendBtnText}>Send Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    backgroundColor: '#8CCDEB',
    marginHorizontal: -24,
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFE3A9',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    marginBottom: 40,
  },
  label: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 15,
    color: '#0f172a',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendBtn: {
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
