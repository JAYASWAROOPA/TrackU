// EventCard.js
import React from 'react';
import { View, Text } from 'react-native';
import {styles} from './Styles'
import { TEventCard } from './Types';
export const EventCard : React.FC<TEventCard>=({ timeRemaining, taskTime, title, description, bgColor }) => {
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


