import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutUs = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Us</Text>

      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/OweZone_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <Text style={styles.sectionText}>
          OweZone is built to simplify how you track, split, and settle shared expenses with friends, roommates, and groups. Our focus is on transparency, trust, and seamless money management.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          To remove the awkwardness of "who owes what" by offering a clear, elegant solution for shared financial responsibilities.
        </Text>
      </View>

      <View style={[styles.card, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitle}>What Makes Us Different</Text>
        <Text style={styles.sectionText}>
          ✅ Intuitive Interface{'\n'}
          ✅ Real-Time Expense Tracking{'\n'}
          ✅ Easy Settlements and Smart Splits{'\n'}
          ✅ Notifications & Transparency
        </Text>
      </View>

      {/* <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          📧 support@owezone.app{'\n'}
          💬 We're always open to feedback and improvements!
        </Text>
      </View> */}
    </ScrollView>
  );
};

export default AboutUs;

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
    textAlign: 'center',
    backgroundColor: '#8CCDEB',
    marginHorizontal: -24,
    marginTop: -60,
    paddingTop: 50,
    paddingBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
  },
  card: {
    backgroundColor: '#FFE3A9',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
    
  },
});
