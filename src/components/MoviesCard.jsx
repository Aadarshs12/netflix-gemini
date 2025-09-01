import { IMG_CDN_URL, IMG_CDN_URL2 } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaHeart } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { IoIosCloseCircle } from "react-icons/io";
import useMovieTrailer from "../hooks/useMovieTrailor";
import { clearTrailerVideo } from "../utils/moviesSlice";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import { addWatchList, removeWatchList } from "../utils/watchlistSlice";

const MoviesCard = ({ movie }) => {
  const dispatch = useDispatch();
  const genreList = useSelector((store) => store.genre?.genreList);
  const trailorVideo = useSelector(
    (store) => store.movies?.trailers[movie?.id]
  );
  const watchList = useSelector((store) => store.watchlist?.watchListItems);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPlay, setIsOpenPlay] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const isInWatchList = watchList.some((item) => item.id === movie.id);

  useMovieTrailer(movie?.id);

  const handlePlayInsideInfo = () => {
    setIsOpen(false);
    setIsOpenPlay(true);
  };

  useEffect(() => {
    if (!isOpenPlay) {
      setIframeKey((prev) => prev + 1);
      dispatch(clearTrailerVideo(movie?.id));
    }
  }, [isOpenPlay, movie?.id, dispatch]);

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };

  const handleAddWatchList = () => {
    console.log("Adding movie to watchlist:", movie);
    dispatch(addWatchList(movie));
    toast.success("Added to Watch List!" , {
      position: 'bottom-right',
    });
  };

  const handleRemoveWatchList = () => {
    console.log("Removing movie with id:", movie.id);
    dispatch(removeWatchList(movie.id));
    toast.error("Removed from Watch List!", {
      position : 'bottom-right',
    });
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
        <div className="flex flex-col-reverse gap-3 items-start">
          <button
            className="bg-[#d9232e] text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
            onClick={() => setIsOpenPlay(true)}
            disabled={!trailorVideo?.key}
          >
            <FaPlay />
          </button>
          <Dialog
            open={isOpenPlay}
            onClose={() => setIsOpenPlay(false)}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
              <DialogPanel className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
                <div className="absolute flex items-center gap-3 top-4 right-4">
                  {isInWatchList ? (
                    <button
                      onClick={handleRemoveWatchList}
                      className="bg-[#2b3d5ad3] text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
                    >
                      <FaHeart />
                    </button>
                  ) : (
                    <button
                      onClick={handleAddWatchList}
                      className="bg-[#2b3d5ad3] hover:text-[#d9232e] text-slate-300 hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
                    >
                      <FaHeart />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpenPlay(false)}
                    className="bg-[#302e2e9d] text-4xl rounded-full text-slate-300 hover:text-[#d9232e] focus:outline-none z-10"
                    aria-label="Close"
                  >
                    <IoIosCloseCircle />
                  </button>
                </div>
                <div className="w-full aspect-video">
                  {trailorVideo?.key ? (
                    <YouTube
                      key={iframeKey}
                      videoId={trailorVideo?.key}
                      opts={youtubeOpts}
                      className="w-full h-full"
                      iframeClassName="w-full h-full"
                      title={`Trailer for ${movie?.title || "Movie"}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                      <p>No trailer available</p>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </Dialog>
          <button
            type="button"
            className="bg-[#2b3d5ad3] text-slate-300 hover:text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <BsInfoLg />
          </button>
          {isInWatchList ? (
            <button
              onClick={handleRemoveWatchList}
              className="bg-[#2b3d5ad3] text-[#d9232e] hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            >
              <FaHeart />
            </button>
          ) : (
            <button
              onClick={handleAddWatchList}
              className="bg-[#2b3d5ad3] hover:text-[#d9232e] text-slate-300 hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center focus:outline-none"
            >
              <FaHeart />
            </button>
          )}
        </div>
        <h4 className="text-white m-0 pb-1 text-lg font-bold leading-5 line-clamp-2">
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
                className="text-2xl text-[#fff] hover:text-[#d9232e]"
                onClick={() => setIsOpen(false)}
              >
                <IoIosCloseCircle />
              </button>
            </DialogTitle>
            <div className="text-sm flex flex-col gap-3 text-[#fff]">
              <div className="relative">
                <img
                  className="w-full rounded-md object-cover"
                  src={
                    movie?.backdrop_path
                      ? IMG_CDN_URL2 + movie.backdrop_path
                      : "/path/to/fallback-image.jpg"
                  }
                  alt={movie?.original_title || "Movie"}
                />
                <div className="absolute z-10 items-center right-2 bottom-2">
                  <button
                    className="bg-[#d9232e] text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
                    onClick={handlePlayInsideInfo}
                    disabled={!trailorVideo?.key}
                  >
                    <FaPlay />
                  </button>
                </div>
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
