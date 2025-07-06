import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.sectionText}>
          At OweZone, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your data when you use our app.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.sectionText}>
          - Name and email address during signup{'\n'}
          - Device information (for app improvement){'\n'}
          - Expense and room-related data you input
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.sectionText}>
          - To provide core features like expense splitting and tracking{'\n'}
          - To improve user experience and app performance{'\n'}
          - To communicate important updates or feedback responses
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.sectionText}>
          We do not share your personal data with third parties, except:
          {'\n'}- As required by law
          {'\n'}- With your explicit consent
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.sectionText}>
          We take appropriate measures to secure your information using encryption and access control.
        </Text>
      </View>

      <View style={[styles.card, { marginBottom: 60 }]}>
        <Text style={styles.sectionTitle}>6. Your Choices</Text>
        <Text style={styles.sectionText}>
          You can update or delete your data at any time from your profile settings or by contacting us.
        </Text>
      </View>

      {/* <View style={styles.card}>
        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.sectionText}>
          For questions or concerns about our Privacy Policy, contact us at:{'\n'}
          📧 support@owezone.app
        </Text>
      </View> */}
    </ScrollView>
  );
};

export default PrivacyPolicy;

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
    marginTop: -50,
    paddingTop: 50,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFE3A9',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    marginBottom: 20,
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
