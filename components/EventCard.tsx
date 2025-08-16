// EventCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventCard = ({ timeRemaining, taskTime, title, description, bgColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.row}>
        <Text style={styles.timeRemaining}>{timeRemaining}</Text>
        <Text style={styles.taskTime}>Task time : {taskTime}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRemaining: {
    fontSize: 13,
    color: '#555',
  },
  taskTime: {
    fontSize: 13,
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A1F2A',
    marginVertical: 4,
  },
  description: {
    fontSize: 13,
    color: '#777',
  },
});

export default EventCard;
