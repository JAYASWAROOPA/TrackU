// import { Text, View,TextInput,TouchableOpacity,GestureResponderEvent,Platform, } from 'react-native'
// import React , { useState } from 'react'
// import LinearGradient from 'react-native-linear-gradient'
// import {styles} from './styles';

// export default function SignIn({ navigation }:any) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (_e?: GestureResponderEvent) => {
//       const BASE_URL =
//         Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
//     if (!username.trim() || !password.trim()) {
//       setError('⚠️ Please fill the details');
//       return;
//     }

//     setError('');
//     const enteredUsername = username;
//     const enteredPassword = password;

//     console.log('Username:', enteredUsername);
//     console.log('Password:', enteredPassword);
//     navigation.replace('MainTabs', { username: username });
//   };
//   return (
//  <LinearGradient
//  colors={['#4c1d95','#ec4899']}
//  style={styles.container}
//  >
//  <View>
//         <Text style={styles.text}>Username </Text>
//     <TextInput
//     style={styles.input}
//         placeholder="Enter username"
//         placeholderTextColor="#979393ff"
//         value={username}
//           onChangeText={(text) => {
//             setUsername(text);
//             if (error) setError('');
//           }}
//     />
//     <Text style={styles.pass}>Password</Text>
//      <TextInput
//     style={styles.password}
//         placeholder="password"
//          placeholderTextColor="#979393ff"
//          value={password}
//          onChangeText={(text) => {
//             setPassword(text);
//             if (error) setError('');
//           }}
//     />
//     {error ? (
//           <Text style={{ color: 'yellow', top:250,textAlign: 'center',  
//       fontWeight: 'bold' }}>{error}</Text>
//         ) : null}
//    <TouchableOpacity onPress={() => navigation.replace('Login')}>
//           <Text style={styles.linkText}>Already had account ?</Text>
//         </TouchableOpacity>
//     <TouchableOpacity style={styles.button}  onPress={handleLogin}>
//           <Text style={styles.buttonText}>Sign in</Text>
//         </TouchableOpacity>
// </View>
//  </LinearGradient>
//   );
// }
import { Text, View, TextInput, TouchableOpacity, GestureResponderEvent, Platform } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

export default function SignIn({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Base URL of backend (you already specified this)
  const BASE_URL =
    Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

  const handleLogin = async (_e?: GestureResponderEvent) => {
    if (!username.trim() || !password.trim()) {
      setError('⚠️ Please fill the details');
      return;
    }

    setError('');

    try {
      // POST request to your backend
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
        // Navigate to main page after successful signup
        navigation.replace('MainTabs', { username: username });
      } else {
        console.error('❌ already exist username', data);
        setError(`⚠️ ${data.error || 'Signup failed'}`);
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
          onChangeText={(text) => {
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
          onChangeText={(text) => {
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
            }}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.linkText}>Already had account ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
