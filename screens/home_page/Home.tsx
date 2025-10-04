import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TopAppBar } from '../../components/topAppBar/TopAppBar';
import { DayContainer } from '../../components/dayContainer/DayContainer';
import { EventCard } from '../../components/eventCard/EventCard';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
interface EventItem {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  date: string; // dd-mm-yyyy
  taskTime: string;
  bgColor?: string;
  timeRemaining?: string;
}

const HomePage = ({ username, userId: propUserId }: any) => {
  const API_BASE =
    Platform.OS === "android"
      ? "http://10.0.2.2:5000"
      : "http://localhost:5000";

  const userId = propUserId ?? username ?? "demo-user";

  const today = new Date();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Partial<EventItem>>({});
  const [loading, setLoading] = useState(false);

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    weekday: "short",
  });

  const selectedFullDate = new Date(
    currentYear,
    currentMonth,
    selectedDay
  ).toLocaleDateString("en-GB");

  // --- Helpers ----------------------------------------------------------------
  const ddmmyyyyToISO = (ddmmyyyy: string) => {
    if (!ddmmyyyy) return new Date().toISOString();
    const [dd, mm, yyyy] = ddmmyyyy.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };

  const isoToDDMMYYYY = (dateISO: string) => {
    const [year, month, day] = dateISO.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const computeTimeRemaining = (dateISO: string, timeStr: string) => {
    if (!dateISO || !timeStr) return "";
    const eventDate = new Date(dateISO);
    const [hh = "0", mm = "0"] = (timeStr || "").split(":");
    eventDate.setHours(Number(hh), Number(mm), 0, 0);
    const diff = eventDate.getTime() - new Date().getTime();
    if (diff <= 0) return "Ended";
    const mins = Math.round(diff / 60000);
    if (mins < 60) return `${mins} mins to go ⏳`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hr${hrs > 1 ? "s" : ""} left ⏳`;
  };

  const serverToLocal = (ev: any): EventItem => ({
    _id: ev._id,
    userId: ev.userId,
    title: ev.eventName,
    description: ev.description,
    date: isoToDDMMYYYY(ev.date),
    taskTime: ev.time,
    bgColor: "#fbe9f7",
    timeRemaining: computeTimeRemaining(ev.date, ev.time),
  });

  // --- Networking --------------------------------------------------------------
 const fetchEvents = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${API_BASE}/events/${userId}`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const data = await res.json();

    console.log("📌 Raw events JSON from server:", data); // ✅ log response

    setEvents(data.map(serverToLocal));
  } catch (err: any) {
    console.error("fetchEvents error", err);
    Alert.alert("Error fetching events", err.message ?? String(err));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  // --- Edit flow ---------------------------------------------------------------
  const handleEdit = (index?: number) => {
    if (index !== undefined) {
      setEditingIndex(index);
      setEditedEvent(events[index]);
    } else {
      setEditingIndex(null);
      setEditedEvent({});
    }
    setModalVisible(true);
  };
const handleSaveEdit = async () => {
  const payload = {
    userId,
    eventName: editedEvent.title ?? "",
    description: editedEvent.description ?? "",
    date: ddmmyyyyToISO(editedEvent.date ?? selectedFullDate),
    time: editedEvent.taskTime ?? "",
  };

  console.log("📌 Payload being sent:", payload); // ✅ log payload

  try {
    let savedEvent;
    if (editedEvent._id) {
      const res = await fetch(`${API_BASE}/events/${editedEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update event");
      savedEvent = await res.json();
      console.log("📌 Server response after update:", savedEvent); // ✅ log updated
    } else {
      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create event");
      savedEvent = await res.json();
      console.log("📌 Server response after create:", savedEvent); // ✅ log created
    }

    // ✅ Always normalize the server response to local format
    const mapped = serverToLocal(savedEvent);

    setEvents((prev) => {
      const updated = [...prev];
      if (editingIndex !== null) {
        updated[editingIndex] = mapped;
      } else {
        updated.push(mapped);
      }
      return updated;
    });

    console.log("✅ Event saved/edited locally:", mapped); // ✅ final local event

    setModalVisible(false);
    setEditingIndex(null);
  } catch (err: any) {
    console.error("Save failed", err);
    Alert.alert("Save failed", err.message ?? String(err));
  }
};
  // --- UI ---------------------------------------------------------------------
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - today.getDay() + i);
    return {
      day: weekDays[d.getDay()],
      date: d.getDate(),
      fullDate: d.toLocaleDateString("en-GB"),
    };
  });

  const filteredEvents = events.filter(
    (event) => event.date === selectedFullDate
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
          {selectedFullDate === today.toLocaleDateString("en-GB")
            ? "Today’s events"
            : `Events on ${selectedFullDate}`}
        </Text>

        {loading ? (
          <ActivityIndicator />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              timeRemaining={event.timeRemaining ?? ""}
              taskTime={event.taskTime}
              title={event.title}
              description={event.description}
              bgColor={event.bgColor ?? "#eee"}
              onEdit={() => handleEdit(index)}
            />
          ))
        ) : (
          <Text style={{ color: "#999", fontSize: 16 }}>No events found</Text>
        )}
      </ScrollView>

      {/* Add new event */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => handleEdit(undefined)}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>＋</Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editedEvent._id ? "Edit Event" : "New Event"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              value={editedEvent.title}
              onChangeText={(text) =>
                setEditedEvent({ ...editedEvent, title: text })
              }
            />

            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {editedEvent.date ? editedEvent.date : "Select Task Date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={editedEvent.date ? new Date(editedEvent.date) : new Date()}
                mode="date"
                display="default"
                onChange={(
                  event: DateTimePickerEvent,
                  selectedDate?: Date
                ) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString("en-GB");
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
                  : "Select Task Time"}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                onChange={(
                  event: DateTimePickerEvent,
                  selectedTime?: Date
                ) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    const hours = selectedTime.getHours();
                    const minutes = selectedTime.getMinutes();
                    const formattedTime = `${hours}:${minutes
                      .toString()
                      .padStart(2, "0")}`;
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
              onChangeText={(text) =>
                setEditedEvent({ ...editedEvent, description: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#400AD6" }]}
                onPress={handleSaveEdit}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... keep the same styles you provided
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
