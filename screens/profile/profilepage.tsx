import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Icons
import { NotificationIcon } from "../../assets/NotificationIcon";
import { Privacy } from "../../assets/Privacy";
import { Password } from "../../assets/Password";
import { Theme } from "../../assets/Theme";
import { Applan } from "../../assets/Applan";
import { Help } from "../../assets/Help";
import { Logout } from "../../assets/Logout";

export default function Profilepage() {
  type ProfileStackParamList = {
    Profilepage: undefined;
    HelpScreen: undefined;
    ChangePassword: undefined;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previous) => !previous);

  type ProfileNavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    "Profilepage"
  >;

  const navigation = useNavigation<ProfileNavigationProp>();
  const [isThemeEnabled, setIsThemeEnabled] = useState(false);
  const menuItems = [
    { id: "1", title: "Notification", icon: <NotificationIcon />, type: "switch" },
    { id: "3", title: "Change password", icon: <Password />, type: "navigate-change" },
    { id: "4", title: "Theme and colour", icon: <Theme />,type:"switch-theme" },
    { id: "6", title: "Help", icon: <Help />, type: "navigate-help" },
    { id: "7", title: "Log out", icon: <Logout /> },
  ];

  return (
    <LinearGradient colors={["#4c1d95", "#ec4899"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.username}>NAME</Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.type === "switch") {
              return (
                <View style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#7350cc" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  />
                </View>
              );
            }
            if (item.type === "switch-theme") {
              return (
                <View style={styles.menuItem}>
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isThemeEnabled ? "#7350cc" : "#f4f3f4"}
                    onValueChange={() => setIsThemeEnabled(prev => !prev)}
                    value={isThemeEnabled}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  />
                </View>
              );
            }
            if (item.type === "navigate-help") {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("HelpScreen")}
                >
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            }

            if (item.type === "navigate-change") {
              return (
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("ChangePassword")}
                >
                  <View style={styles.menuLeft}>
                    {item.icon}
                    <Text style={styles.menuText}>{item.title}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 19,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  menuContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 15,
    marginTop:30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuText: {
    fontSize: 19,
    marginLeft: 12,
    color: "black",
    fontWeight: "500",
  },
});
