import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const TopAppBar = ({ username }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileCircle}>
        <Text style={styles.profileInitial}>J</Text>
      </View>
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a0dd6',
    padding: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a0dd6',
  },
  username: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TopAppBar;
