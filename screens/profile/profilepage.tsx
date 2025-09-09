import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import profileStyles from "./profileStyles";


export default function Profilepage() {
  // Menu items
  const menuItems = [
    { id: "1", title: "Notification", icon: "bell-outline" },
    { id: "2", title: "Privacy", icon: "lock-outline" },
    { id: "3", title: "Change password", icon: "eye-off-outline" },
    { id: "4", title: "Theme and colour", icon: "palette" },
    { id: "5", title: "App language", icon: "translate" },
    { id: "6", title: "Help", icon: "help-circle-outline" },
    { id: "7", title: "Log out", icon: "logout" },
  ];

  return (
    <LinearGradient colors={["#4c1d95", "#ec4899"]} style={profileStyles.container}>
      
      {/* Header */}
      <View style={profileStyles.header}>
        
      </View>

      {/* Profile section */}
      <View style={profileStyles.profileSection}>
        <Image 
          source={{ uri: "https://via.placeholder.com/100" }} 
          style={profileStyles.avatar} 
        />
        <Text style={profileStyles.username}>NAME</Text>
      </View>

      {/* Menu */}
      <View style={profileStyles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={profileStyles.menuItem} activeOpacity={0.6}>
              
              <Text style={profileStyles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}
