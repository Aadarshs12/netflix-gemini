import { useSelector } from "react-redux";
import Header from "./Header";
import { IoHeartDislike } from "react-icons/io5";
import dayjs from "dayjs";
import { IMG_CDN_URL2 } from "../utils/constant";

const WatchList = () => {
  const watchlist = useSelector((store) => store.watchlist?.watchListItems);
  const genreList = useSelector((store) => store.genre?.genreList);
  console.log("watchlist", watchlist);

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
    <>
      <Header />
      <div className="pt-24 pb-16 forWatchListBg">
        <h1 className="text-center text-4xl font-bold text-[#fff] underline">
          My Watch List
        </h1>
        {watchlist.map((items) => {
          return (
            <div
              key={items?.id}
              className="text-white mx-8 forMakingBorderBottom pt-10 flex items-end gap-5"
            >
              <div className="w-1/3">
                <img
                  className="w-full rounded-lg object-cover"
                  src={IMG_CDN_URL2 + items?.backdrop_path}
                  alt="movie poster"
                />
              </div>
              <div className="w-2/3 flex flex-col gap-1">
                <span>
                  {getGenres(items?.genre_ids, genreList).join(", ") ||
                    "Not Available"}
                </span>
                <div className="flex gap-3 flex-wrap items-center">
                  <h2 className="text-3xl text-[#d9232e] font-bold">
                    {items?.title}
                  </h2>
                  <span>
                    ⭐{" "}
                    {items?.vote_average
                      ? items.vote_average.toFixed(1)
                      : "N/A"}
                    /10
                  </span>
                  <span>
                    📅{" "}
                    {items?.release_date
                      ? dayjs(items.release_date).format("MMMM D, YYYY")
                      : "Not Available"}
                  </span>
                </div>
                <p className="text-slate-300">
                  <span>ℹ️</span> {items?.overview}
                </p>
                <button className="flex gap-2 items-center w-fit bg-[#d9232e] text-white py-2 px-3 rounded-full mt-4 hover:bg-red-800 hover:scale-105 active:bg-red-900 active:scale-100">
                  <IoHeartDislike /> Remove From Watch List
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WatchList;
