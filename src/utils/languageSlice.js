import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

// Rename exported action to match the new reducer name
export const { changeLang } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
export default languageSlice;
