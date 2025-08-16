import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // use expo icons

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="home" size={26} color="red" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="calendar" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="checkbox" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="pencil" size={26} color="white" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4a0dd6',
    paddingVertical: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default BottomNavigation;
