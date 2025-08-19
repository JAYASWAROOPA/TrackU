import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {styles} from './Styles'

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        {/* <Ionicons name="home" size={26} color="red" /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* <Ionicons name="calendar" size={26} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* <Ionicons name="checkbox" size={26} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* <Ionicons name="pencil" size={26} color="white" /> */}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* <Ionicons name="settings" size={26} color="white" /> */}
      </TouchableOpacity>
    </View>
  );
};


export default BottomNavigation;
