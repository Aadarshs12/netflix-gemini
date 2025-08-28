import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    topRatedMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    trailers: {}, // Store trailers by movie ID
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailorVideo: (state, action) => {
      const { movieId, trailer } = action.payload;
      state.trailers[movieId] = trailer;
    },
    clearTrailerVideo: (state, action) => {
      const movieId = action.payload;
      delete state.trailers[movieId]; // Clear specific trailer
    },
  },
});

export const {
  addNowPlayingMovies,
  addTopRatedMovies,
  addPopularMovies,
  addUpcomingMovies,
  addTrailorVideo,
  clearTrailerVideo,
} = moviesSlice.actions;
export default moviesSlice.reducer;
export const moviesReducer = moviesSlice.reducer;