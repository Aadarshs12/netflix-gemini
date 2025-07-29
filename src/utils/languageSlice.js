import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "lang",
  initialState: {
    currentLanguage: "en",
  },
  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

// Rename exported action to match the new reducer name
export const { setCurrentLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
export default languageSlice;
