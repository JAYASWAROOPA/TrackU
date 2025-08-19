import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    card: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRemaining: {
    fontSize: 13,
    color: '#555',
  },
  taskTime: {
    fontSize: 13,
    color: '#555',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A1F2A',
    marginVertical: 4,
  },
  description: {
    fontSize: 13,
    color: '#777',
  },
})