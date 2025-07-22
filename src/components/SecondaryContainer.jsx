import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div>
      <MoviesList
        title="Now Playing"
        movies={movies?.nowPlayingMovies}
        property="-mt-[200px]"
      />
      <MoviesList title="Top Rated" movies={movies?.topRatedMovies} />
      <MoviesList title="Popular" movies={movies?.popularMovies} />
      <MoviesList title="Upcoming" movies={movies?.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
