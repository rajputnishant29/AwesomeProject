import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getMyProfile, logoutUser} from '../api/api';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getMyProfile();
        setUser(userData);
      } catch (err) {
        console.log('Profile Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace('Login');
  };

  const menuItems = [
    {
      title: 'About Us',
      icon: <Icon name="info" size={22} color="#0f172a" />,
      onPress: () => navigation.navigate('AboutUs'),
    },
    {
      title: 'Privacy Policy',
      icon: <MaterialIcon name="privacy-tip" size={22} color="#0f172a" />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: 'Feedback',
      icon: <Icon name="help-circle" size={22} color="#0f172a" />,
      onPress: () => navigation.navigate('Feedback'),
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>👤 My Profile</Text>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Joined On</Text>
          <Text style={styles.value}>
            {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Unable to load profile.</Text>
      )}

      <View style={styles.menu}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={item.onPress}>
            <View style={styles.iconWrapper}>{item.icon}</View>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <AntDesign name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

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
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -24,
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFE3A9',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  label: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '600',
  },
  errorText: {
    textAlign: 'center',
    color: '#ef4444',
  },
  menu: {
    backgroundColor: '#FFE3A9',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#0B1D51',
    borderBottomWidth: 1,
  },
  iconWrapper: {
    width: 30,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#0B1D51',
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
