import { IMG_CDN_URL, IMG_CDN_URL2 } from "../utils/constant";
import { useSelector } from "react-redux";
import { FaPlay, FaHeart } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import dayjs from "dayjs";
import { IoIosCloseCircle } from "react-icons/io";
import useMovieTrailer from "../hooks/useMovieTrailor";

const MoviesCard = ({ movie }) => {
  console.log(movie);

  const genreList = useSelector((store) => store.genre?.genreList);
  const trailorVideo = useSelector((store) => store.movies?.trailorVideo);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPlay, setIsOpenPlay] = useState(false);
  useMovieTrailer(movie?.id);
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
        src={
          movie?.poster_path
            ? IMG_CDN_URL + movie.poster_path
            : "/path/to/fallback-image.jpg"
        }
        alt={movie?.title || "Movie"}
      />
      <div className="hoverOnMovieCard p-3 flex flex-col gap-1">
        <div className="flex flex-col gap-3 items-end">
          <button onClick={() => setIsOpenPlay(true)}>
            <FaPlay />
          </button>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpenPlay(false)}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
              <DialogPanel className="relative w-full h-full bg-black">
                <button
                  onClick={() => isOpenPlay(false)}
                  className="absolute  text-5xl top-6 right-4 bg-[#302e2e9d] rounded-full text-[#fff] hover:text-[#d9232e] focus:outline-none"
                  aria-label="Close"
                >
                  <IoIosCloseCircle />
                </button>

                <div className="w-full h-full">
                  <iframe
                    className="w-full aspect-video"
                    src={`https://www.youtube.com/embed/${trailorVideo?.key}?&playlist=${trailorVideo?.key}&controls=1`}
                    title="youtube-video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
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

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-[1000]"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-[#000000fa] shadow-lg rounded-lg p-4">
            <DialogTitle className="text-lg mb-2 flex justify-between items-center font-bold text-white">
              <span>Movie Details</span>
              <button
                className="text-xl text-[#fff] hover:text-[#d9232e]"
                onClick={() => setIsOpen(false)}
              >
                <IoIosCloseCircle />
              </button>
            </DialogTitle>
            <div className="text-sm flex flex-col gap-3 text-[#fff]">
              <div>
                <img
                  className="w-full rounded-md object-cover"
                  src={
                    movie?.backdrop_path
                      ? IMG_CDN_URL2 + movie.backdrop_path
                      : "/path/to/fallback-image.jpg"
                  }
                  alt={movie?.original_title || "Movie"}
                />
              </div>
              <span>
                🎥 <strong>Movie:</strong>{" "}
                {movie?.original_title || "Not Available"}
              </span>
              <span className="line-clamp-5">
                ℹ️ <strong>Overview:</strong>{" "}
                {movie?.overview || "Not Available"}
              </span>
              <span>
                ⭐ <strong>Rating:</strong>{" "}
                {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
              </span>
              <span>
                🎬 <strong>Genre:</strong>{" "}
                {getGenres(movie?.genre_ids, genreList).join(", ") ||
                  "Not Available"}
              </span>
              <span>
                📅 <strong>Release:</strong>{" "}
                {movie?.release_date
                  ? dayjs(movie.release_date).format("MMMM D, YYYY")
                  : "Not Available"}
              </span>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MoviesCard;
