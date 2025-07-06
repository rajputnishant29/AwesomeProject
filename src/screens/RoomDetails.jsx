import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Clipboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {deleteRoomById, getMyProfile} from '../api/api';
import BottomToast from '../components/BottomToast';

const RoomDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {room} = route.params;
  const [isAdmin, setIsAdmin] = useState(false);
  const [toast, setToast] = useState({visible: false, message: ''});

  const showToast = msg => {
    setToast({visible: true, message: msg});
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await getMyProfile();
        setIsAdmin(user._id === room.admin?._id);
      } catch (error) {
        console.log('Admin Check Error:', error);
      }
    };
    checkAdmin();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      'Delete Room',
      `Are you sure you want to delete "${room.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteRoomById(room._id);
              showToast('Room deleted successfully');
              setTimeout(() => navigation.goBack(), 1500);
            } catch (err) {
              console.log('Room Delete Error:', err);
              Alert.alert('Error', 'Failed to delete room.');
            }
          },
        },
      ],
    );
  };

  const handleCopyCode = () => {
    Clipboard.setString(room.roomCode);
    Alert.alert('Copied', 'Room code copied to clipboard');
  };

  const bgColor = room.themeColor || '#f9fafc';
  const isLightBackground = color => {
    const c = color.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 180;
  };
  const textColor = isLightBackground(bgColor) ? '#111' : '#fff';
  const cardBg = isLightBackground(bgColor) ? '#ffffffcc' : '#1e293bcc';

  return (
    <ScrollView style={[styles.container, {backgroundColor: '#fff'}]}>
      <Text style={[styles.title, {color: textColor}]}>{room.name}</Text>
      <View style={[styles.infoBox, {backgroundColor: bgColor}]}>
        <Text style={[styles.label, {color: textColor}]}>Room Code:</Text>
        <Text style={[styles.code, {color: textColor}]}>{room.roomCode}</Text>
        <TouchableOpacity onPress={handleCopyCode}>
          <Text style={[styles.copy, {color: textColor}]}>📋</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.infoBox, {backgroundColor: bgColor}]}>
        <Text style={[styles.label, {color: textColor}]}>Admin:</Text>
        <Text style={[styles.value, {color: textColor}]}>
          {room.admin?.name || 'Unknown'}
        </Text>
      </View>

      <View style={[styles.infoBox, {backgroundColor: bgColor}]}>
        <Text style={[styles.label, {color: textColor}]}>Members:</Text>
        <Text style={[styles.value, {color: textColor}]}>
          {room.members?.length}
        </Text>
      </View>

      <View style={[styles.infoBox, {backgroundColor: bgColor}]}>
        <Text style={[styles.label, {color: textColor}]}>Created On:</Text>
        <Text style={[styles.value, {color: textColor}]}>
          {new Date(room.createdAt || Date.now()).toLocaleDateString()}
        </Text>
      </View>

      <View style={[styles.membersCard, {backgroundColor: bgColor}]}>
        <Text style={styles.membersHeading}>RoomMates</Text>
        {room.members.length > 0 ? (
          room.members.map(member => (
            <View key={member._id} style={styles.memberRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {member.name?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
          ))
        ) : (
          <Text style={{color: '#475569', textAlign: 'center', marginTop: 10}}>
            No members found.
          </Text>
        )}
      </View>

      <View style={{marginBottom: 40}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFE3A9'}]}
          onPress={() => navigation.navigate('AddExpense', {room})}>
          <Text style={styles.buttonText}>➕ Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFE3A9'}]}
          onPress={() =>
            navigation.navigate('ViewExpense', {roomId: room._id})
          }>
          <Text style={styles.buttonText}>👀 View Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFE3A9'}]}
          onPress={() => navigation.navigate('Settlement', {roomId: room._id})}>
          <Text style={styles.buttonText}>💸 View Settlements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFE3A9'}]}
          onPress={() =>
            navigation.navigate('RoomChat', {
              roomId: room._id,
              roomName: room.name,
            })
          }>
          <Text style={styles.buttonText}>🗨️ Room Chat</Text>
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#FFE3A9'}]}
            onPress={handleDelete}>
            <Text style={styles.buttonText}>🗑️ Delete Room</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom Toast */}
      <BottomToast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({visible: false, message: ''})}
      />
    </ScrollView>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#8CCDEB',
    paddingHorizontal: 30,
    marginHorizontal: -24,
    marginTop: -40,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  value: {
    fontSize: 16,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copy: {
    fontSize: 18,
    marginLeft: 20,
  },
  membersCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  membersHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 20,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#0B1D51',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#0B1D51',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
});
