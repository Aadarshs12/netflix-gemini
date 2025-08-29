import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: null,
  reducers: {
    addWatchList: (state, action) => {
      return action.payload;
    },
    removeWatchList: (state, action) => {
      return null;
    },
  },
});

export const { addWatchList, removeWatchList } = watchlistSlice.actions;

export default watchlistSlice.reducer;

export const watchlistReducer = watchlistSlice.reducer;
