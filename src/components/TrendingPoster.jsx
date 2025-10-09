import React from "react";
import poster from "../utils/notfoundposter.WEBP";
import { IMG_CDN_URL } from "../utils/constant";
import { toast } from "react-toastify";

const TrendingPoster = ({ index, movie }) => {

  const hanleLoginToast = () => {
    toast.warning("Please Login First...", { position: "bottom-right" });
  }

  return (
    <div onClick={hanleLoginToast} className="forMovieCard relative overflow-visible">
      <img
        className="rounded-lg  cursor-pointer md:h-60 h-52 2xl:h-72 object-cover w-full"
        src={
          movie.poster_path
            ? IMG_CDN_URL + movie.poster_path
            : poster
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
