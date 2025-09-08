import { IMG_CDN_URL, IMG_CDN_URL2 } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { FaPlay, FaHeart } from "react-icons/fa";
import { BsInfoLg } from "react-icons/bs";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { IoIosCloseCircle } from "react-icons/io";
import useMovieTrailor from "../hooks/useMovieTrailor";
import { clearTrailerVideo } from "../utils/moviesSlice";
import { toast } from "react-toastify";
import { addWatchList, removeWatchList } from "../utils/watchlistSlice";
import poster from "../utils/notfoundposter.WEBP";
import posterbackdrop from "../utils/notfoundposterbackdrop.WEBP";

const MoviesCard = ({ movie }) => {
  const dispatch = useDispatch();
  const genreList = useSelector((store) => store.genre?.genreList || []);
  const trailorVideo = useSelector(
    (store) => store.movies?.trailers[movie?.id]
  );
  const watchList = useSelector(
    (store) => store.watchlist?.watchListItems || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPlay, setIsOpenPlay] = useState(false);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const { fetchTrailer, error, isFetching } = useMovieTrailor(movie?.id);

  const isInWatchList =
    movie?.id && Array.isArray(watchList)
      ? watchList.some((item) => item?.id === movie.id)
      : false;

  useEffect(() => {
    console.log(
      "[MoviesCard] Movie ID:",
      movie?.id,
      "Trailer:",
      trailorVideo,
      "Error:",
      error
    );
    if (error) {
      console.error(
        "[MoviesCard] Trailer fetch error for movie",
        movie?.id,
        ":",
        error
      );
      toast.error(`Failed to fetch trailer for movie ${movie?.id}: ${error}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
      setIsLoadingTrailer(false);
    }
    if (trailorVideo?.key && isLoadingTrailer) {
      console.log(
        "[MoviesCard] Trailer loaded, opening modal for key:",
        trailorVideo.key
      );
      setIsOpenPlay(true);
      setIsLoadingTrailer(false);
      toast.dismiss();
    }
  }, [trailorVideo, error, movie?.id, isLoadingTrailer]);

  const handlePlayInsideInfo = () => {
    if (!movie?.id) {
      console.error("[MoviesCard] No movie ID provided");
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    console.log("[MoviesCard] Play button clicked for movie", movie.id);
    if (trailorVideo?.key) {
      console.log(
        "[MoviesCard] Opening trailer modal for key:",
        trailorVideo.key
      );
      setIsOpen(false);
      setIsOpenPlay(true);
    } else {
      setIsLoadingTrailer(true);
      toast.warn("Fetching trailer...", {
        position: "bottom-right",
        autoClose: false,
      });
      dispatch(clearTrailerVideo(movie.id));
      fetchTrailer(movie.id);
    }
  };

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  const handleAddWatchList = () => {
    if (!movie?.id) {
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    dispatch(addWatchList(movie));
    toast.success("Added to Watch List!", { position: "bottom-right" });
  };

  const handleRemoveWatchList = () => {
    if (!movie?.id) {
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    dispatch(removeWatchList(movie.id));
    toast.error("Removed from Watch List!", { position: "bottom-right" });
  };

  if (!movie) {
    console.error("[MoviesCard] No movie data provided");
    return null;
  }

  return (
    <div className="forMovieCard relative overflow-visible">
      <img
        className="rounded-lg h-60 object-cover w-full"
        src={movie.poster_path ? IMG_CDN_URL + movie.poster_path : poster}
        alt={movie.title || "Movie"}
      />
      <div className="hoverOnMovieCard p-3 flex flex-col gap-1">
        <div className="flex flex-col-reverse gap-3 items-start">
          <button
            className="bg-[#d9232e] hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
            onClick={handlePlayInsideInfo}
            disabled={isFetching || isLoadingTrailer}
          >
            <FaPlay />
          </button>
          <Dialog
            open={isOpenPlay}
            onClose={() => {
              console.log(
                "[MoviesCard] Closing trailer modal for movie",
                movie.id
              );
              setIsOpenPlay(false);
              setIsLoadingTrailer(false);
              toast.dismiss();
              dispatch(clearTrailerVideo(movie.id));
            }}
            className="fixed inset-0 z-[1000]"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
              <DialogPanel className="relative w-full max-w-4xl bg-black rounded-lg overflow-visible">
                <div className="absolute flex flex-col-reverse items-center gap-2 top-4 right-4 z-[1001]">
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
                    onClick={() => {
                      console.log(
                        "[MoviesCard] Closing trailer modal for movie",
                        movie.id
                      );
                      setIsOpenPlay(false);
                      setIsLoadingTrailer(false);
                      toast.dismiss();
                      dispatch(clearTrailerVideo(movie.id));
                    }}
                    className="bg-[#302e2e9d] text-4xl rounded-full text-slate-300 hover:text-[#d9232e] focus:outline-none z-[1001]"
                    aria-label="Close"
                  >
                    <IoIosCloseCircle />
                  </button>
                </div>
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  {trailorVideo?.key ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${trailorVideo.key}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                      title={`Trailer for ${movie.title || "Movie"}`}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      onLoad={() => {
                        console.log(
                          "[MoviesCard] Iframe loaded for",
                          trailorVideo.key
                        );
                        toast.dismiss();
                      }}
                      onError={(err) =>
                        console.error("[MoviesCard] Iframe error:", err)
                      }
                    ></iframe>
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                      <div className="text-center">
                        <p>No trailer available</p>
                        <button
                          onClick={() => {
                            console.log(
                              "[MoviesCard] Retry fetch for movie",
                              movie.id
                            );
                            setIsLoadingTrailer(true);
                            toast.warn("Fetching trailer...", {
                              position: "bottom-right",
                              autoClose: false,
                            });
                            fetchTrailer(movie.id);
                          }}
                          className="mt-2 bg-red-600 px-4 py-2 rounded"
                        >
                          Retry
                        </button>
                      </div>
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
        <h4 className="text-white m-0 text-lg font-bold leading-5 line-clamp-2">
          {movie.title || "Not Available"}
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
                    movie.backdrop_path
                      ? IMG_CDN_URL2 + movie.backdrop_path
                      : posterbackdrop
                  }
                  alt={movie.title || "Movie"}
                />
                <div className="absolute z-10 items-center right-2 bottom-2">
                  <button
                    className="bg-[#d9232e] text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
                    onClick={handlePlayInsideInfo}
                    disabled={isFetching || isLoadingTrailer}
                  >
                    <FaPlay />
                  </button>
                </div>
              </div>
              <span>
                🎥 <strong>Movie:</strong> {movie.title || "Not Available"}
              </span>
              <span className="line-clamp-5">
                ℹ️ <strong>Overview:</strong>{" "}
                {movie.overview || "Not Available"}
              </span>
              <span>
                ⭐ <strong>Rating:</strong>{" "}
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
              </span>
              <span>
                🎬 <strong>Genre:</strong>{" "}
                {getGenres(movie.genre_ids, genreList).join(", ") ||
                  "Not Available"}
              </span>
              <span>
                📅 <strong>Release:</strong>{" "}
                {movie.release_date
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
