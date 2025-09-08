import { Text, View,TextInput,TouchableOpacity  } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {styles} from './styles_sign';

export default function Sign() {
  return (
 <LinearGradient
 colors={['#4c1d95','#ec4899']}
 style={styles.container}
 >
 <View>
        <Text style={styles.text}>Username </Text>
    <TextInput
    style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#979393ff"
    />
    <Text style={styles.pass}>Password</Text>
     <TextInput
    style={styles.password}
        placeholder="password"
         placeholderTextColor="#979393ff"
    />
   <TouchableOpacity onPress={() =>{}}>
          <Text style={styles.linkText}>Already had account ?</Text>
        </TouchableOpacity>
    <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
=</View>
     
=
 </LinearGradient>
  );
}
