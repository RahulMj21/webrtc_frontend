import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userAvatar:
    "data:image/png;base64,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",
  fileName: "monkey-avatar.png",
};

const activateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserAvatar: (state, action) => {
      state.userAvatar = action.payload;
    },
    setFileName: (state, action) => {
      state.fileName = action.payload;
    },
  },
});

export const { setUserName, setUserAvatar, setFileName } =
  activateSlice.actions;
export const selectActivateUser = (state) => state.activate;
export const selectUserAvatar = (state) => state.activate.userAvatar;
export const selectUserName = (state) => state.activate.userName;
export const selectFileName = (state) => state.activate.fileName;

export default activateSlice.reducer;
