import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword({ username }: { username: string }) {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const API_BASE =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000'
      : 'http://localhost:5000';
  const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }
  if (newPassword !== confirmPassword) {
    Alert.alert('Error', 'New passwords do not match');
    return;
  }

  try {
    console.log("🔄 Sending request to:", `${API_BASE}/change_password`);
    console.log("Body:", { username, currentPassword, newPassword });

    const res = await fetch(`${API_BASE}/change_password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        currentPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to change password');
    }

    Alert.alert('Success', 'Password changed successfully 🎉');
    navigation.goBack();
  } catch (err) {
    console.error('❌ Error changing password:', err);
    Alert.alert('Error', err.message || 'Something went wrong');
  }
};

  console.log('Sending PUT request to:', `${API_BASE}/users/change-password`);
  console.log('Body:', { username, currentPassword, newPassword });

  return (
    <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Button at Top */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.arrow}>⬅</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        {/* Card Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Change Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Current Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#ddd"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.46)',
    borderRadius: 20,
    padding: 17,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#7350cc',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 0.5,
  },
});
