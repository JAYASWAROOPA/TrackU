import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import type { ToDoBoxProps } from './types';

export default function ToDoBox({ text, done, onToggle, onEdit }: ToDoBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity onPress={onToggle}>
          <View style={[styles.checkbox, done ? styles.done : styles.pending]}>
            {done && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit}>
          <Text style={{ fontSize: 17 }}>✏️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
