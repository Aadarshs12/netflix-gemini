import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { IoHeartDislike } from "react-icons/io5";
import dayjs from "dayjs";
import { IMG_CDN_URL2 } from "../utils/constant";
import watchlistimg from "../utils/watchlist.png";
import { removeWatchList } from "../utils/watchlistSlice";
import { toast } from "react-toastify";
import posterbackdrop from "../utils/notfoundposterbackdrop.WEBP";
import useMovieTrailor from "../hooks/useMovieTrailor";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { clearTrailerVideo } from "../utils/moviesSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoIosCloseCircle } from "react-icons/io";

const WatchList = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((store) => store.watchlist?.watchListItems) || [];
  const genreList = useSelector((store) => store.genre?.genreList) || [];
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const [isOpenPlay, setIsOpenPlay] = useState(false);

  const { fetchTrailer, error, isFetching } = useMovieTrailor(selectedMovieId);
  const trailorVideo = useSelector(
    (store) => store.movies?.trailers[selectedMovieId]
  );

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return (
      genre_ids
        .map((id) => {
          const genre = genreList.find((g) => g.id === id);
          return genre ? genre.name : null;
        })
        .filter(Boolean)
        .join(", ") || "Not Available"
    );
  };


  const handleRemoveWatchList = (item) => {
    if (!item?.id) {
      console.error("[WatchList] Invalid movie ID for removal");
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    dispatch(removeWatchList(item.id));
    toast.error("Removed from Watch List!", { position: "bottom-right" });
  };

  const handlePlayInsideInfo = (item) => {
    if (!item?.id) {
      console.error("[WatchList] No movie ID provided");
      toast.error("Invalid movie data", { position: "bottom-right" });
      return;
    }
    if (selectedMovieId !== item.id) {
      if (selectedMovieId) {
        dispatch(clearTrailerVideo(selectedMovieId));
      }
      setSelectedMovieId(item.id);
      setIsLoadingTrailer(true);
      toast.warn("Fetching trailer...", { position: "bottom-right", autoClose: false });
      fetchTrailer(item.id);
    } else if (!trailorVideo?.key && !isFetching) {
      dispatch(clearTrailerVideo(item.id));
      setIsLoadingTrailer(true);
      toast.warn("Fetching trailer...", { position: "bottom-right", autoClose: false });
      fetchTrailer(item.id);
    }
  };

  useEffect(() => {
    if (error && selectedMovieId) {
      console.error("[WatchList] Trailer fetch error for movie", selectedMovieId, ":", error);
      toast.error(`Failed to fetch trailer for movie ${selectedMovieId}: ${error}`, {
        position: "bottom-right",
        autoClose: 5000,
      });
      setIsLoadingTrailer(false);
    }
    if (trailorVideo?.key && isLoadingTrailer && selectedMovieId) {
      setIsOpenPlay(true);
      setIsLoadingTrailer(false);
      toast.dismiss();
    }
  }, [trailorVideo, error, selectedMovieId, isLoadingTrailer]);

  return (
    <>
      <Header />
      <div className="pt-24 pb-16 forWatchListBg">
        <h1 className="text-center text-4xl font-bold text-[#fff] underline">
          My Watch List
        </h1>
        {watchlist.length === 0 ? (
          <div className="flex lg:flex-row gap-5 flex-col items-center mt-5 mx-8">
            <div className="lg:w-1/2 w-100">
              <img
                className="object-cover"
                src={watchlistimg}
                alt="Watch list placeholder"
              />
            </div>
            <div className="lg:w-1/2 w-100 text-center">
              <h3 className="text-2xl text-[#d9232e] font-bold mb-2">
                Your Watchlist is Empty!
              </h3>
              <p className="text-slate-300">
                Looks like you haven’t added anything yet. <br />
                Start exploring and add movies or shows you’d like to watch
                later.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {watchlist.map((item) => (
              <div
                key={item?.id}
                className="text-white mx-8 forMakingBorderBottom pt-10 flex items-end gap-5"
              >
                <div className="w-1/3 relative">
                  <img
                    className="w-full rounded-md object-cover"
                    src={
                      item?.backdrop_path
                        ? IMG_CDN_URL2 + item.backdrop_path
                        : posterbackdrop
                    }
                    alt={item?.title || "Movie"}
                  />
                  <div className="absolute z-10 items-center right-2 bottom-2">
                    <button
                      className="bg-[#d9232e] hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100 text-white hover:cursor-pointer h-3 w-3 rounded-full p-4 grid place-content-center"
                      onClick={() => handlePlayInsideInfo(item)}
                      disabled={isFetching || isLoadingTrailer}
                    >
                      <FaPlay />
                    </button>
                  </div>
                </div>
                <div className="w-2/3 flex flex-col gap-1">
                  <span>{getGenres(item?.genre_ids, genreList)}</span>
                  <div className="flex gap-3 flex-wrap items-center">
                    <h2 className="text-3xl text-[#d9232e] font-bold">
                      {item?.title || "Untitled"}
                    </h2>
                    <span>
                      ⭐{" "}
                      {item?.vote_average
                        ? item.vote_average.toFixed(1)
                        : "N/A"}
                      /10
                    </span>
                    <span>
                      📅{" "}
                      {item?.release_date
                        ? dayjs(item.release_date).format("MMMM D, YYYY")
                        : "Not Available"}
                    </span>
                  </div>
                  <p className="text-slate-300">
                    <span>ℹ️</span>{" "}
                    {item?.overview || "No description available"}
                  </p>
                  <button
                    onClick={() => handleRemoveWatchList(item)}
                    className="flex gap-2 items-center w-fit bg-[#d9232e] text-white py-2 px-3 rounded-full mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100"
                  >
                    <IoHeartDislike /> Remove From Watch List
                  </button>
                </div>
              </div>
            ))}
            <Dialog
              open={isOpenPlay}
              onClose={() => {
                setIsOpenPlay(false);
                setSelectedMovieId(null);
                setIsLoadingTrailer(false);
                toast.dismiss();
                if (selectedMovieId) {
                  dispatch(clearTrailerVideo(selectedMovieId));
                }
              }}
              className="fixed inset-0 z-[1000]"
            >
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4">
                <DialogPanel className="relative w-full max-w-4xl bg-black rounded-lg overflow-visible">
                  <div className="absolute flex items-center gap-3 top-4 right-4 z-[1001]">
                    <button
                      onClick={() => {
                        setIsOpenPlay(false);
                        setSelectedMovieId(null);
                        setIsLoadingTrailer(false);
                        toast.dismiss();
                        if (selectedMovieId) {
                          dispatch(clearTrailerVideo(selectedMovieId));
                        }
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
                        title="trailer"
                        className="w-full h-full border-0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        onLoad={() => {
                          toast.dismiss();
                        }}
                        onError={(err) => console.error("[WatchList] Iframe error:", err)}
                      ></iframe>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
                        <div className="text-center">
                          <p>No trailer available</p>
                          <button
                            onClick={() => {
                              setIsLoadingTrailer(true);
                              toast.warn("Fetching trailer...", { position: "bottom-right", autoClose: false });
                              fetchTrailer(selectedMovieId);
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
          </div>
        )}
      </div>
    </>
  );
};

export default WatchList;