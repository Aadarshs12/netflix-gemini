import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice"; 
import { API_Options } from "../utils/constant";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&with_original_language=hi&region=IN&page=1&sort_by=popularity.desc",
        API_Options
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const json = await response.json();
      dispatch(addTrendingMovies(json.results || [])); 
    } catch (error) {
      console.error("Error fetching Trending movies:", error);
      dispatch(addTrendingMovies([])); 
    }
  };

  useEffect(() => {
    getTrendingMovies();
  }, [dispatch]);
};

export default useTrendingMovies;