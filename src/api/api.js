import axios from 'axios';
import { BASE_URL } from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    });

    const token = response.data.token;
    await AsyncStorage.setItem('token', token);

    return response.data;
  } catch (error) {
     console.log('🛑 Login Error:', JSON.stringify(error, null, 2));
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};


export const createRoom = async (roomName) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId'); // Make sure this is saved during login

    const response = await axios.post(
      `${BASE_URL}/api/rooms/create`,
      {
        name: roomName,
        admin: userId,
        members: [userId],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Room creation failed';
  }
};


export const joinRoom = async (roomCode) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/api/rooms/join`,
      { roomCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Joining room failed';
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('token');
};

export const createExpense = async (roomId, expenseData) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.post(
      `${BASE_URL}/api/expenses/${roomId}/add`,
      expenseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to add expense';
  }
};

export const getMyRooms = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/api/rooms/my-rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || 'Failed to fetch user rooms';
  }
};

export const getMyProfile = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch profile';
  }
};

export const getRoomSettlements = async (roomId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`${BASE_URL}/api/expenses/settlement/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.settlements;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch settlements';
  }
};

export const requestSettlement = async ({ from, to, amount, roomId }) => {
  const token = await AsyncStorage.getItem('token');

  console.log("Sending settlement request:", {
    from, to, amount, roomId
  });

  try {
    const res = await axios.post(
      `${BASE_URL}/api/settlements/request`,
      {
        from,
        to,
        amount,
        roomId, // You're sending roomId here
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Settlement request error:", error.response?.data || error.message);
    throw error;
  }
};


export const approveSettlement = async (requestId) => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.post(
    `${BASE_URL}/api/settlements/approve/${requestId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getMySettlementRequests = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/api/settlements/my-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.requests;
};
