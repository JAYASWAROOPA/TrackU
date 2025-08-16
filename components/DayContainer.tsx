import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const DayContainer = ({ dayName, date, isSelected, onPress }) => {
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: 'green',
  },
  day: {
    color: 'red',
    fontWeight: 'bold',
  },
  date: {
    color: 'red',
  },
  selectedText: {
    color: 'white',
  },
});

export default DayContainer;
