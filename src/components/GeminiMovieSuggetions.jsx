import { useSelector } from "react-redux";
import MoviesList from "../components/MoviesList";

const GeminiMovieSuggetions = () => {
  const tmdbSearchData = useSelector(
    (store) => store.tmdbSearch?.tmdbSearchData
  );
  console.log("search", tmdbSearchData);

  const allMovies = tmdbSearchData
    ? tmdbSearchData
        .flat()
        .filter((movie) => movie !== null && movie !== undefined)
    : [];

  console.log("allMovies", allMovies);

  return (
    <>
      {tmdbSearchData === null ? (
        <p>Loading movies...</p>
      ) : allMovies.length > 0 ? (
        <MoviesList
          title="Related Search"
          property="lg:-mt-[150px]"
          movies={allMovies.filter((item) => item?.backdrop_path)}
        />
      ) : (
        <p>No movies found.</p>
      )}
    </>
  );
};

export default GeminiMovieSuggetions;
