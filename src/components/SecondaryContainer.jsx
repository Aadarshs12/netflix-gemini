import React from 'react';
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("movies?.trendingMovies", movies?.trendingMovies);
  
  return (
    <div>
      <MoviesList
        title="Now Playing"
        movies={movies?.nowPlayingMovies}
        property="lg:-mt-[300px] counting"
      />
      <MoviesList title="Trending" movies={movies?.trendingMovies} />
      <MoviesList title="Top Rated" movies={movies?.topRatedMovies} />
      <MoviesList title="Popular" movies={movies?.popularMovies} />
      <MoviesList title="Upcoming" movies={movies?.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
