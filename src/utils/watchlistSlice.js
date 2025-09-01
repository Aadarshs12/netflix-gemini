import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchListItems: [], 
  },
  reducers: {
    addWatchList: (state, action) => {
      const exists = state.watchListItems.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.watchListItems.push(action.payload); 
      }
    },
    removeWatchList: (state, action) => {
      state.watchListItems = state.watchListItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addWatchList, removeWatchList } = watchlistSlice.actions;
export default watchlistSlice.reducer;
export const watchlistReducer = watchlistSlice.reducer;