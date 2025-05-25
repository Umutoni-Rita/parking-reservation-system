import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, Text, TextInput, View, Switch } from "react-native";
import { updateSlot } from "../utils/api";

const UpdateSlotScreen = ({ navigation, route }) => {
  const { slot } = route.params; // Get slot data from navigation
  const [slotNumber, setSlotNumber] = useState(slot.slotNumber);
  const [location, setLocation] = useState(slot.location);
  const [isAvailable, setIsAvailable] = useState(slot.isAvailable);

  const handleUpdateSlot = async () => {
    if (!slotNumber.trim() || !location.trim()) {
      Alert.alert("Error", "All fields should be filled in");
      return;
    }
    try {
      const slotData = {
        slotNumber,
        isAvailable,
        location,
        createdAt: slot.createdAt, // Preserve original createdAt
      };
      await updateSlot(slot.id, slotData);
      Alert.alert("Success", "Slot updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error(error);
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
      <Text style={styles.label}>Availability</Text>
      <Switch
        value={isAvailable}
        onValueChange={setIsAvailable}
        style={styles.switch}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleUpdateSlot}>
        <Text style={styles.submitButtonText}>Update Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, fontSize: 16 },
  switch: { marginBottom: 15 },
  submitButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 5 },
  submitButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default UpdateSlotScreen;