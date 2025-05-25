import axios from 'axios';

const BASE_URL = 'https://683317c1c3f2222a8cb4e5d7.mockapi.io/api';

export const createSlot = async(slotData) => {
    try {
        const response = await axios.post(`${BASE_URL}/parkingSlots`, slotData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create slot');
        
    }
};

export const getSlot = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/parkingSlots`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch parkingSlots'  );  
    }
}

export const getSlotById = async(slotId) => {
    try {
        const response = await axios.get(`${BASE_URL}/parkingSlots/${slotId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch slot'  );  
    }
}
export const updateSlot = async (slotId, slotData) => {
  try {
    const response = await axios.put(`${BASE_URL}/parkingSlots/${slotId}`, slotData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update slot');
  }
};

export const getSlotReservations = async(slotId) => {
    try {
        const response = await axios.get(`${BASE_URL}/parkingSlots/${slotId}/comments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch comments'  );  
    }
}

export const deleteSlot = async (slotId) => {
  try {
    await axios.delete(`${BASE_URL}/parkingSlots/${slotId}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message );
  }
};

export const createReservation = async (reservationData) => {
  try {
    // Create reservation
    const response = await axios.post(`${BASE_URL}/reservations`, reservationData);
    // Update slot's isAvailable to false
    await axios.put(`${BASE_URL}/parkingSlots/${reservationData.slotId}`, {
      isAvailable: false,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create reservation');
  }
};

export const getReservations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reservations');
  }
};

export const getReservationById = async (reservationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations/${reservationId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reservation');
  }
};

export const updateReservation = async (reservationId, reservationData) => {
  try {
    const response = await axios.put(`${BASE_URL}/reservations/${reservationId}`, reservationData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update reservation');
  }
};

export const deleteReservation = async (reservationId, slotId) => {
  try {
    await axios.delete(`${BASE_URL}/reservations/${reservationId}`);
    // Update slot's isAvailable to true
    await axios.put(`${BASE_URL}/parkingSlots/${slotId}`, {
      isAvailable: true,
    });
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete reservation');
  }
};