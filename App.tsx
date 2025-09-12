// App.tsx
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChangePassword from './screens/profile/ChangePassword';
import Profilepage from './screens/profile/profilepage';
import HelpScreen from './screens/profile/HelpScreen';

import HomePage from './screens/home_page/Home';
import { HomeIcon } from './assets/HomeIcon';
import SetUp from './screens/setUpPage/SetUpPage';
import { Add } from './assets/AddCircle';
import ToDoList from './screens/todolist/ToDolist';
import { ToDo } from './assets/ToDo';
import { Calender } from './assets/Calender';
import CalendarPage from './screens/calendar/calendar_page';
import { Settings } from './assets/Settings';
import Sign from './screens/loginPage/login';
import Login from './screens/signUpPage/signin';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 👇 Profile stack including HelpScreen
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profilepage" component={Profilepage} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

// 👇 Bottom Tab Navigator
function BottomTabs({ route }: any) {
  const { username } = route.params || {}; // optional params

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#4a0dd6',
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          height: 55,
          paddingTop: 7,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={33}
              height={33}
              fill={focused ? 'white' : 'lightgray'}
            />
          ),
        }}
      >
        {() => <HomePage username={username} />}
      </Tab.Screen>

      <Tab.Screen
        name="SetUp"
        component={SetUp}
        options={{
          tabBarIcon: ({ focused }) => (
            <Add
              width={33}
              height={33}
              fill={focused ? 'white' : 'lightgray'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="TodoList"
        component={ToDoList}
        options={{
          tabBarIcon: ({ focused }) => (
            <ToDo
              width={33}
              height={33}
              fill={focused ? 'white' : 'lightgray'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Calender"
        component={CalendarPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Calender
              width={33}
              height={33}
              fill={focused ? 'white' : 'lightgray'}
            />
          ),
        }}
      />

      {/* 👇 Profile uses nested stack */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Settings
              width={33}
              height={33}
              fill={focused ? 'white' : 'lightgray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Sign" component={Login} />
        <Stack.Screen name="Login" component={Sign} />
        <Stack.Screen name="MainTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
