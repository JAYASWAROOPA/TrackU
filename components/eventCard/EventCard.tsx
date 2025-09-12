import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { TEventCard } from './Types';
export const EventCard: React.FC<TEventCard> = ({
  timeRemaining,
  taskTime,
  title,
  description,
  bgColor,
  onEdit,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.row}>
        <Text style={styles.timeRemaining}>{timeRemaining}</Text>
        <Text style={styles.taskTime}>Task time : {taskTime}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      {/* Row for description + edit button */}
      <View style={styles.descriptionRow}>
        <Text style={styles.description}>{description}</Text>
        {onEdit && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
