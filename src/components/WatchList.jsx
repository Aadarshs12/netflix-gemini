import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { IoHeartDislike } from "react-icons/io5";
import dayjs from "dayjs";
import { IMG_CDN_URL2 } from "../utils/constant";
import watchlistimg from "../utils/watchlist.png";
import { removeWatchList } from "../utils/watchlistSlice";
import { toast } from "react-toastify";

const WatchList = () => {
  const dispatch = useDispatch();
  const watchlist =
    useSelector((store) => store.watchlist?.watchListItems) || [];
  const genreList = useSelector((store) => store.genre?.genreList) || [];

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

  console.log("watchlist", watchlist);

  const handleRemoveWatchList = (item) => {
    console.log("Removing movie with id:", item.id);
    dispatch(removeWatchList(item.id));
    toast.error("Removed from Watch List!", {
      position: "bottom-right",
    });
  };

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
                <div className="w-1/3">
                  <img
                    className="w-full rounded-md object-cover"
                    src={
                      item?.backdrop_path
                        ? IMG_CDN_URL2 + item.backdrop_path
                        : "/path/to/fallback-image.jpg"
                    }
                    alt={item?.title || "Movie"}
                  />
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
          </div>
        )}
      </div>
    </>
  );
};

export default WatchList;
