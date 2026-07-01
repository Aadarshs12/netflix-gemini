import React from 'react';
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const count = useSelector((store) => store.movies?.count);
  if (!movies) return;

  const mainMovie = movies[ count+1 || 0];

  if (!mainMovie) return null;

  const {
    id,
  } = mainMovie;

  console.log(mainMovie, "mainmovie");
  

  return (
    <div className='relative z-10'>
      <VideoTitle
        movie= {mainMovie}
      />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
