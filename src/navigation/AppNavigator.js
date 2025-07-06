import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import MainTabs from './MainTabs';
import Register from '../screens/Register';
import Login from '../screens/Login';
import RoomDetails from '../screens/RoomDetails';
import AddExpense from '../screens/AddExpense';
import ViewExpenses from '../components/ViewExpense';
import MyRooms from '../components/MyRooms';
import Settlement from '../components/Settlement';
import PendingRequests from '../components/PendingRequests';
import Notifications from '../screens/Notifications';
import SplashScreen from '../components/Splash';
import AboutUs from '../screens/About';
import Feedback from '../screens/Feedback';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import RoomChatScreen from '../screens/Chat';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token); // true if token exists
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) {
    return null; // or return a loading spinner
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="RoomDetails" component={RoomDetails} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="ViewExpense" component={ViewExpenses} />
            <Stack.Screen name="MyRooms" component={MyRooms} />
            <Stack.Screen name="Settlement" component={Settlement} />
            <Stack.Screen name="PendingRequests" component={PendingRequests} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RoomChat" component={RoomChatScreen} />

          </>
        ) : (
          <>  
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="RoomDetails" component={RoomDetails} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="ViewExpense" component={ViewExpenses} />
            <Stack.Screen name="MyRooms" component={MyRooms} />
            <Stack.Screen name="Settlement" component={Settlement} />
            <Stack.Screen name="PendingRequests" component={PendingRequests} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Feedback" component={Feedback} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="RoomChat" component={RoomChatScreen} />


          </>
        )}
      </Stack.Navigator>
  );
};

export default AppNavigator;
