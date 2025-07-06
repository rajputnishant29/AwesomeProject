import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import { useEffect } from 'react';
import { connectSocket } from './src/utils/socket';

import AppNavigator from './src/navigation/AppNavigator';
enableScreens();

const App = () => {
  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({});
