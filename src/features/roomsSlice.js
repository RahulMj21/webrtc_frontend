import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addARoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
  },
});

export const { setRooms, addARoom } = roomsSlice.actions;
export const selectRooms = (state) => state.rooms.rooms;

export default roomsSlice.reducer;
