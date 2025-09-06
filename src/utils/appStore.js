import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { moviesReducer } from "./moviesSlice";
import { geminiReducer } from "./geminiSlice";
import { languageReducer } from "./languageSlice";
import { genreReducer } from "./genreSlice";
import { watchlistReducer } from "./watchlistSlice";
import { tmdbSearchSliceReducer } from "./tmdbSearchSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gemini: geminiReducer,
    lang: languageReducer,
    genre: genreReducer,
    watchlist: watchlistReducer,
    tmdbSearch: tmdbSearchSliceReducer,
  },
});

export default appStore;