import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Icons
import { NotificationIcon } from '../../assets/NotificationIcon';
import { Password } from '../../assets/Password';
import { Theme } from '../../assets/Theme';
import { Help } from '../../assets/Help';
import { Logout } from '../../assets/Logout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profilepage = ({ username }: { username: string }) => {
  type ProfileStackParamList = {
    Profilepage: undefined;
    HelpScreen: undefined;
    ChangePassword: undefined;
    Login: undefined;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previous => !previous);

  type ProfileNavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    'Profilepage'
  >;

  const navigation = useNavigation<ProfileNavigationProp>();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };
  const [isThemeEnabled, setIsThemeEnabled] = useState(false);
  const menuItems = [
    {
      id: '1',
      title: 'Notification',
      icon: <NotificationIcon />,
      type: 'switch',
    },
    {
      id: '3',
      title: 'Change password',
      icon: <Password />,
      type: 'navigate-change',
    },
    {
      id: '4',
      title: 'Theme and colour',
      icon: <Theme />,
      type: 'switch-theme',
    },
    { id: '6', title: 'Help', icon: <Help />, type: 'navigate-help' },
    { id: '7', title: 'Log out', icon: <Logout /> },
  ];
  const name = username ? username.toUpperCase() : '';
  const firstLetter = username ? username[0].toUpperCase() : '';
  return (
    <LinearGradient colors={['#4c1d95', '#ec4899']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
        </View>
        <Text style={styles.username}>{name.toUpperCase()}</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            if (item.type === 'switch') {
              return (
                <View style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#7350cc' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  />
                </View>
              );
            }

            if (item.type === 'switch-theme') {
              return (
                <View style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isThemeEnabled ? '#7350cc' : '#f4f3f4'}
                    onValueChange={() => setIsThemeEnabled(prev => !prev)}
                    value={isThemeEnabled}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  />
                </View>
              );
            }

            if (item.type === 'navigate-help') {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('HelpScreen')}
                >
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }

            if (item.type === 'navigate-change') {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate('ChangePassword')}
                >
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }

            // ✅ Log out button route to Login
            if (item.title === 'Log out') {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={handleLogout}
                >
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={[styles.menuText, { color: 'red' }]}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }

            return (
              <View style={styles.menuItem}>
                <View style={styles.menuLeft}>
                  {item.icon}
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 19,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 19,
    marginLeft: 12,
    color: 'black',
    fontWeight: '500',
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // Android shadow
    borderRadius: 60,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ec4899', // fallback if gradient not applied
  },

  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },

  username: {
    color: '#2c2c2c',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    marginTop: 10,
  },

  subText: {
    color: '#666',
    fontSize: 16,
    marginTop: 4,
  },
});
export default Profilepage;
