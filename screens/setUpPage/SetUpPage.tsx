import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { EventCard } from '../../components/eventCard/EventCard';
import { AddIcon } from '../../assets/AddIcon';

const HomePage = () => {
  const [events, setEvents] = useState([
    {
      date: '08-09-2025',
      taskTime: '8:25',
      title: 'Washing hair',
      description: 'If description add here...',
      bgColor: '#fbe9f7',
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Inputs for new event
  const [newEvent, setNewEvent] = useState({
    date: '',
    taskTime: '',
    title: '',
    description: '',
  });

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return; // at least require a title
    setEvents([...events, { ...newEvent, bgColor: '#f3fbe9' }]);
    setNewEvent({ date: '', taskTime: '', title: '', description: '' }); // reset inputs
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find events"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Events */}
      <View style={styles.additionalContainer}>
        <ScrollView style={styles.body}>
          <Text style={styles.subHeader}>All events</Text>
          {events.map((event, index) => (
            <EventCard
              key={index}
              timeRemaining={event.date}
              taskTime={event.taskTime}
              title={event.title}
              description={event.description}
              bgColor={event.bgColor}
            />
          ))}
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity style={styles.add} onPress={() => setModalVisible(true)}>
          <AddIcon />
        </TouchableOpacity>
      </View>

      {/* Modal for Adding Event */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add New Event</Text>

            <TextInput
              style={styles.input}
              placeholder="Date (DD-MM-YYYY)"
              value={newEvent.date}
              onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={newEvent.taskTime}
              onChangeText={(text) => setNewEvent({ ...newEvent, taskTime: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              multiline
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#400AD6' }]} onPress={handleAddEvent}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={() => setModalVisible(false)}>
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
  subHeader: { fontSize: 22, marginBottom: 10, fontWeight: '500', color: '#666667' },
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
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
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
