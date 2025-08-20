import { IMG_CDN_URL, IMG_CDN_URL2 } from "../utils/constant";
import { useSelector } from "react-redux";
import { FaPlay, FaHeart } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import dayjs from "dayjs";

const MoviesCard = ({ movie }) => {
  const genreList = useSelector((store) => store.genre?.genreList);
  const [isOpen, setIsOpen] = useState(false);

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  return (
    <div className="forMovieCard relative overflow-visible">
      <img
        className="rounded-lg"
        src={movie?.poster_path ? IMG_CDN_URL + movie.poster_path : "/path/to/fallback-image.jpg"}
        alt={movie?.title || "Movie"}
      />
      <div className="hoverOnMovieCard p-3 flex flex-col gap-1">
        <div className="flex flex-col gap-3 items-end">
          <span>
            <FaPlay />
          </span>
          <button
            type="button"
            className="flex gap-1 items-center text-white rounded-lg bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <FaCircleInfo />
          </button>
          <span>
            <FaHeart />
          </span>
        </div>
        <h4 className="text-white m-0 text-lg font-bold line-clamp-2">
          {movie?.title || "Not Available"}
        </h4>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[1000]">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-[#000000fa] shadow-lg rounded-lg p-4">
            <DialogTitle className="text-lg font-bold text-white">Movie Details</DialogTitle>
            <div className="text-sm flex flex-col gap-3 text-[#fff]">
              <div>
                <img
                  className="w-full rounded-md object-cover"
                  src={movie?.backdrop_path ? IMG_CDN_URL2 + movie.backdrop_path : "/path/to/fallback-image.jpg"}
                  alt={movie?.original_title || "Movie"}
                />
              </div>
              <span>
                🎥 <strong>Movie:</strong> {movie?.original_title || "Not Available"}
              </span>
              <span>
                ⭐ <strong>Rating:</strong> {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
              </span>
              <span>
                🎬 <strong>Genre:</strong>{" "}
                {getGenres(movie?.genre_ids, genreList).join(", ") || "Not Available"}
              </span>
              <span>
                📅 <strong>Release:</strong>{" "}
                {movie?.release_date ? dayjs(movie.release_date).format("MMMM D, YYYY") : "Not Available"}
              </span>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MoviesCard;