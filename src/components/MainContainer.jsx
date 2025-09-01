import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];
  

  const {
    original_title,
    backdrop_path,
    release_date,
    vote_average,
    genre_ids,
    overview,
    id,
  } = mainMovie;

  return (
    <div>
      <VideoTitle
        backdrop_path={backdrop_path}
        vote_average={vote_average}
        release_date={release_date}
        original_title={original_title}
        genre_ids={genre_ids}
        overview={overview}
        id={id}
      />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
