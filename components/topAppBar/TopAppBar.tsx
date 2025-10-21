import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './Styles';
import { TTopBar } from './types';

export const TopAppBar: React.FC<TTopBar> = ({ children, name }) => {
  // Capitalize all letters and get the first letter
  const username = name ? name.toUpperCase() : '';
  const firstLetter = username ? username[0] : '';

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>

      {/* Username */}
      <Text style={styles.name}>{username}</Text>

      {/* Right side children */}
      <View style={styles.rightChildren}>{children}</View>
    </View>
  );
};
