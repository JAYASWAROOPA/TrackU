
// // import React, { useState, useMemo, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   FlatList,
// //   Modal,
// //   TextInput,
// //   Alert,
// //   Platform,
// // } from 'react-native';
// // import { styles } from './Styles';
// // import LinearGradient from 'react-native-linear-gradient';
// // import { AddIcon } from '../../assets/AddIcon';

// // export default function CalendarPage() {
// //   const now = new Date();
// //   const [selectedDate, setSelectedDate] = useState(now);
// //   const [events, setEvents] = useState({});
// //   const [newEvent, setNewEvent] = useState('');
// //   const [modalVisible, setModalVisible] = useState(false);

// //   // Backend URL
// //   let BACKEND_URL = '';
// //   if (Platform.OS === 'android') BACKEND_URL = 'http://10.0.2.2:5000';
// //   else if (Platform.OS === 'ios') BACKEND_URL = 'http://localhost:5000';
// //   else BACKEND_URL = 'http://192.168.1.100:5000';

// //   const USER_ID = 'demo-user'.replace(/\s/g, '');

// //   const months = [
// //     'January', 'February', 'March', 'April', 'May', 'June',
// //     'July', 'August', 'September', 'October', 'November', 'December'
// //   ];

// //   // Fetch events
// //   const fetchEvents = async () => {
// //     try {
// //       const res = await fetch(`${BACKEND_URL}/events/${USER_ID}`);
// //       if (!res.ok) throw new Error(`Server returned ${res.status}`);

// //       const data = await res.json();
// //       if (!Array.isArray(data)) {
// //         console.error('Invalid response:', data);
// //         Alert.alert('Error', 'Unexpected server response format');
// //         return;
// //       }

// //       const eventsDict = {};

// //       data.forEach((ev) => {
// //         if (!ev || !ev.date || !ev.eventName) return;
// //         const key = new Date(ev.date).toISOString().split('T')[0];
// //         if (!eventsDict[key]) eventsDict[key] = [];
// //         eventsDict[key].push({
// //           _id: ev._id ?? Math.random().toString(),
// //           eventName: ev.eventName,
// //         });
// //       });

// //       setEvents(eventsDict);
// //     } catch (err) {
// //       console.error('Fetch events error:', err);
// //       Alert.alert('Error', err.message ?? 'Failed to load events');
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   // Generate calendar weeks
// //   const weeks = useMemo(() => {
// //     const year = selectedDate.getFullYear();
// //     const month = selectedDate.getMonth();
// //     const totalDays = new Date(year, month + 1, 0).getDate();
// //     const firstDow = new Date(year, month, 1).getDay();
// //     const grid = [];
// //     let day = 1;

// //     for (let r = 0; r < 6; r++) {
// //       const row = [];
// //       for (let c = 0; c < 7; c++) {
// //         row.push(r * 7 + c < firstDow || day > totalDays ? null : day++);
// //       }
// //       grid.push(row);
// //     }
// //     return grid;
// //   }, [selectedDate]);

// //   const today = new Date();

// //   // Add new event
// //   const handleAddEvent = async () => {
// //     if (!newEvent.trim()) return Alert.alert('Enter event name');

// //     const eventData = {
// //       userId: USER_ID,
// //       eventName: newEvent.trim(),
// //       date: selectedDate.toISOString(),
// //       time: '12:00',
// //     };

// //     try {
// //       const response = await fetch(`${BACKEND_URL}/events`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(eventData),
// //       });

// //       if (response.ok) {
// //         Alert.alert('Success', 'Event added successfully!');
// //         fetchEvents();
// //       } else {
// //         Alert.alert('Error', 'Failed to save event');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       Alert.alert('Error', 'Could not connect to server');
// //     }

// //     setNewEvent('');
// //     setModalVisible(false);
// //   };

// //   // Month navigation
// //   const goToPrevMonth = () => {
// //     const year = selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear();
// //     const month = selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() - 1;
// //     const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
// //     setSelectedDate(new Date(year, month, day));
// //   };

// //   const goToNextMonth = () => {
// //     const year = selectedDate.getMonth() === 11 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear();
// //     const month = selectedDate.getMonth() === 11 ? 0 : selectedDate.getMonth() + 1;
// //     const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
// //     setSelectedDate(new Date(year, month, day));
// //   };

// //   // Render events
// //   const renderEvents = () => {
// //     const key = selectedDate.toISOString().split('T')[0];
// //     const dayEvents = events[key] ?? [];

// //     if (dayEvents.length === 0) {
// //       return <Text style={styles.noEventsText}>No events were added.</Text>;
// //     }

// //     return (
// //       <FlatList
// //         data={dayEvents}
// //         keyExtractor={(item) => item._id}
// //         renderItem={({ item }) => (
// //           <View style={styles.eventItem}>
// //             <Text style={styles.eventText}>• {item.eventName}</Text>
// //           </View>
// //         )}
// //       />
// //     );
// //   };

// //   return (
// //     <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
// //       {/* Calendar Header */}
// //       <View style={styles.header}>
// //         <TouchableOpacity onPress={goToPrevMonth}>
// //           <Text style={styles.navButton}>{'<'}</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>
// //           {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
// //         </Text>
// //         <TouchableOpacity onPress={goToNextMonth}>
// //           <Text style={styles.navButton}>{'>'}</Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* Calendar Grid */}
// //       <View style={styles.calendar}>
// //         <View style={styles.weekHeaderRow}>
// //           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
// //             <View key={d} style={styles.dayCell}>
// //               <Text style={styles.weekDay}>{d}</Text>
// //             </View>
// //           ))}
// //         </View>

// //         {weeks.map((row, i) => (
// //           <View key={i} style={styles.weekRow}>
// //             {row.map((d, j) => {
// //               const year = selectedDate.getFullYear();
// //               const month = selectedDate.getMonth();
// //               const isToday = d === today.getDate() &&
// //                 month === today.getMonth() &&
// //                 year === today.getFullYear();
// //               const isSelected = d === selectedDate.getDate() &&
// //                 month === selectedDate.getMonth() &&
// //                 year === selectedDate.getFullYear();

// //               return (
// //                 <TouchableOpacity
// //                   key={j}
// //                   style={[
// //                     styles.dayCell,
// //                     isSelected && { backgroundColor: '#ec4899', borderRadius: 50 },
// //                     isToday && { borderWidth: 2, borderColor: '#fff', borderRadius: 50 },
// //                   ]}
// //                   disabled={!d}
// //                   onPress={() => d && setSelectedDate(new Date(year, month, d))}
// //                 >
// //                   <Text
// //                     style={[
// //                       styles.dayText,
// //                       isSelected && { color: '#000', fontWeight: 'bold' },
// //                       isToday && !isSelected && { color: '#fff', fontWeight: 'bold' },
// //                     ]}
// //                   >
// //                     {d ?? ''}
// //                   </Text>
// //                 </TouchableOpacity>
// //               );
// //             })}
// //           </View>
// //         ))}
// //       </View>

// //       {/* Events List */}
// //       <View style={styles.eventsContainer}>
// //         <Text style={styles.eventsTitle}>
// //           Events on {selectedDate.getDate()}-{selectedDate.getMonth() + 1}-{selectedDate.getFullYear()}
// //         </Text>
// //         {renderEvents()}
// //       </View>

// //       {/* Add Event Button */}
// //       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
// //         <AddIcon />
// //       </TouchableOpacity>

// //       {/* Add Event Modal */}
// //       <Modal
// //         animationType="slide"
// //         transparent
// //         visible={modalVisible}
// //         onRequestClose={() => setModalVisible(false)}
// //       >
// //         <View style={styles.modalContainer}>
// //           <View style={styles.modalContent}>
// //             <Text style={styles.modalTitle}>Add Event</Text>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Event name"
// //               value={newEvent}
// //               onChangeText={setNewEvent}
// //             />
// //             <TouchableOpacity style={styles.modalButton} onPress={handleAddEvent}>
// //               <Text style={styles.modalButtonText}>Add</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
// //               <Text style={styles.modalButtonText}>Cancel</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </Modal>
// //     </LinearGradient>
// //   );
// // }
// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   TextInput,
//   Alert,
//   Platform,
// } from 'react-native';
// import { styles } from './Styles';
// import LinearGradient from 'react-native-linear-gradient';
// import { AddIcon } from '../../assets/AddIcon';

// type EventType = {
//   _id: string;
//   eventName: string;
//   date?: string;
// };

// export default function CalendarPage() {
//   const now = new Date();
//   const [selectedDate, setSelectedDate] = useState<Date>(now);

//   const [events, setEvents] = useState<{ [key: string]: EventType[] }>({});
//   const [newEvent, setNewEvent] = useState<string>('');
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   // Backend URL
//   let BACKEND_URL = '';
//   if (Platform.OS === 'android') BACKEND_URL = 'http://10.0.2.2:5000';
//   else if (Platform.OS === 'ios') BACKEND_URL = 'http://localhost:5000';
//   else BACKEND_URL = 'http://192.168.1.100:5000'; // Replace with your PC's LAN IP

//   const USER_ID = 'demo-user'.replace(/\s/g, '');

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const fetchEvents = async () => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/events/${USER_ID}`);
//       if (!res.ok) throw new Error(`Server returned ${res.status}`);

//       const data = await res.json();

//       if (!Array.isArray(data)) {
//         console.error('Invalid response:', data);
//         Alert.alert('Error', 'Unexpected server response format');
//         return;
//       }

//       const eventsDict: Record<string, EventType[]> = {};

//       data.forEach((ev: any) => {
//         if (!ev || !ev.date || !ev.eventName) return;
//         const key = new Date(ev.date).toISOString().split('T')[0];
//         if (!eventsDict[key]) eventsDict[key] = [];
//         eventsDict[key].push({
//           _id: ev._id ?? Math.random().toString(),
//           eventName: ev.eventName,
//           date: ev.date,
//         });
//       });

//       setEvents(eventsDict);
//     } catch (err: any) {
//       console.error('Fetch events error:', err);
//       Alert.alert('Error', err.message ?? 'Failed to load events');
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const weeks = useMemo(() => {
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth();
//     const totalDays = new Date(year, month + 1, 0).getDate();
//     const firstDow = new Date(year, month, 1).getDay();
//     const grid: (number | null)[][] = [];
//     let day = 1;

//     for (let r = 0; r < 6; r++) {
//       const row: (number | null)[] = [];
//       for (let c = 0; c < 7; c++) {
//         row.push(r * 7 + c < firstDow || day > totalDays ? null : day++);
//       }
//       grid.push(row);
//     }
//     return grid;
//   }, [selectedDate]);

//   const today = new Date();

//   const handleAddEvent = async () => {
//     if (!newEvent.trim()) return Alert.alert('Enter event name');

//     const eventData = {
//       userId: USER_ID,
//       eventName: newEvent.trim(),
//       date: selectedDate.toISOString(),
//       time: '12:00',
//     };

//     try {
//       const response = await fetch(`${BACKEND_URL}/events`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(eventData),
//       });

//       if (response.ok) {
//         Alert.alert('Success', 'Event added successfully!');
//         fetchEvents();
//       } else {
//         Alert.alert('Error', 'Failed to save event');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Could not connect to server');
//     }

//     setNewEvent('');
//     setModalVisible(false);
//   };

//   const goToPrevMonth = () => {
//     const year = selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear();
//     const month = selectedDate.getMonth() === 0 ? 11 : selectedDate.getMonth() - 1;
//     const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
//     setSelectedDate(new Date(year, month, day));
//   };

//   const goToNextMonth = () => {
//     const year = selectedDate.getMonth() === 11 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear();
//     const month = selectedDate.getMonth() === 11 ? 0 : selectedDate.getMonth() + 1;
//     const day = Math.min(selectedDate.getDate(), new Date(year, month + 1, 0).getDate());
//     setSelectedDate(new Date(year, month, day));
//   };

//   const renderEvents = () => {
//     const key = selectedDate.toISOString().split('T')[0];
//     const dayEvents = events?.[key] ?? [];

//     if (dayEvents.length === 0) {
//       return <Text style={styles.noEventsText}>No events were added.</Text>;
//     }

//     return (
//       <FlatList
//         data={dayEvents}
//         keyExtractor={(item) => item._id}
//         renderItem={({ item }) => (
//           <View style={styles.eventItem}>
//             <Text style={styles.eventText}>• {item.eventName}</Text>
//           </View>
//         )}
//       />
//     );
//   };

//   return (
//     <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
//       {/* Calendar Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={goToPrevMonth}>
//           <Text style={styles.navButton}>{'<'}</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
//         </Text>
//         <TouchableOpacity onPress={goToNextMonth}>
//           <Text style={styles.navButton}>{'>'}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Calendar Grid */}
//       <View style={styles.calendar}>
//         <View style={styles.weekHeaderRow}>
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
//             <View key={d} style={styles.dayCell}>
//               <Text style={styles.weekDay}>{d}</Text>
//             </View>
//           ))}
//         </View>

//         {weeks.map((row, i) => (
//           <View key={i} style={styles.weekRow}>
//             {row.map((d, j) => {
//               const year = selectedDate.getFullYear();
//               const month = selectedDate.getMonth();
//               const isToday = d === today.getDate() &&
//                 month === today.getMonth() &&
//                 year === today.getFullYear();
//               const isSelected = d === selectedDate.getDate() &&
//                 month === selectedDate.getMonth() &&
//                 year === selectedDate.getFullYear();

//               return (
//                 <TouchableOpacity
//                   key={j}
//                   style={[
//                     styles.dayCell,
//                     isSelected && { backgroundColor: '#ec4899', borderRadius: 50 },
//                     isToday && { borderWidth: 2, borderColor: '#fff', borderRadius: 50 },
//                   ]}
//                   disabled={!d}
//                   onPress={() => d && setSelectedDate(new Date(year, month, d))}
//                 >
//                   <Text
//                     style={[
//                       styles.dayText,
//                       isSelected && { color: '#000', fontWeight: 'bold' },
//                       isToday && !isSelected && { color: '#fff', fontWeight: 'bold' },
//                     ]}
//                   >
//                     {d ?? ''}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         ))}
//       </View>

//       {/* Events List */}
//       <View style={styles.eventsContainer}>
//         <Text style={styles.eventsTitle}>
//           Events on {selectedDate.getDate()}-{selectedDate.getMonth() + 1}-{selectedDate.getFullYear()}
//         </Text>
//         {renderEvents()}
//       </View>

//       {/* Add Event Button */}
//       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
//         <AddIcon />
//       </TouchableOpacity>

//       {/* Add Event Modal */}
//       <Modal
//         animationType="slide"
//         transparent
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add Event</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Event name"
//               value={newEvent}
//               onChangeText={setNewEvent}
//             />
//             <TouchableOpacity style={styles.modalButton} onPress={handleAddEvent}>
//               <Text style={styles.modalButtonText}>Add</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.modalButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// }

import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Platform,
  Animated,
} from 'react-native';
import { styles } from './Styles';
import LinearGradient from 'react-native-linear-gradient';
import { AddIcon } from '../../assets/AddIcon';

type EventType = {
  _id: string;
  eventName: string;
  date?: string;
};

export default function CalendarPage() {
  const now = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(now);
  const [events, setEvents] = useState<{ [key: string]: EventType[] }>({});
  const [newEvent, setNewEvent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  let BACKEND_URL = '';
  if (Platform.OS === 'android') BACKEND_URL = 'http://10.0.2.2:5000';
  else if (Platform.OS === 'ios') BACKEND_URL = 'http://localhost:5000';
  else BACKEND_URL = 'http://192.168.1.100:5000';

  const USER_ID = 'demo-user'.replace(/\s/g, '');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/calendar/${USER_ID}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();

      const eventsDict: { [key: string]: EventType[] } = {};
      data.forEach((ev: any) => {
        if (!ev || !ev.date || !ev.eventName) return;
        const key = new Date(ev.date).toISOString().split('T')[0];
        if (!eventsDict[key]) eventsDict[key] = [];
        eventsDict[key].push({
          _id: ev._id ?? Math.random().toString(),
          eventName: ev.eventName,
          date: ev.date,
        });
      });
      setEvents(eventsDict);
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.message || 'Failed to load events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

  // Success banner animation
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => setSuccessMessage(''));
  };

  // Add new event
  const handleAddEvent = async () => {
    if (!newEvent.trim()) return Alert.alert('Enter event name');

    const eventData = {
      userId: USER_ID,
      eventName: newEvent.trim(),
      date: selectedDate.toISOString(),
      time: "12:00"
    };

    try {
      const response = await fetch(`${BACKEND_URL}/calendar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      const resData = await response.json();

      if (!response.ok) {
        return Alert.alert('Error', resData.error || 'Failed to save event');
      }

      showSuccess('🎉 Event added successfully!');
      setNewEvent('');
      setModalVisible(false);
      fetchEvents();
    } catch (error: any) {
      console.error('Add event error:', error);
      Alert.alert('Error', 'Could not connect to server');
    }
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
    const key = selectedDate.toISOString().split('T')[0];
    const dayEvents = events[key] ?? [];
    if (dayEvents.length === 0) return <Text style={styles.noEventsText}>No events were added.</Text>;

    return (
      <FlatList
        data={dayEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>• {item.eventName}</Text>
          </View>
        )}
      />
    );
  };

  return (
    <>
      {/* ✅ Success banner */}
      {successMessage ? (
        <Animated.View style={[styles.successBanner, { opacity: fadeAnim }]}>
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      ) : null}

      <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={goToPrevMonth}>
            <Text style={styles.navButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={goToNextMonth}>
            <Text style={styles.navButton}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          <View style={styles.weekHeaderRow}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <View key={d} style={styles.dayCell}>
                <Text style={styles.weekDay}>{d}</Text>
              </View>
            ))}
          </View>

          {weeks.map((row, i) => (
            <View key={i} style={styles.weekRow}>
              {row.map((d, j) => {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth();
                const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const isSelected = d === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();

                return (
                  <TouchableOpacity
                    key={j}
                    style={[
                      styles.dayCell,
                      isSelected && { backgroundColor: '#ec4899', borderRadius: 50 },
                      isToday && { borderWidth: 2, borderColor: '#fff', borderRadius: 50 },
                    ]}
                    disabled={!d}
                    onPress={() => d && setSelectedDate(new Date(year, month, d))}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && { color: '#000', fontWeight: 'bold' },
                        isToday && !isSelected && { color: '#fff', fontWeight: 'bold' },
                      ]}
                    >
                      {d ?? ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Events List */}
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>
            Events on {selectedDate.getDate()}-{selectedDate.getMonth() + 1}-{selectedDate.getFullYear()}
          </Text>
          {renderEvents()}
        </View>

        {/* Add Event Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <AddIcon />
        </TouchableOpacity>

        {/* Add Event Modal */}
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Event</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter event name"
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
    </>
  );
}
