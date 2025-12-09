import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  // Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TopAppBar } from '../../components/topAppBar/TopAppBar';
import { DayContainer } from '../../components/dayContainer/DayContainer';
import { EventCard } from '../../components/eventCard/EventCard';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import NotificationService from '../../NotificationService';
import { Picker } from '@react-native-picker/picker';
import { RefreshControl } from 'react-native';
import { useCallback } from 'react';
import { API_BASE } from '../../config';

interface EventItem {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  taskTime: string;
  bgColor?: string;
  timeRemaining?: string;
}

const HomePage = ({ username, userId: propUserId }: any) => {
  // Notifications.registerRemoteNotifications();
  // Notifications.events().registerNotificationReceivedForeground(
  //   (notification, completion) => {
  //     console.log('Notification received in foreground:', notification);
  //     completion({ alert: true, sound: true, badge: false });
  //   },
  // );

  // const API_BASE =
  //    Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
  const userId = propUserId ?? username ?? 'demo-user';

  const today = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderBefore, setReminderBefore] = useState('10'); // default 10 minutes
  const [editedEvent, setEditedEvent] = useState<Partial<EventItem>>({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    weekday: 'short',
  });

  const selectedFullDate = new Date(
    currentYear,
    currentMonth,
    selectedDay,
  ).toLocaleDateString('en-GB');

  const colors: string[] = [
    '#f3fbe9',
    '#e9f1fb',
    '#fbe9f1',
    '#fff3e0',
    '#ede7f6',
  ];

  const ddmmyyyyToISO = (ddmmyyyy: string) => {
    if (!ddmmyyyy) return new Date().toISOString();
    const [dd, mm, yyyy] = ddmmyyyy.split('/');
    return `${yyyy}-${mm}-${dd}`;
  };

  const isoToDDMMYYYY = (dateISO: string) => {
    const [year, month, day] = dateISO.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  };
  const computeTimeRemaining = (dateISO: string, timeStr: string) => {
    if (!dateISO || !timeStr) return '';
    const eventDate = new Date(dateISO);
    let [hh = '0', mm = '0'] = (timeStr || '').split(':');
    mm = mm.split(' ')[0];
    eventDate.setHours(Number(hh), Number(mm), 0, 0);
    const diff = eventDate.getTime() - new Date().getTime();
    if (diff <= 0) return 'Ended';
    const mins = Math.round(diff / 60000);
    if (mins < 60) return `${mins} mins to go ⏳`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hr${hrs > 1 ? 's' : ''} left ⏳`;
  };
  // DELETE EVENT
  const handleDeleteEvent = async (id?: string) => {
    if (!id) {
      Alert.alert('Error', 'No event ID found');
      return;
    }

    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${API_BASE}/events/${id}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            });
            console.log('Deleting event with id:', id, typeof id);

            const data = await response.text();
            console.log('Delete response:', data);

            if (!response.ok) {
              throw new Error(`Failed to delete event: ${response.status}`);
            }

            setEvents(prev => prev.filter(ev => ev._id !== id));
            Alert.alert('Success', 'Event deleted successfully');
          } catch (error) {
            console.error('Error deleting event:', error);
            Alert.alert('Error', String(error));
          }
        },
      },
    ]);
  };

  const serverToLocal = (ev: any): EventItem => ({
    _id: ev._id,
    userId: ev.userId,
    title: ev.eventName,
    description: ev.description,
    date: isoToDDMMYYYY(ev.date),
    taskTime: ev.time,
    bgColor: colors[Math.floor(Math.random() * colors.length)],
    timeRemaining: computeTimeRemaining(ev.date, ev.time),
  });
  // Auto-update remaining time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prevEvents =>
        prevEvents.map(ev => ({
          ...ev,
          timeRemaining: computeTimeRemaining(
            ddmmyyyyToISO(ev.date),
            ev.taskTime,
          ),
        })),
      );
    }, 60000); // every 1 minute

    return () => clearInterval(interval);
  }, []);

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/events/${userId}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      const mappedEvents = data.map(serverToLocal);
      setEvents(mappedEvents);

      // Schedule reminders for all upcoming events
      mappedEvents.forEach(event => {
        if (event.taskTime && event.date) {
          NotificationService.scheduleReminder(
            event.title,
            `Reminder: ${event.title} starts soon!`,
            ddmmyyyyToISO(event.date),
            event.taskTime,
            parseInt(reminderBefore, 10),
          );
        }
      });
    } catch (err) {
      console.error('fetchEvents error', err);
      Alert.alert('Error fetching events', err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 15 * 60 * 1000); // every 15 min
    return () => clearInterval(interval);
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Call your data fetch function here
    fetchEvents().finally(() => setRefreshing(false));
  }, []);

  // EDIT OR ADD EVENT
  const handleSaveEdit = async () => {
    if (!editedEvent.title?.trim()) return Alert.alert('Enter event title');

    const payload = {
      userId,
      eventName: editedEvent.title ?? '',
      description: editedEvent.description ?? '',
      date: ddmmyyyyToISO(editedEvent.date ?? selectedFullDate),
      time: editedEvent.taskTime ?? '',
      reminderBefore: parseInt(reminderBefore, 10),
    };

    try {
      let savedEvent;
      if (editedEvent._id) {
        // Update existing event
        const res = await fetch(`${API_BASE}/events/${editedEvent._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update event');
        savedEvent = await res.json();
      } else {
        // Create new event
        const res = await fetch(`${API_BASE}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to create event');
        savedEvent = await res.json();
      }

      const mapped = serverToLocal(savedEvent);
      NotificationService.scheduleReminder(
        mapped.title,
        `Reminder: ${mapped.title} starts soon!`,
        ddmmyyyyToISO(mapped.date),
        mapped.taskTime,
        parseInt(reminderBefore, 10), // use dropdown value
      );

      setEvents(prev => {
        if (editedEvent._id && editingIndex !== null) {
          return prev.map(ev => (ev._id === editedEvent._id ? mapped : ev));
        } else {
          return [...prev, mapped];
        }
      });

      setModalVisible(false);
      setEditingIndex(null);
      setEditedEvent({});
    } catch (err: any) {
      console.error('Save failed', err);
      Alert.alert('Save failed', err.message ?? String(err));
    }
  };

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i);
    return {
      day: weekDays[d.getDay()],
      date: d.getDate(),
      fullDate: d.toLocaleDateString('en-GB'),
    };
  });

  const filteredEvents = events.filter(
    event => event.date === selectedFullDate,
  );

  console.log('filteredevents', filteredEvents);

  return (
    <View style={styles.container}>
      <TopAppBar name={username} />
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        {loading ? (
          <ActivityIndicator />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard
              key={event._id}
              timeRemaining={event.timeRemaining ?? ''}
              taskTime={event.taskTime}
              title={event.title}
              description={event.description}
              bgColor={event.bgColor ?? '#eee'}
              onEdit={() => {
                setEditingIndex(index);
                setEditedEvent(event);
                setModalVisible(true);
              }}
            />
          ))
        ) : (
          <Text style={{ color: '#999', fontSize: 16 }}>No events found</Text>
        )}
      </ScrollView>

      {/* ADD NEW EVENT */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setEditingIndex(null);
          setEditedEvent({});
          setModalVisible(true);
        }}
      >
        <Text style={{ color: '#fff', fontSize: 24 }}>＋</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editedEvent._id ? 'Edit Event' : 'New Event'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={editedEvent.title}
              onChangeText={text =>
                setEditedEvent({ ...editedEvent, title: text })
              }
            />

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
                    setEditedEvent({
                      ...editedEvent,
                      taskTime: formattedTime,
                    });
                  }
                }}
              />
            )}

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={editedEvent.description}
              onChangeText={text =>
                setEditedEvent({ ...editedEvent, description: text })
              }
            />

            <View style={styles.picker}>
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
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>

              {editedEvent._id && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#ff4d4d' }]}
                  onPress={() => handleDeleteEvent(editedEvent._id)}
                >
                  <Text style={{ color: '#fff' }}>Delete</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#400AD6' }]}
                onPress={handleSaveEdit}
              >
                <Text style={{ color: '#fff' }}>
                  {editedEvent._id ? 'Update' : 'Save'}
                </Text>
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
  fab: {
    position: 'absolute',
    bottom: 75,
    right: 25,
    backgroundColor: '#400AD6',
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    elevation: 5,
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
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
});

export default HomePage;
