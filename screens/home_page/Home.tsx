import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { TopAppBar } from '../../components/topAppBar/TopAppBar';
import { DayContainer } from '../../components/dayContainer/DayContainer';
import { EventCard } from '../../components/eventCard/EventCard';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
const HomePage = ({ username }: any) => {
  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    weekday: 'short',
  });

  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [events, setEvents] = useState([
    {
      date: '09/09/2025',
      timeRemaining: '25 mins to go ⏳',
      taskTime: '8:25',
      title: 'PS - C Programming',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
    {
      date: '12/09/2025',
      timeRemaining: '1 hr left ⏳',
      taskTime: '10:30',
      title: 'Team Meeting',
      description: 'Sync with team about project tasks.',
      bgColor: '#e9f7fb',
    },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedEvent, setEditedEvent] = useState<any>({
    title: '',
    description: '',
    taskTime: '',
    taskDate: '',
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedEvent(events[index]);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;

    setEvents(prev => {
      const updated = [...prev];
      updated[editingIndex] = { ...updated[editingIndex], ...editedEvent };
      return updated;
    });

    setModalVisible(false);
    setEditingIndex(null);
  };

  // Generate week days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i);
    return {
      day: weekDays[d.getDay()],
      date: d.getDate(),
      fullDate: d.toLocaleDateString('en-GB'),
    };
  });

  const selectedFullDate = new Date(
    currentYear,
    currentMonth,
    selectedDay,
  ).toLocaleDateString('en-GB');

  const filteredEvents = events.filter(
    event => event.date === selectedFullDate,
  );

  return (
    <View style={styles.container}>
      <TopAppBar name={username} />
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

        <Text style={styles.subHeader}>
          {selectedFullDate === today.toLocaleDateString('en-GB')
            ? 'Today’s events'
            : `Events on ${selectedFullDate}`}
        </Text>

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              timeRemaining={event.timeRemaining}
              taskTime={event.taskTime}
              title={event.title}
              description={event.description}
              bgColor={event.bgColor}
              onEdit={() => handleEdit(index)}
            />
          ))
        ) : (
          <Text style={{ color: '#999', fontSize: 16 }}>No events found</Text>
        )}
      </ScrollView>

      {/* Edit Modal */}
      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Event</Text>

            {/* Title */}
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={editedEvent.title}
              onChangeText={text =>
                setEditedEvent({ ...editedEvent, title: text })
              }
            />

            {/* Date Picker Trigger */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {editedEvent.date ? editedEvent.date : 'Select Task Date'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={
                  editedEvent.date ? new Date(editedEvent.date) : new Date()
                }
                mode="date"
                display="default"
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString('en-GB');
                    setEditedEvent({ ...editedEvent, date: formatted });
                  }
                }}
              />
            )}

            {/* Time Picker Trigger */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>
                {editedEvent.taskTime
                  ? editedEvent.taskTime
                  : 'Select Task Time'}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                onChange={(event: DateTimePickerEvent, selectedTime?: Date) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    const hours = selectedTime.getHours();
                    const minutes = selectedTime.getMinutes();
                    const formattedTime = `${hours}:${minutes
                      .toString()
                      .padStart(2, '0')}`;
                    setEditedEvent({ ...editedEvent, taskTime: formattedTime });
                  }
                }}
              />
            )}

            {/* Description */}
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={editedEvent.description}
              onChangeText={text =>
                setEditedEvent({ ...editedEvent, description: text })
              }
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#400AD6' }]}
                onPress={handleSaveEdit}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 1, padding: 16 },
  header: { fontSize: 18, color: '#666667' },
  daysRow: { flexDirection: 'row', marginVertical: 10 },
  subHeader: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '500',
    color: '#666667',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#40031D',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
});

export default HomePage;
