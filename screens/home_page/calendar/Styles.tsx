import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    gap: 12,
    fontSize:200,
    color:'#fff',
    marginBottom: 34,
  },
  picker: {
    flex: 1,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },

  // Calendar card with fixed height
  calendar: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    height: 240,   
    justifyContent:'space-around' ,         // <- set the height you want (e.g., 240/300/340)
    overflow: 'hidden',
  },
navButton:{
  fontSize:24,
  color:'#fff',
},
headerTitle:{
  fontSize:22,
color:'#fff',
},
  // Header row: no flex so it doesn't consume vertical space
  weekHeaderRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  // Each of the 6 week rows shares the remaining height equally
  weekRow: {
    flexDirection: 'row',
    flex: 1,
  },

  // One cell per day (7 columns)
  dayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  weekDay: {
    fontWeight: '700',
    color: '#333',
    textAlign:'center',
  },
  dayText: {
    color: '#444',
  },
  eventsContainer: {
  flex: 1,
  padding: 16,
},
eventsTitle: {
  fontSize: 18,
  color: '#fff',
  marginBottom: 8,
  textAlign: 'center'
},
noEventsText: {
  fontSize: 16,
  color: '#fff',
  textAlign: 'center'
},
eventItem: {
  paddingVertical: 4
},
eventText: {
  fontSize: 16,
  color: '#fff'
},
addButton: {
  position: 'absolute',
  bottom: 30,
  right: 30,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center'
},
addButtonText: {
  fontSize: 32,
  color: '#ec4899',
  fontWeight: 'bold'
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)'
},
modalContent: {
  backgroundColor: '#fff',
  marginHorizontal: 30,
  borderRadius: 10,
  padding: 20
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10
},
input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 15
},
modalButton: {
  padding: 12,
  backgroundColor: '#ec4899',
  borderRadius: 8,
  marginBottom: 10,
  alignItems: 'center'
},
modalButtonText: {
  color: '#fff',
  fontWeight: 'bold'
}

});
