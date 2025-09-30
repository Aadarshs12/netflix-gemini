import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCredits } from "../utils/moviesSlice";
import { API_Options } from "../utils/constant";

const useCreditsData = (movieId) => {
  const dispatch = useDispatch();

  const getCreditsData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        API_Options
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const json = await response.json();
      dispatch(addCredits({ movieId, credits: { cast: json.cast || [], crew: json.crew || [] } }));
    } catch (error) {
      console.error("Error fetching credits for movie", movieId, ":", error);
      dispatch(addCredits({ movieId, credits: { cast: [], crew: [] } }));
    }
  };

  useEffect(() => {
    if (movieId) {
      getCreditsData();
    }
  }, [movieId]);
};

export default useCreditsData;