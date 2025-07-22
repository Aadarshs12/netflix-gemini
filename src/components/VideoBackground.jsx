"use client";

import { useSelector } from "react-redux";
import useMovieTrailor from "../hooks/useMovieTrailor";

const VideoBackground = ({ id }) => {
  const trailorVideo = useSelector((store) => store.movies?.trailorVideo);
  useMovieTrailor(id);

  return (
    <div className="w-full h-screen overflow-hidden forBackgroundGradient">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailorVideo?.key}?mute=1&autoplay=1&loop=1&playlist=${trailorVideo?.key}`}
        title="youtube-video "
      ></iframe>
    </div>
  );
};

export default VideoBackground;
