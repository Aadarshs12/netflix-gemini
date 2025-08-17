import { FaPlay } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { IMG_CDN_URL2 } from "../utils/constant";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const VideoTitle = ({
  original_title,
  backdrop_path,
  release_date,
  vote_average,
  genre_ids,
  overview,
}) => {
  const genreList = useSelector((store) => store.genre?.genreList);

  const getGenres = (genre_ids = [], genreList = []) => {
    if (!Array.isArray(genre_ids) || !Array.isArray(genreList)) return [];
    console.log("genre_ids:", genre_ids);
    console.log("genreList:", genreList);
    return genre_ids
      .map((id) => {
        const genre = genreList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
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
        <button className="bg-white py-2 px-4 md:px-8 flex gap-1 items-center text-black rounded-lg hover:bg-opacity-70 transition">
          <FaPlay /> Play
        </button>

        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton className="bg-[#374151] py-2 px-4 md:px-8 flex gap-1 items-center text-black rounded-lg bg-opacity-70 hover:bg-opacity-80 transition focus:outline-none">
                <FaInfoCircle className="w-5 h-5" />
                More Info
              </PopoverButton>

              <PopoverPanel
                static
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[#000000fa] shadow-lg rounded-lg p-4 transition 
                ${open ? "opacity-100" : "opacity-0"}`}
              >
                <div className="text-sm flex flex-col gap-3 text-[#fff] relative z-[99]">
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
      </div>
    </div>
  );
};

export default VideoTitle;
