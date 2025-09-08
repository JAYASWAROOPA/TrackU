import React from 'react';
import { View,Text } from 'react-native';
import {styles} from './Styles'
import {TTopBar} from './types';
export const TopAppBar: React.FC<TTopBar> = ({ children,name }) => {
  return (
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text>J</Text>
        </View>
      <Text style={styles.name}>{name}</Text>
      {children}
    </View>
    
  );
};

