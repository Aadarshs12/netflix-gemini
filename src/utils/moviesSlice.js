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
    credits: {},
    reviews: {},
    reviewsLoading: {}, 
    reviewsError: {}, 
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
    setReviewsLoading: (state, action) => {
      const { movieId, loading } = action.payload;
      if (!state.reviewsLoading) {
        state.reviewsLoading = {};
      }
      state.reviewsLoading[movieId] = loading;
    },
    addReviews: (state, action) => {
      const { movieId, reviews } = action.payload;
      if (!state.reviews) {
        state.reviews = {};
      }
      if (!state.reviewsLoading) {
        state.reviewsLoading = {};
      }
      state.reviews[movieId] = reviews || [];
      state.reviewsLoading[movieId] = false;
      if (state.reviewsError?.[movieId]) {
        delete state.reviewsError[movieId];
      }
    },
    setReviewsError: (state, action) => {
      const { movieId, error } = action.payload;
      if (!state.reviewsError) {
        state.reviewsError = {};
      }
      state.reviewsError[movieId] = error;
      state.reviewsLoading[movieId] = false;
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
  setReviewsLoading,
  addReviews,
  setReviewsError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
export const moviesReducer = moviesSlice.reducer;