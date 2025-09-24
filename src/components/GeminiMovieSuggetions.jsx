import React from 'react';
import { useSelector } from "react-redux";
import MoviesList from "../components/MoviesList";

const GeminiMovieSuggetions = () => {
  const tmdbSearchData = useSelector(
    (store) => store.tmdbSearch?.tmdbSearchData
  );
  console.log("search", tmdbSearchData);

  const allMovies = tmdbSearchData
    ? Array.from(
        new Map(
          tmdbSearchData
            .flat()
            .filter((movie) => movie !== null && movie !== undefined)
            .map((movie) => [movie.id, movie])
        ).values()
      )
    : [];

  console.log(
    "allMovies",
    allMovies.map((m) => m.id)
  );

  return (
    <>
      {tmdbSearchData !== null && allMovies.length > 0 && (
        <MoviesList
          title="Related Search"
          property="lg:-mt-[100px]"
          movies={allMovies.filter((item)=> item?.backdrop_path)}
        />
      )}
    </>
  );
};

export default GeminiMovieSuggetions;
