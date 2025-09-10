import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HelpScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
  <View style={styles.backContent}>
    <Text style={styles.arrow}>⬅</Text>
    <Text style={styles.backText}>Back</Text>
  </View>
</TouchableOpacity>



      <Text style={styles.title}>Help & Support – CampusTrack</Text>

      <Text style={styles.text}>
        Welcome to <Text style={styles.bold}>CampusTrack Help 🎓</Text>
      </Text>
      <Text style={styles.text}>
        We’re here to make your college life simpler by helping you stay on top
        of classes, deadlines, and tasks. If you ever face issues or have ideas,
        we’d love to hear from you!
      </Text>

      <Text style={styles.subtitle}>🔧 Need Help?</Text>
      <Text style={styles.text}>
        • Report any issues so we can fix them quickly. {"\n"}
        • Check your internet connection and ensure you’re using the latest
        version of the app.
      </Text>

      <Text style={styles.subtitle}>💡 Got Ideas?</Text>
      <Text style={styles.text}>
        • Have a feature in mind? {"\n"}• Want reminders, study tips, or
        integrations? {"\n"}Share your thoughts with us!
      </Text>

      <Text style={styles.subtitle}>❓ Common Questions</Text>
      <Text style={styles.text}>
        • <Text style={styles.bold}>How do I add a new class or task?</Text>
        {"\n"}Tap the + button on your dashboard and fill in the details.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.bold}>How do reminders work?</Text>
        {"\n"}Set reminders for classes, assignments, or exams.
      </Text>
      <Text style={styles.text}>
        • <Text style={styles.bold}>Can I sync with my calendar?</Text>
        {"\n"}Yes, CampusTrack can sync with your device calendar.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
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


  title: { fontSize: 20, fontWeight: "bold", marginBottom: 14, color: "#111",marginTop:9 },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
    color: "#333",
  },
  text: { fontSize: 14, lineHeight: 20, marginBottom: 10, color: "#444" },
  bold: { fontWeight: "bold" },
});
