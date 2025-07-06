import { io } from 'socket.io-client';
import { BASE_URL } from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io(BASE_URL, {
  autoConnect: false,
  transports: ['websocket'], // ensure stable connection
});

export const connectSocket = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    socket.auth = { token };
    socket.connect();
  }
};

export default socket;
