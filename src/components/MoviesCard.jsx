import { IMG_CDN_URL } from "../utils/constant";
import { useSelector } from "react-redux";
import { FaPlay, FaHeart  } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";


const MoviesCard = ({ movie }) => {

  console.log(movie);

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
    <div className="forMovieCard">
      <img
        className="rounded-lg"
        src={IMG_CDN_URL + `${movie?.poster_path}`}
        alt={movie?.title}
      />
      <div className="hoverOnMovieCard p-3 flex flex-col gap-1">
        <div>
          <span>
            <FaPlay />
          </span>
          <span>
            <FaCircleInfo />
          </span>
          <span>
            <FaHeart />
          </span>
        </div>
        <h4 className="text-white m-0 text-lg font-bold line-clamp-2">
          {movie?.title}
        </h4>
        <span className="text-xs">
          <span>Genre : {" "}</span>
          {getGenres(movie?.genre_ids, genreList).join(", ") || "Not Available"}
        </span>
      </div>
    </div>
  );
};

export default MoviesCard;
