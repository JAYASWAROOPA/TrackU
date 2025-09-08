import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomePage from './screens/home_page/Home';
import ToDolist from './screens/todolist/ToDolist';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ToDolist/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});                                                                                                                                                                           

export default App;
