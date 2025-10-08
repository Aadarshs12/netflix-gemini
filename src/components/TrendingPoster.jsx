import React from "react";
import posterbackdrop from "../utils/notfoundposterbackdrop.WEBP";
import { IMG_CDN_URL } from "../utils/constant";

const TrendingPoster = ({ index, movie }) => {
  return (
    <div className="forMovieCard mx-10 relative overflow-visible">
      <img
        className="rounded-lg h-40 object-cover w-full"
        src={
          movie.poster_path
            ? IMG_CDN_URL + movie.poster_path
            : posterbackdrop
        }
        alt={movie.title || "Movie"}
      />
      <span className="forCounting font-bold" data-content={index}>
        {index}
      </span>
    </div>
  );
};

export default TrendingPoster;
