import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import MyRooms from '../components/MyRooms';
import {getMyProfile} from '../api/api';

export default function HomeScreen({navigation}) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      setShouldRefresh(prev => !prev);
    }, []),
  );

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await getMyProfile();
        if (userData?.name) {
          setUserName(userData.name);
        }
      } catch (error) {
        console.log('Failed to load user name:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  const filterOptions = ['all', 'created', 'joined'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.top}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.helloText}>Hello, {userName} 👋</Text>
            <Text style={styles.syncText}>Keep track of your Expenses</Text>
            <Text style={styles.syncText}>while in the Groups</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={{fontSize: 28}}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* 🔍 Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by room name or code..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* <View style={styles.divider} /> */}

      {/* Filter Buttons */}
      <View style={styles.filtersContainer}>
        {filterOptions.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setSelectedFilter(option)}
            style={[
              styles.filterButton,
              selectedFilter === option && styles.activeFilter,
            ]}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === option && styles.activeFilterText,
              ]}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.roomsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2c3e50" />
        ) : (
          <MyRooms
            refreshKey={shouldRefresh}
            filter={selectedFilter}
            searchQuery={searchQuery}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  top: {
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -24,
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    marginBottom: 16,
  },
  helloText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 6,
  },
  syncText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    marginTop: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFE3A9',
  },
  filterText: {
    fontSize: 14,
    color: '#334155',
  },
  activeFilter: {
    backgroundColor: '#0B1D51',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  roomsContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 24,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: '#1e293b',
    marginVertical: 12,
  },
});
