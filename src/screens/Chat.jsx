import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';
import { getMyProfile, getRoomMessages, sendMessage } from '../api/api';
import { BASE_URL } from '../api/config';

const socket = io(BASE_URL);

const RoomChatScreen = ({ route }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const profile = await getMyProfile();
      setUser(profile);
      socket.emit('joinRoom', roomId);

      const history = await getRoomMessages(roomId);
      setMessages(history);
    };
    init();

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit('leaveRoom', roomId);
      socket.off('receiveMessage');
    };
  }, [roomId]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    const msgData = {
      roomId,
      senderId: user._id,
      senderName: user.name,
      text: message.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage('');

    try {
      await sendMessage(msgData);
    } catch (e) {
      console.log('Message not saved:', e);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.senderId === user?._id
          ? styles.myMessage
          : styles.otherMessage,
      ]}
    >
      <Text style={styles.senderName}>{item.senderName}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.roomTitle}>Chat - {roomName}</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputRow}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RoomChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 16,
  },
  roomTitle: {
    fontWeight: 'bold',
    color: '#0B1D51',
    textAlign: 'center',
    marginVertical: 12,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -30,
    marginTop: -40,
    paddingTop: 80,
    paddingBottom: 30,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFE3A9',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
  },
  senderName: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    color: '#111',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#0B1D51',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});