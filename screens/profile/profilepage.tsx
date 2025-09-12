import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import profileStyles from "./profileStyles";

// Import your SVG icons
import { NotificationIcon } from "../../assets/NotificationIcon";
import { Privacy } from "../../assets/Privacy";
import { Password } from "../../assets/Password";
import { Theme } from "../../assets/Theme";
import { Applan } from "../../assets/Applan";
import { Help } from "../../assets/Help";
import { Logout } from "../../assets/Logout";

export default function Profilepage() {
  // Menu items with icons
  const menuItems = [
    { id: "1", title: "Notification", icon: <NotificationIcon /> },
    { id: "2", title: "Privacy", icon: <Privacy /> },
    { id: "3", title: "Change password", icon: <Password /> },
    { id: "4", title: "Theme and colour", icon: <Theme /> },
    { id: "5", title: "App language", icon: <Applan /> },
    { id: "6", title: "Help", icon: <Help /> },
    { id: "7", title: "Log out", icon: <Logout /> },
  ];

  return (
    <LinearGradient
      colors={["#4c1d95", "#ec4899"]}
      style={profileStyles.container}
    >
      <View style={profileStyles.header}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        
        </Text>
      </View>
      <View style={profileStyles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={profileStyles.avatar}
        />
        <Text style={profileStyles.username}>NAME</Text>
      </View>

      <View style={profileStyles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={profileStyles.menuItem}
              activeOpacity={0.6}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.icon}
                <Text style={[profileStyles.menuText, { marginLeft: 10 }]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
}
