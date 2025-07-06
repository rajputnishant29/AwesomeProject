import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import CreateRoomScreen from '../screens/CreateRoom';
import ProfileScreen from '../screens/ProfileScreen';
import JoinRoom from '../screens/JoinRoom';

const Tab = createBottomTabNavigator();

const AnimatedIcon = ({ name, focused }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: focused ? 1.2 : 1,
        duration: 200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: focused ? -10 : 0,
        duration: 200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.iconWrapper,
        focused && styles.activeIconWrapper,
        {
          transform: [{ scale }, { translateY }],
        },
      ]}
    >
      <MaterialCommunityIcons
        name={name}
        size={30}
        color={focused ? '#0B1D51' : '#0B1D51'}
      />
    </Animated.View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          position: 'absolute',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#8CCDEB',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 15,
        },
        tabBarButton: (props) => (
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.tabButton}>{props.children}</View>
          </TouchableWithoutFeedback>
        ),
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'CreateRoom') iconName = 'plus-circle-outline';
          else if (route.name === 'JoinRoom') iconName = 'door';
          else if (route.name === 'Profile') iconName = 'account-outline';

          return <AnimatedIcon name={iconName} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateRoom" component={CreateRoomScreen} />
      <Tab.Screen name="JoinRoom" component={JoinRoom} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconWrapper: {
    backgroundColor: '#FFE3A9',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -24,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});

export default MainTabs;
