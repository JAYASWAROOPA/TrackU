import React from 'react';
import { View, Text , TouchableOpacity , FlatList, Modal, TextInput, Alert } from 'react-native';
import { styles } from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import { useState,useMemo } from 'react';
import { AddIcon } from '../../assets/AddIcon';
//  
export default function CalendarPage() {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState(now);
  const [events, setEvents] = useState<{ [key: string]: string[] }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState('');

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const weeks = useMemo(() => {
    
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDow = new Date(year, month, 1).getDay();
    const grid: (number | null)[][] = [];
    let day = 1;
    for (let r = 0; r < 6; r++) {
      const row: (number | null)[] = [];
      for (let c = 0; c < 7; c++) {
        row.push(r * 7 + c < firstDow || day > totalDays ? null : day++);
      }
      grid.push(row);
    }
    return grid;
  }, [selectedDate]);

  const today = new Date();

  const handleAddEvent = () => {
    if (!newEvent.trim()) return Alert.alert('Enter event name');
    const key = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    setEvents(prev => {
      const prevEvents = prev[key] || [];
      return { ...prev, [key]: [...prevEvents, newEvent.trim()] };
    });
    setNewEvent('');
    setModalVisible(false);
  };


  const goToPrevMonth = () => {
    const year = selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear();
    const month = selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() - 1;
    const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
    setSelectedDate(new Date(year, month, day));
  };

  const goToNextMonth = () => {
    const year = selectedDate.getMonth() === 11 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear();
    const month = selectedDate.getMonth() === 11 ? 0 : selectedDate.getMonth() + 1;
    const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
    setSelectedDate(new Date(year, month, day));
  };

  const renderEvents = () => {
    const key = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
    const dayEvents = events[key] || [];
    if (dayEvents.length === 0) return <Text style={styles.noEventsText}>No events were added.</Text>;
    return (
      <FlatList
        data={dayEvents}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>• {item}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <LinearGradient colors={["#4c1d95", "#ec4899"]} style={styles.container}>

     
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
          
        <Text style={styles.headerTitle}>
          {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendar}>
        <View style={styles.weekHeaderRow}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <View key={d} style={styles.dayCell}>
              <Text style={styles.weekDay}>{d}</Text>
            </View>
          ))}
        </View>

        {weeks.map((row, i) => (
          <View key={i} style={styles.weekRow}>
            {row.map((d, j) => {
              const isToday = d === today.getDate() &&
                              selectedDate.getMonth() === today.getMonth() &&
                              selectedDate.getFullYear() === today.getFullYear();

              const isSelected = d === selectedDate.getDate() &&
                                 selectedDate.getMonth() === selectedDate.getMonth() &&
                                 selectedDate.getFullYear() === selectedDate.getFullYear();

              return (
                <TouchableOpacity
                  key={j}
                  style={[
                    styles.dayCell,
                    isSelected && { backgroundColor: "#ec4899", borderRadius: 50 },
                    isToday && { borderWidth: 2, borderColor: "#fff", borderRadius: 50 }
                  ]}
                  disabled={!d}
                  onPress={() => d && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d))}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && { color: "#000", fontWeight: "bold" },
                      isToday && !isSelected && { color: "#fff", fontWeight: "bold" }
                    ]}
                  >
                    {d ?? ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

    
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsTitle}>
          Events on {selectedDate.getDate()}-{selectedDate.getMonth() + 1}-{selectedDate.getFullYear()}
        </Text>
        {renderEvents()}
      </View>


      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <AddIcon/>
      </TouchableOpacity>

      
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              style={styles.input}
              placeholder="Event name"
              value={newEvent}
              onChangeText={setNewEvent}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddEvent}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );

}
