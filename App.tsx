import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import HomePage from './screens/home_page/Home';
import Login from './screens/login_page/login';
import Sign from './screens/sign_page/sign';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <Login/> */}
      <Sign/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
