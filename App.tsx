// App.tsx
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Profilepage from "./screens/profile/profilepage";
import HelpScreen from "./screens/profile/HelpScreen";


import HomePage from './screens/home_page/Home';
import { HomeIcon } from './assets/HomeIcon';
import SetUp from './screens/setUpPage/SetUpPage';
import { Add } from './assets/AddCircle';
import ToDoList from './screens/todolist/ToDolist';
import { ToDo } from './assets/ToDo';
import { Calender } from './assets/Calender';
import CalendarPage from './screens/calendar/calendar_page';
import { Settings } from './assets/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 👇 Profile stack including HelpScreen
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profilepage" component={Profilepage} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon
                width={33}
                height={33}
                fill={focused ? 'white' : 'lightgray'}
              />
            ),
          }}
        />
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
        {/* 👇 Use the ProfileStack instead of Profilepage directly */}
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
    </NavigationContainer>
  );
}
