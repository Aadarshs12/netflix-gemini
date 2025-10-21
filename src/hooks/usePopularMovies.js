import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_Options } from "../utils/constant";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/.netlify/functions/tmdbProxy?path="
    : "https://api.themoviedb.org/3/";

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}movie/popular?page=1`,
        API_Options
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const json = await response.json();
      dispatch(addPopularMovies(json.results || [])); 
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
      dispatch(addPopularMovies([])); 
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, [dispatch]);
};

export default usePopularMovies;