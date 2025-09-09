import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TopAppBar } from '../../components/topAppBar/TopAppBar';
import { DayContainer } from '../../components/dayContainer/DayContainer';
import { EventCard } from '../../components/eventCard/EventCard';

const HomePage = () => {
  const today = new Date()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = today.getDate();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    weekday: 'short',
  });

  const [selectedDay, setSelectedDay] = useState(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i); 
    return {
      day: weekDays[d.getDay()],
      date: d.getDate(),
    };
  });

  const events = [
    {
      timeRemaining: '25 mins to go ⏳',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      timeRemaining: '1 hr left ⏳',
      taskTime: '10:30',
      title: 'Team Meeting',
      description: 'Sync with team about project tasks.',
      bgColor: '#e9f7fb',
    },
  ];

  return (
    <View style={styles.container}>
      <TopAppBar name="Jayaswaroopa" />
      <ScrollView style={styles.body}>
        <Text style={styles.header}>{formattedDate}</Text>
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

        <Text style={styles.subHeader}>Today’s events</Text>
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
