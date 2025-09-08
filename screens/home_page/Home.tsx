import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TopAppBar } from '../../components/topAppBar/TopAppBar';
import { DayContainer } from '../../components/dayContainer/DayContainer';
import { EventCard } from '../../components/eventCard/EventCard';

const HomePage = () => {
  const [selectedDay, setSelectedDay] = useState(3);

  const days = [
    { day: 'Mon', date: 1 },
    { day: 'Tue', date: 2 },
    { day: 'Wed', date: 3 },
    { day: 'Thu', date: 4 },
    { day: 'Fri', date: 5 },
    { day: 'Sat', date: 6 },
    { day: 'Sun', date: 7 },
  ];

  const events = [
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#f3fbe9',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#f3fbe9',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      timeRemaining: '25 mins to go',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <TopAppBar name="Jayaswaroopa" />
      <ScrollView style={styles.body}>
        <Text style={styles.header}>July 03, Wed</Text>

        {/* Days Row */}
        <View style={styles.daysRow}>
          {days.map((d, index) => (
            <DayContainer
              key={index}
              dayName={d.day}
              date={d.date}
              isSelected={selectedDay === d.date}
              onPress={() => setSelectedDay(d.date)}
            />
          ))}
        </View>

        <Text style={styles.subHeader}>Today event</Text>

        {/* Events */}
        {events.map((event, index) => (
          <EventCard
            key={index}
            timeRemaining={event.timeRemaining}
            taskTime={event.taskTime}
            title={event.title}
            description={event.description}
            bgColor={event.bgColor}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 18,
    color: '#666667',
  },
  daysRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '500',
    color: '#666667',
  },
});

export default HomePage;
