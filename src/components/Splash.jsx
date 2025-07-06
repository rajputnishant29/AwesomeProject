import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { getMyProfile } from '../api/api';

export default function SplashScreen() {
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 40,
    }).start();

    const checkAuth = async () => {
      try {
        const user = await getMyProfile();
        if (user && user._id) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Login');
        }
      } catch (err) {
        navigation.replace('Login');
      }
    };

    const timeout = setTimeout(() => {
      checkAuth();
    }, 1000); // wait for animation then check

    return () => clearTimeout(timeout);
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        <Animated.Image
          source={require('../../assets/images/OweZone_logo.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 30,
  },
});
