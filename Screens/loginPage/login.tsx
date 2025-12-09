import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles_login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../../config';
export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const BASE_URL =API_BASE
    //  Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

  const handleLogin = async (_e?: GestureResponderEvent) => {
    if (!username.trim() || !password.trim()) {
      setError('⚠️ Please fill the details');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Login successful:', data);

        // Save login info
        await AsyncStorage.setItem('user', username);

        navigation.replace('MainTabs', { username: username });
      } else {
        console.error('❌ Login failed:', data);
        setError(`⚠️ ${data.error || 'Login failed'}`);
      }
    } catch (err) {
      console.error('❌ Network Error:', err);
      setError('⚠️ Unable to connect to the server');
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        navigation.replace('MainTabs', { username: storedUser });
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
      <View>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#979393ff"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (error) setError('');
          }}
        />

        <Text style={styles.pass}>Password</Text>
        <TextInput
          style={styles.password}
          placeholder="password"
          placeholderTextColor="#979393ff"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (error) setError('');
          }}
        />

        {error ? (
          <Text
            style={{
              color: 'white',
              top: 250,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {error}
          </Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
