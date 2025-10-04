import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 13,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRemaining: {
    fontSize: 16
    ,
    color: '#393939',
  },
  taskTime: {
    fontSize: 16,
    color: '#393939',
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    color: '#40031D',
    marginVertical: 4,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: '#666667',
    flex: 1, // so it takes remaining space
    marginRight: 10,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#400AD6',
  },
  editText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});
