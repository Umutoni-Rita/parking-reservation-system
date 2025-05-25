import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native";
import { createReservation } from "../utils/api";

const CreateReservationScreen = ({ navigation, route }) => {
  const { slotId } = route.params || {}; // Get slotId from navigation (optional)
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedSlotId, setSelectedSlotId] = useState(slotId || "");

  const handleCreateReservation = async () => {
    if (!selectedSlotId.trim() || !name.trim() || !startTime.trim() || !endTime.trim() || !status.trim()) {
      Alert.alert("Error", "All fields should be filled in");
      return;
    }
    try {
      const reservationData = {
        slotId: selectedSlotId,
        name,
        startTime,
        endTime,
        status,
      };
      await createReservation(reservationData);
      Alert.alert("Success", "Reservation created successfully");
      navigation.navigate("ReservationList");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Slot ID</Text>
      <TextInput
        style={styles.input}
        value={selectedSlotId}
        onChangeText={setSelectedSlotId}
        placeholder="e.g. 2"
        editable={!slotId} // Disable if slotId passed via navigation
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. John Smith"
      />
      <Text style={styles.label}>Start Time (YYYY-MM-DDTHH:MM:SSZ)</Text>
      <TextInput
        style={styles.input}
        value={startTime}
        onChangeText={setStartTime}
        placeholder="e.g. 2025-05-25T09:00:00Z"
      />
      <Text style={styles.label}>End Time (YYYY-MM-DDTHH:MM:SSZ)</Text>
      <TextInput
        style={styles.input}
        value={endTime}
        onChangeText={setEndTime}
        placeholder="e.g. 2025-05-25T12:00:00Z"
      />
      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="e.g. Active"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleCreateReservation}>
        <Text style={styles.submitButtonText}>Create Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, fontSize: 16 },
  submitButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5 },
  submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default CreateReservationScreen;