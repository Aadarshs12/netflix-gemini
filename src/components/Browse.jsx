import React from 'react';
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GeminiSearch from "./GeminiSearch";
import useGenresName from "../hooks/useGenresName";
import { useSelector } from "react-redux";

const Browse = () => {
  useGenresName();
  useNowPlayingMovies();
  useTrendingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();
  const showGeminiSearch = useSelector((state) => state.gemini.showGeminiSearch);
  return (
    <div>
      <Header />
      {showGeminiSearch ? (
        <GeminiSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;