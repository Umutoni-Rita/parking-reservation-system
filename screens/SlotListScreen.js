import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { getSlot, deleteSlot } from "../utils/api";

const SlotListScreen = ({ navigation }) => {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);

  const fetchSlots = async () => {
    try {
      const data = await getSlot();
      setSlots(data.filter(slot => slot.isAvailable));  // Display only available slots
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleDeleteSlot = async (slotId) => {
    try {
      await deleteSlot(slotId);
      Alert.alert("Success", "Slot deleted successfully");
      fetchSlots(); // Refresh the list
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const renderSlot = ({ item }) => (
    <View style={styles.slotContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateReservation", { slotId: item.id })}
        disabled={!item.isAvailable}
      >
        <Text style={styles.slotTitle}>{item.slotNumber}</Text>
        <Text>{item.location}</Text>
        <Text>{(item.isAvailable) ? "Slot available" : "Slot reserved"}</Text>
        <Text>Created on: {new Date(item.createdAt).toLocaleString()}</Text>
      </TouchableOpacity>
      <View style={styles.rowContainer}>
        <TouchableOpacity
        style={styles.updateButton}
        onPress={() => navigation.navigate("UpdateSlot", { slot: item })}
      >
        <Text style={styles.deleteButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteSlot(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
      
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateSlot")}
      >
        <Text style={styles.createButtonText}>Create New Slot</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={slots}
          renderItem={renderSlot}
          keyExtractor={(item) => item.id.toString()}
          refreshing={false}
          onRefresh={fetchSlots}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  slotContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  slotTitle: { fontSize: 18, fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  updateButton: {
    backgroundColor: "#4444ff",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  createButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  errorText: { color: "red", textAlign: "center", marginVertical: 10 },
  rowContainer: {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}
});

export default SlotListScreen;
