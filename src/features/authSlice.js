import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  otp: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setOtp } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsUser = (state) => state.auth.user.id;
export const selectUserAvatar = (state) => state.auth.user.userAvatar;
export const selectUserIsActivate = (state) => state.auth.user.activated;
export const selectOtp = (state) => state.auth.otp;

export default authSlice.reducer;
