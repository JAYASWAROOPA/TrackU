import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a0dd6',
    padding: 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    gap: 12,
    height: 81,
  },
   avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ec4899',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  name: {
    color: 'white',
    fontWeight:'600',
    fontSize: 25,
    flex: 1, // push children to the right
  },
});
