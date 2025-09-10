import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    topRatedMovies: null,
    popularMovies: null,
    upcomingMovies: null,
    trailers: {},
    count: 0,
    credits: {}, // Changed from null to object
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
      delete state.trailers[movieId];
    },
    addCount: (state, action) => {
      state.count = action.payload;
    },
    addCredits: (state, action) => {
      const { movieId, credits } = action.payload;
      state.credits[movieId] = credits; 
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
  addCount,
  addCredits,
} = moviesSlice.actions;
export default moviesSlice.reducer;
export const moviesReducer = moviesSlice.reducer;