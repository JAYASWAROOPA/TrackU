import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import { EventCard } from '../../components/eventCard/EventCard';
import { AddIcon } from '../../assets/AddIcon';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

type NewEvent = {
  date: string;
  taskTime: string;
  title: string;
  description: string;
};

type EventItem = NewEvent & { bgColor: string; _id: string };

const SetUPpage = ({ username, userId: propUserId }: any) => {
  const BASE_URL =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000'
      : 'http://localhost:5000';
  const USER_ID = propUserId ?? username ?? 'demo-user';

  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderBefore, setReminderBefore] = useState('10');
  const [newEvent, setNewEvent] = useState<NewEvent>({
    date: '',
    taskTime: '',
    title: '',
    description: '',
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const colors: string[] = [
    '#f3fbe9',
    '#e9f1fb',
    '#fbe9f1',
    '#fff3e0',
    '#ede7f6',
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const handleDeleteEvent = async (id: string) => {
    if (!id) return;
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await axios.delete(`${BASE_URL}/events/${id}`);
            setEvents(prev => prev.filter(ev => ev._id !== id));
            Alert.alert('Success', 'Event deleted successfully');
          } catch (err) {
            console.log('Delete error:', err);
            Alert.alert('Error deleting event');
          }
        },
      },
    ]);
  };
  // FETCH EVENTS FROM BACKEND
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/events/${USER_ID}`);
      const eventsWithColor: EventItem[] = res.data.map((event: any) => ({
        _id: event._id,
        title: event.eventName,
        description: event.description,
        date: new Date(event.date).toLocaleDateString('en-GB'),
        taskTime: event.time,
        bgColor: colors[Math.floor(Math.random() * colors.length)],
      }));
      setEvents(eventsWithColor);
    } catch (err) {
      console.log('Fetch events error:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // SAVE / ADD EVENT
  const handleSaveEvent = async () => {
    if (!newEvent.title.trim()) return;

    const payload = {
      userId: USER_ID,
      eventName: newEvent.title,
      description: newEvent.description,
      date: new Date(newEvent.date.split('/').reverse().join('-')), // convert DD/MM/YYYY → YYYY-MM-DD
      time: newEvent.taskTime,
    };

    try {
      if (editingIndex !== null) {
        const eventToEdit = events[editingIndex];
        const res = await axios.put(
          `${BASE_URL}/events/${eventToEdit._id}`,
          payload,
        );
        const updated = [...events];
        updated[editingIndex] = {
          ...updated[editingIndex],
          title: res.data.eventName,
          description: res.data.description,
          date: new Date(res.data.date).toLocaleDateString('en-GB'),
          taskTime: res.data.time,
        };
        setEvents(updated);
      } else {
        const res = await axios.post(`${BASE_URL}/events`, payload);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setEvents(prev => [
          ...prev,
          {
            _id: res.data._id,
            title: res.data.eventName,
            description: res.data.description,
            date: new Date(res.data.date).toLocaleDateString('en-GB'),
            taskTime: res.data.time,
            bgColor: randomColor,
          },
        ]);
      }

      setNewEvent({ date: '', taskTime: '', title: '', description: '' });
      setEditingIndex(null);
      setModalVisible(false);
    } catch (err: any) {
      console.log('Save event error:', err.response?.data || err.message);
    }
  };

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
            events
              .filter(event =>
                event.title.toLowerCase().includes(searchText.toLowerCase()),
              )
              .map((event, index) => (
                <EventCard
                  key={event._id}
                  timeRemaining={event.date}
                  taskTime={event.taskTime}
                  title={event.title}
                  description={event.description}
                  bgColor={event.bgColor}
                  onEdit={() => {
                    setNewEvent({
                      date: event.date,
                      taskTime: event.taskTime,
                      title: event.title,
                      description: event.description,
                    });
                    setEditingIndex(index);
                    setModalVisible(true);
                  }}
                />
              ))
          ) : (
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#999' }}>
                No events found
              </Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.add}
          onPress={() => setModalVisible(true)}
        >
          <AddIcon />
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>
              {editingIndex !== null ? 'Edit Event' : 'Add New Event'}
            </Text>

            {/* Date Picker */}
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
                value={
                  newEvent.date
                    ? new Date(newEvent.date.split('/').reverse().join('-'))
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(e: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewEvent(prev => ({
                      ...prev,
                      date: selectedDate.toLocaleDateString('en-GB'),
                    }));
                  }
                }}
              />
            )}

            {/* Time Picker */}
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
                value={
                  newEvent.taskTime
                    ? new Date(`1970-01-01T${newEvent.taskTime}:00`)
                    : new Date()
                }
                mode="time"
                display="default"
                onChange={(e: DateTimePickerEvent, selectedTime?: Date) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setNewEvent(prev => ({
                      ...prev,
                      taskTime: selectedTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                    }));
                  }
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={text =>
                setNewEvent(prev => ({ ...prev, title: text }))
              }
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={newEvent.description}
              onChangeText={text =>
                setNewEvent(prev => ({ ...prev, description: text }))
              }
            />

            {/* Reminder Picker */}
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 6,
                marginBottom: 10,
              }}
            >
              <Picker
                selectedValue={reminderBefore}
                onValueChange={value => setReminderBefore(value)}
              >
                <Picker.Item label="10 minutes" value="10" />
                <Picker.Item label="30 minutes" value="30" />
                <Picker.Item label="1 hour" value="60" />
                <Picker.Item label="3 hours" value="180" />
                <Picker.Item label="1 day" value="1440" />
              </Picker>
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#999' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#400AD6' }]}
                onPress={handleSaveEvent}
              >
                <Text style={styles.buttonText}>
                  {editingIndex !== null ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>

              {editingIndex !== null && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#ff4d4d' }]}
                  onPress={() => handleDeleteEvent(events[editingIndex]._id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              )}
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

export default SetUPpage;
