import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { createRoom } from '../api/api';
import BottomToast from '../components/BottomToast'; // make sure this exists

const colorOptions = ['#D9C5F2', '#B8E2D0', '#F9C6A6', '#DDA6A1'];
const sizeOptions = ['Mini', 'Mid', 'Giant'];

export default function CreateRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
  };

  const handleCreate = async () => {
    if (!roomName.trim()) {
      showToast('Room name is required');
      return;
    }

    setLoading(true);

    const roomData = {
      name: roomName,
      description,
      themeColor: selectedColor,
      size: selectedSize,
    };

    try {
      await createRoom(roomData);
      showToast('Room created successfully!');

      // Reset form
      setRoomName('');
      setDescription('');
      setSelectedColor(colorOptions[0]);
      setSelectedSize(sizeOptions[0]);

      // Navigate back after delay
      setTimeout(() => navigation.navigate('Home', { refresh: true }), 1500);
    } catch (error) {
      console.error('Error creating room:', error);
      showToast(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create a New Room</Text>

      <Text style={styles.label}>Room Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Room Name"
        placeholderTextColor="#888"
        value={roomName}
        onChangeText={setRoomName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Room Description"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Choose Room Size</Text>
      <View style={styles.optionRow}>
        {sizeOptions.map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeOption,
              selectedSize === size && styles.selectedOption,
            ]}
            onPress={() => setSelectedSize(size)}
            disabled={loading}
          >
            <Text
              style={[
                styles.optionText,
                selectedSize === size && styles.selectedOptionText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Choose Theme Color</Text>
      <View style={styles.colorRow}>
        {colorOptions.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorCircle,
              { backgroundColor: color },
              selectedColor === color && styles.selectedCircle,
            ]}
            onPress={() => setSelectedColor(color)}
            disabled={loading}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleCreate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0B1D51" />
        ) : (
          <Text style={styles.buttonText}>Create Room</Text>
        )}
      </TouchableOpacity>

      {/* Bottom Toast */}
      <BottomToast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({ visible: false, message: '' })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -30,
    marginTop: -40,
    paddingTop: 80,
    paddingBottom: 30,
    color: '#0B1D51',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dcdde1',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 12,
    height: 48,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 20,
  },
  sizeOption: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#8CCDEB',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#FFE3A9',
    borderWidth: 1,
    borderColor: '#0B1D51',
  },
  optionText: {
    fontWeight: '600',
    color: '#0B1D51',
  },
  selectedOptionText: {
    color: '#0B1D51',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  selectedCircle: {
    borderColor: '#0B1D51',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#FFE3A9',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  buttonText: {
    color: '#0B1D51',
    fontSize: 17,
    fontWeight: '600',
  },
});
