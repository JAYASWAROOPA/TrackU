import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
export default function ChangePassword() {
    const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }
    Alert.alert("Success", "Password changed successfully 🎉");
    // 🔥 Later, connect with your backend here
  };

  return ( 
    <LinearGradient colors={["#4c1d95", "#ec4899"]} style={styles.container}>
        <View style={styles.new}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <View style={styles.backContent}>
            <Text style={styles.arrow}>⬅</Text>
            <Text style={styles.backText}>Back</Text>
          </View>
        </TouchableOpacity>
              </View>
      <View style={styles.card}>
        <Text style={styles.title}>Change Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  new:{top:-140},
  backBtn: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  backgroundColor: "#7350cc",
  borderRadius: 8,
  alignSelf: "flex-start",
  margin: 10,
},
backContent: {
  flexDirection: "row",
  alignItems: "center",  // 🔹 ensures arrow and text are vertically aligned
},
arrow: {
  fontSize: 16,
  color: "#fff",
  marginRight: 2, 
  textAlign:"center",
  top:-2
   // space between arrow and text
},
backText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#fff",
},
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "white",
  },
  button: {
    backgroundColor: "#7350cc",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
