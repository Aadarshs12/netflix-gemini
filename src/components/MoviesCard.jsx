import { IMG_CDN_URL } from "../utils/constant";

const MoviesCard = ({ movie }) => {
  return (
    <div>
      <img
        className="rounded-lg"
        src={IMG_CDN_URL + `${movie?.poster_path}`}
        alt={movie?.title}
      />
    </div>
  );
};

export default MoviesCard;
