import React from 'react';
import {Text, TouchableOpacity } from 'react-native';
import {styles} from './Styles';
import { TDayContainer } from './types';
export const DayContainer:React.FC<TDayContainer> = ({ dayName, date, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.day, isSelected && styles.selectedText]}>{dayName}</Text>
      <Text style={[styles.date, isSelected && styles.selectedText]}>{date}</Text>
    </TouchableOpacity>
  );
};

