import React from 'react';
import { View,Text } from 'react-native';
import {styles} from './Styles'
import {TTopBar} from './types';
export const TopAppBar: React.FC<TTopBar> = ({ children,name,roll }) => {
  return (
    <View>
      <Text>{name}</Text>
       <Text>{roll}</Text>
      <View style={styles.container}>
      {children}
      
    </View>
    </View>
    
  );
};

