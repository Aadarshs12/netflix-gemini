import React from 'react';
import { FaPlay, FaHeart } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IMG_CDN_URL2 } from "../utils/constant";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import useMovieTrailer from "../hooks/useMovieTrailor";
import YouTube from "react-youtube";
import { clearTrailerVideo } from "../utils/moviesSlice";
import { addCount } from "../utils/moviesSlice";
import { toast } from "react-toastify";
import { addWatchList, removeWatchList } from "../utils/watchlistSlice";

const VideoTitle = ({ movie }) => {
  const dispatch = useDispatch();
  useMovieTrailer(movie?.id);
  const trailorVideo = useSelector(
    (store) => store.movies?.trailers[movie?.id]
  );
  const count = useSelector((store) => store.movies?.count);
  const [isOpen, setIsOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const genreList = useSelector((store) => store.genre?.genreList);
  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === movie?.id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  const watchList = useSelector(
    (store) => store.watchlist?.watchListItems || []
  );

  const isInWatchList =
    movie?.id && Array.isArray(watchList)
      ? watchList.some((item) => item?.id === movie.id)
      : false;

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

  useEffect(() => {
    return () => {
      dispatch(clearTrailerVideo(movie?.id));
    };
  }, [movie?.id, dispatch]);

  const handlePlayVideoTrailer = () => {
    if (trailorVideo?.key) {
      setIsOpen(true);
    } else {
      console.warn("No trailer video available for movie ID:", movie?.id);
    }
  };

  const handleCloseTrailer = () => {
    setIsOpen(false);
    setIframeKey((prev) => prev + 1);
    dispatch(addCount(count + 1));
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


  return (
    <div className="absolute items-center md:items-start flex flex-col gap-2 aspect-video lg:bottom-0 -bottom-[20px] left-0 z-20 w-full xl:pt-[25%] 2xl:pt-[33%] px-4 md:px-10 text-white lg:bg-gradient-to-r from-black to-transparent">
      <h1 className="text-3xl lg:pb-[3px] w-full md:w-3/4 lg:w-2/5 md:text-5xl leading-8 line-clamp-1 lg:text-6xl font-bold">
        {movie?.title}
      </h1>
      <p className="text-base m-0 line-clamp-4 text-white text-opacity-75 md:text-lg w-full md:w-3/4 lg:w-5/12">
        {movie?.overview}
      </p>
      <div className="flex gap-4 md:gap-6 lg:items-center md:items-start justify-center flex-row">
        <button
          className="bg-[#d9232e] md:py-2 w-10 h-10 md:w-auto md:h-auto grid place-content-center md:px-8 md:flex gap-1 items-center text-white rounded-full hover:bg-opacity-70 transition"
          onClick={handlePlayVideoTrailer}
        >
          <FaPlay /> <span className="hidden md:block">Play</span>
        </button>
        <Dialog
          open={isOpen}
          onClose={handleCloseTrailer}
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <DialogPanel className="relative w-full h-full bg-black">
              <button
                onClick={handleCloseTrailer}
                className="absolute text-5xl top-6 right-4 bg-[#302e2e9d] rounded-full text-[#fff] hover:text-[#d9232e] focus:outline-none"
                aria-label="Close"
              >
                <IoIosCloseCircle />
              </button>
              <div className="w-full h-full">
                {trailorVideo?.key ? (
                  <YouTube
                    key={iframeKey}
                    videoId={trailorVideo.key}
                    opts={youtubeOpts}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                    title={`Trailer for ${movie?.title || "Movie"}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    No trailer available
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </Dialog>
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton className="bg-[#374151] md:py-2 w-10 h-10 md:w-auto md:h-auto grid place-content-center md:px-8 md:flex gap-1 items-center text-slate-300 rounded-full bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none">
                <FaInfoCircle className="w-5 h-5" />
                <span className="hidden md:block">More Info</span>
              </PopoverButton>
              <PopoverPanel
                static
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[#000000fa] shadow-lg rounded-lg p-4 transition 
                ${open ? "opacity-100" : "opacity-0"}`}
              >
                <div className="text-sm flex flex-col gap-3 relative z-[99]">
                  <div>
                    <img
                      className="w-full rounded-md object-cover"
                      src={IMG_CDN_URL2 + movie?.backdrop_path}
                      alt={movie?.title}
                    />
                  </div>
                  <span>
                    🎥 <strong>Movie:</strong> {movie?.title}
                  </span>
                  <span>
                    ⭐ <strong>Rating:</strong> {movie?.vote_average.toFixed(1)}
                    /10
                  </span>
                  <span>
                    🎬 <strong>Genre:</strong>{" "}
                    {getGenres(movie?.genre_ids, genreList).join(", ") ||
                      "Not Available"}
                  </span>
                  <span>
                    📅 <strong>Release:</strong>{" "}
                    {dayjs(movie?.release_date).format("MMMM D, YYYY")}
                  </span>
                </div>
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                    border-l-8 border-r-8 border-t-8 border-l-transparent 
                    border-r-transparent border-t-[#000000fa]"
                ></div>
              </PopoverPanel>
            </>
          )}
        </Popover>
        {isInWatchList ? (
          <button
            onClick={handleRemoveWatchList}
            className="md:flex gap-1 items-center bg-[#374151] grid place-content-center md:py-2 w-10 h-10 md:w-auto md:h-auto  md:px-8 text-[#d9232e] rounded-full bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none"
          >
            <FaHeart /> <span className="hidden md:block">Added to Watch List</span>
          </button>
        ) : (
          <button
            onClick={handleAddWatchList}
            className="md:flex gap-1 items-center bg-[#374151] grid place-content-center md:py-2 w-10 h-10 md:w-auto md:h-auto  md:px-8 text-slate-300 rounded-full bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none"
          >
            <FaHeart /> <span className="hidden md:block">Add to Watch List</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoTitle;
