import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { EventCard } from '../../components/eventCard/EventCard';
import { AddIcon } from '../../assets/AddIcon';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
type NewEvent = {
  date: string;
  taskTime: string;
  title: string;
  description: string;
};

type EventItem = NewEvent & { bgColor: string };

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [newEvent, setNewEvent] = useState<NewEvent>({
    date: '',
    taskTime: '',
    title: '',
    description: '',
  });

  const colors: string[] = ['#f3fbe9', '#e9f1fb', '#fbe9f1', '#fff3e0', '#ede7f6'];

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setEvents(prev => [...prev, { ...newEvent, bgColor: randomColor }]);

    setNewEvent({ date: '', taskTime: '', title: '', description: '' });
    setModalVisible(false);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find events"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.additionalContainer}>
        <ScrollView style={styles.body}>
          <Text style={styles.subHeader}>All events</Text>

          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                timeRemaining={event.date}
                taskTime={event.taskTime}
                title={event.title}
                description={event.description}
                bgColor={event.bgColor}
              />
            ))
          ) : (
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#999' }}>No events found</Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
          <AddIcon />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add New Event</Text>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Pick Date"
                value={newEvent.date}
                editable={false}
              />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(e: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
                    setNewEvent(prev => ({ ...prev, date: formatted }));
                  }
                }}
              />
            )}

            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Pick Time"
                value={newEvent.taskTime}
                editable={false}
              />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                onChange={(e: DateTimePickerEvent, selectedTime?: Date) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    const formatted = selectedTime.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    setNewEvent(prev => ({ ...prev, taskTime: formatted }));
                  }
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={text => setNewEvent(prev => ({ ...prev, title: text }))}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={newEvent.description}
              onChangeText={text => setNewEvent(prev => ({ ...prev, description: text }))}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#400AD6' }]}
                onPress={handleAddEvent}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#999' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
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
  subHeader: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: '500',
    color: '#666667',
  },
  searchBar: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: { height: 110, backgroundColor: '#400AD6' },
  additionalContainer: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    top: -28,
    overflow: 'hidden',
  },
  add: {
    padding: 20,
    width: 50,
    height: 50,
    backgroundColor: '#fefefeff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    right: 25,
    bottom: 50,
    elevation: 5,
    position: 'absolute',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#400AD6',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
});

export default HomePage;
