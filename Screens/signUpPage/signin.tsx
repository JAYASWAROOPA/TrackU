
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { API_BASE } from '../../config';

export default function SignIn({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Base URL of backend (you already specified this)
  const BASE_URL =API_BASE
    // Platform.OS === 'android'
    //   ? 'http://10.0.2.2:5000'
    //   : 'http://localhost:5000';

  const handleLogin = async (_e?: GestureResponderEvent) => {
    if (!username.trim() || !password.trim()) {
      setError('⚠️ Please fill the details');
      return;
    }

    setError('');

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          preferences: {
            notifications: true,
            theme: 'light',
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ User created successfully:', data);
        navigation.replace('MainTabs', { username: username });
      } else {
        console.error('❌ already exist username', data);
        setError("⚠️ Signup failed \n Already exist user name");
      }
    } catch (err) {
      console.error('❌ Network Error:', err);
      setError('⚠️ Unable to connect to the server');
    }
  };

  return (
    <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
      <View>
        <Text style={styles.text}>Username </Text>
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

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.linkText}>Already have an account ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
