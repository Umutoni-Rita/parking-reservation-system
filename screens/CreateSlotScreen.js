import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native";
import { createSlot } from "../utils/api";

const CreateSlotScreen = ({ navigation }) => {
  const [slotNumber, setSlotNumber] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateSlot = async () => {
    if (!slotNumber.trim() || !location.trim()) {
      Alert.alert("Error", "All fields should be filled in");
      return;
    }
    try {
      const slotData = {
        slotNumber,
        isAvailable: true,
        location,
        createdAt: new Date().toISOString(), // Match MockAPI's ISO string
      };
      await createSlot(slotData);
      Alert.alert("Success", "Slot created successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error); // Log for debugging
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Slot Number</Text>
      <TextInput
        style={styles.input}
        value={slotNumber}
        onChangeText={setSlotNumber}
        placeholder="e.g. A3, B4"
      />
      <Text style={styles.label}>Slot Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="e.g. Basement, Floor 1"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleCreateSlot}>
        <Text style={styles.submitButtonText}>Create Slot</Text>
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

export default CreateSlotScreen;