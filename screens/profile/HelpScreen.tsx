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
        <Text style={styles.arrow}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Help & Support – CampusTrack</Text>

      {/* Intro Card */}
      <View style={styles.card}>
        <Text style={styles.text}>
          Welcome to <Text style={styles.bold}>CampusTrack Help 🎓</Text>
        </Text>
        <Text style={styles.text}>
          We’re here to make your college life simpler by helping you stay on top
          of classes, deadlines, and tasks. If you ever face issues or have ideas,
          we’d love to hear from you!
        </Text>
      </View>

      {/* Need Help */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>🔧 Need Help?</Text>
        <Text style={styles.text}>
          • Report any issues so we can fix them quickly. {"\n"}
          • Check your internet connection and ensure you’re using the latest
          version of the app.
        </Text>
      </View>

      {/* Got Ideas */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>💡 Got Ideas?</Text>
        <Text style={styles.text}>
          • Have a feature in mind? {"\n"}• Want reminders, study tips, or
          integrations? {"\n"}Share your thoughts with us!
        </Text>
      </View>

      {/* Common Questions */}
      <View style={styles.card}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9fc" },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7350cc",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  arrow: { fontSize: 16, color: "#fff", marginRight: 6 },
  backText: { fontSize: 15, fontWeight: "600", color: "#fff" },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#222",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#4a3ba3",
  },
  text: { fontSize: 14, lineHeight: 20, color: "#444", marginBottom: 6 },
  bold: { fontWeight: "bold", color: "#222" },
});
