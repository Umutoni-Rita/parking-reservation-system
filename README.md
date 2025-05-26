# Parking Slot Manager

A React Native mobile app for managing parking slots and reservations, featuring a clean tab-based interface to view available slots, create reservations, and handle updates/deletions. Built with `@react-navigation` for navigation and MockAPI for backend CRUD operations.

## Features
- **Tab Navigation**: Separate tabs for available parking slots and reservations.
- **Slot Management**: Create, update, and delete parking slots (`slotNumber`, `isAvailable`, `location`, `createdAt`).
- **Reservation Management**: Book, view, update, and cancel reservations (`slotId`, `name`, `startTime`, `endTime`, `status`).
- **Availability Check**: Prevents double-booking by validating slot availability.
- **MockAPI Integration**: Uses MockAPI.io for data storage and retrieval.

## Tech Stack
- **React Native**: Frontend framework for cross-platform mobile apps.
- **@react-navigation**: Bottom tabs and stack navigation for seamless UX.
- **Axios**: HTTP requests to MockAPI.
- **MockAPI.io**: Backend API for slots and reservations.
- **Expo Vector Icons**: Ionicons for tab bar icons.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Umutoni-Rita/parking-reservation-system.git
   cd parking-reservation-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MockAPI:
   - Create a MockAPI project at [MockAPI.io](https://mockapi.io).
   - Add resources: `/parkingSlots` with schema `{ slotNumber: string, isAvailable: boolean, location: string, createdAt: string, id: string }` and `/reservations` with schema `{ slotId: string, name: string, startTime: string, endTime: string, status: string, id: string }`.
   - Update `BASE_URL` in `src/utils/api.js` with your MockAPI endpoint (e.g., `https://your-mockapi-id.mockapi.io/api`).
4. Run the app:
   ```bash
   npm start
   ```
   Use Expo Go or an emulator to view the app.

## Project Structure
- `src/screens/`: React Native screens (`SlotListScreen`, `CreateReservationScreen`, etc.).
- `src/utils/api.js`: Axios functions for MockAPI CRUD operations.
- `App.js`: Navigation setup with bottom tabs and stack navigators.

## Usage
- **Slots Tab**: View available slots, create new slots, update existing ones, or reserve a slot.
- **Reservations Tab**: View all reservations, create new ones, or update/delete existing ones.
- **Validation**: Ensures slots are available before booking and updates slot availability automatically.

## Screenshots
![image](https://github.com/user-attachments/assets/6a0604ab-6468-4f01-a8c7-8e28f760db14)


## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Acknowledgments
- Thanks to MockAPI.io for free API hosting.
