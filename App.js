import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SlotListScreen from "./screens/SlotListScreen";
import CreateSlotScreen from "./screens/CreateSlotScreen";
import UpdateSlotScreen from "./screens/UpdateSlotScreen";
import CreateReservationScreen from "./screens/CreateReservationScreen";
import ReservationListScreen from "./screens/ReservationListScreen";
import UpdateReservationScreen from "./screens/UpdateReservationScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SlotList">
        <Stack.Screen
          name="SlotList"
          component={SlotListScreen}
          options={{ title: "Parking Slots" }}
        />
        <Stack.Screen
          name="CreateSlot"
          component={CreateSlotScreen}
          options={{ title: "Create New Slot" }}
        />
        <Stack.Screen
          name="UpdateSlot"
          component={UpdateSlotScreen}
          options={{ title: "Update Slot" }}
        />
        <Stack.Screen
          name="CreateReservation"
          component={CreateReservationScreen}
          options={{ title: "Create Reservation" }}
        />
        <Stack.Screen
          name="ReservationList"
          component={ReservationListScreen}
          options={{ title: "Reservations" }}
        />
        <Stack.Screen
          name="UpdateReservation"
          component={UpdateReservationScreen}
          options={{ title: "Update Reservation" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;