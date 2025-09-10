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
        <Text style={styles.backText}>⬅ Back</Text>
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
  backBtn: { marginBottom: 10 },
  backText: { color: "#4c1d95", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#111" },
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
