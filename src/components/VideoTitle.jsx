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

const VideoTitle = ({
  original_title,
  backdrop_path,
  release_date,
  vote_average,
  genre_ids,
  overview,
  id,
}) => {
  const dispatch = useDispatch();
  useMovieTrailer(id);
  const trailorVideo = useSelector((store) => store.movies?.trailers[id]);
  console.log(trailorVideo, "trailorVideo");

  const [isOpen, setIsOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const genreList = useSelector((store) => store.genre?.genreList);
  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    let timeout;
    if (!isOpen) {
      timeout = setTimeout(() => {
        setIframeKey((prev) => prev + 1);
        dispatch(clearTrailerVideo(id));
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [isOpen, id, dispatch]);

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
    <div className="absolute h-screen top-0 left-0 z-10 w-full pt-32 md:pt-48 px-4 md:px-10 text-white bg-gradient-to-r from-black to-transparent">
      <h1 className="text-3xl w-4/5 line-clamp-1 md:text-5xl lg:text-6xl font-bold">
        {original_title}
      </h1>

      <p className="text-base line-clamp-3 mb-5 text-white text-opacity-75 md:text-lg py-4 md:py-6 w-full md:w-3/4 lg:w-7/12">
        {overview}
      </p>

      <div className="flex gap-4 md:gap-6 items-center">
        <button
          className="bg-[#d9232e] py-2 px-4 md:px-8 flex gap-1 items-center text-white rounded-lg hover:bg-opacity-70 transition"
          onClick={() => setIsOpen(true)}
        >
          <FaPlay /> Play
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
            <DialogPanel className="relative w-full h-full bg-black">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute  text-5xl top-6 right-4 bg-[#302e2e9d] rounded-full text-[#fff] hover:text-[#d9232e] focus:outline-none"
                aria-label="Close"
              >
                <IoIosCloseCircle />
              </button>

              <div className="w-full h-full">
                <YouTube
                  key={iframeKey}
                  videoId={trailorVideo?.key}
                  opts={youtubeOpts}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                  title={`Trailer for ${original_title || "Movie"}`}
                />
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton className="bg-[#374151] py-2 px-4 md:px-8 flex gap-1 items-center text-slate-300 rounded-lg bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none">
                <FaInfoCircle className="w-5 h-5" />
                More Info
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
                      src={IMG_CDN_URL2 + backdrop_path}
                      alt={original_title}
                    />
                  </div>

                  <span>
                    🎥 <strong>Movie:</strong> {original_title}
                  </span>
                  <span>
                    ⭐ <strong>Rating:</strong> {vote_average.toFixed(1)}/10
                  </span>
                  <span>
                    🎬 <strong>Genre:</strong>{" "}
                    {getGenres(genre_ids, genreList).join(", ") ||
                      "Not Available"}
                  </span>
                  <span>
                    📅 <strong>Release:</strong>{" "}
                    {dayjs(release_date).format("MMMM D, YYYY")}
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
        <button className="flex gap-1 items-center bg-[#374151] py-2 px-4 md:px-8 text-slate-300 rounded-lg bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none">
          <FaHeart /> Add to Watch List
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
