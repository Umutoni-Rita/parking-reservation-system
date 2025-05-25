import { useState, useEffect } from "react";
import { Alert, FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { getReservations, deleteReservation } from "../utils/api";

const ReservationListScreen = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDeleteReservation = async (reservationId, slotId) => {
    try {
      await deleteReservation(reservationId, slotId);
      Alert.alert("Success", "Reservation deleted successfully");
      fetchReservations();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const renderReservation = ({ item }) => (
    <View style={styles.reservationContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateReservation", { reservation: item })}
      >
        <Text style={styles.reservationTitle}>Reservation for Slot {item.slotId}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Start: {new Date(item.startTime).toLocaleString()}</Text>
        <Text>End: {new Date(item.endTime).toLocaleString()}</Text>
        <Text>Status: {item.status}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteReservation(item.id, item.slotId)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderReservation}
          keyExtractor={(item) => item.id.toString()}
          refreshing={false}
          onRefresh={fetchReservations}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  reservationContainer: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 },
  reservationTitle: { fontSize: 18, fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#ff4444', padding: 8, borderRadius: 5, marginTop: 10, alignSelf: 'flex-end' },
  deleteButtonText: { color: '#fff', fontWeight: 'bold' },
  createButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginBottom: 10 },
  createButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 10 },
});

export default ReservationListScreen;