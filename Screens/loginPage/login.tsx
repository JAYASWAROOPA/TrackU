import { Text, View,TextInput,TouchableOpacity, GestureResponderEvent  } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {styles} from './styles_login';

export default function Sign({ navigation }:any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = (_e?: GestureResponderEvent) => {
      if (!username.trim() || !password.trim()) {
        setError('⚠️ Please fill the details');
        return;
      }
  
      setError('');
      navigation.replace('MainTabs');
    };
  return (
 <LinearGradient
 colors={['#4c1d95','#ec4899']}
 style={styles.container}
 >
 <View >
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
             value={password}
             onChangeText={(text) => {
                setPassword(text);
                if (error) setError('');
              }}
        />
        {error ? (
              <Text style={{ color: 'yellow',top:250, textAlign: 'center', fontWeight: 'bold'}}>{error}</Text>
            ) : null}
    <TouchableOpacity style={styles.button} onPress={handleLogin} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
</View>
 </LinearGradient>
  );
}
