import { createSlice } from "@reduxjs/toolkit";

const tmdbSearchSlice = createSlice({
    name : "tmdbSearch",
    initialState : {
        tmdbSearchData: null,
    },
    reducers : {
        addtmdbSearchData : (state, action) => {
            state.tmdbSearchData = action.payload;
        }
    }
})

export const {addtmdbSearchData} = tmdbSearchSlice.actions;

export default tmdbSearchSlice.reducer;

export const tmdbSearchSliceReducer = tmdbSearchSlice.reducer;