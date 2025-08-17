import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    genreList: null,
  },
  reducers: {
    addGenreList: (state, action) => {
      state.genreList = action.payload;
    },
  },
});

export const { addGenreList } = genreSlice.actions;

export const genreReducer = genreSlice.reducer;

export default genreSlice.reducer;
