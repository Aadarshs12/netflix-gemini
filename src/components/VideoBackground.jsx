"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import useMovieTrailor from "../hooks/useMovieTrailor";
import { clearTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ id }) => {
  const dispatch = useDispatch();
  const trailorVideo = useSelector((store) => store.movies?.trailers[id]);

  useMovieTrailor(id);

  useEffect(() => {
    return () => {
      dispatch(clearTrailerVideo(id));
    };
  }, [id, dispatch]);


  return (
    <div className="w-full aspect-video overflow-hidden forBackgroundGradient">
      {trailorVideo?.key ? (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailorVideo?.key}?mute=1&autoplay=1&loop=1&playlist=${trailorVideo?.key}&controls=0&modestbranding=1`}
          title={`Trailer for Movie ID ${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
          <p>No trailer available</p>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;