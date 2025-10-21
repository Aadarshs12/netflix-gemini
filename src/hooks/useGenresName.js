import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";
import { addGenreList } from "../utils/genreSlice";

const useGenresName = () => {
  const dispatch = useDispatch();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "/.netlify/functions/tmdbProxy?path="
      : "https://api.themoviedb.org/3/";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreResult = await fetch(
          `${BASE_URL}genre/movie/list?language=en-US`,
          API_Options
        );
        const genreData = await genreResult.json();
        dispatch(addGenreList(genreData.genres));
      } catch (error) {
        console.error("Error loading genres: ", error);
      }
    };

    fetchGenres();
  }, [dispatch]);
};

export default useGenresName;
