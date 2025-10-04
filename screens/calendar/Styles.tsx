import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  navButton: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },

  calendar: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    height: 280,
    justifyContent: 'space-around',
  },

  weekHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDay: {
    fontWeight: '700',
    color: '#555',
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    flex: 1,
  },
  dayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },

  eventsContainer: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  noEventsText: {
    fontSize: 15,
    color: '#eee',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  eventItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 4,
  },
  eventText: {
    fontSize: 15,
    color: '#fff',
  },

  addButton: {
  position: 'absolute',
  bottom: 80,
  right: 30,
  width: 60,
  height: 60,
  borderRadius: 12, 
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 4,
  backgroundColor:"#ffff"
},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButton: {
    padding: 14,
    backgroundColor: '#ec4899',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
