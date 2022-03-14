import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import activateReducer from "../features/activateSlice";
import roomsReducer from "../features/roomsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    activate: activateReducer,
    rooms: roomsReducer,
  },
});
