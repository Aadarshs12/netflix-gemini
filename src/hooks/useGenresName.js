// import { useDispatch } from "react-redux";
// import { API_Options } from "../utils/constant";
// import { addGenreList } from "../utils/genreSlice";

// const useGenresName = async () => {
//   const dispatch = useDispatch();
//   try {
//     const genreResult = await fetch(
//       "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
//       API_Options
//     );
//     const genreData = await genreResult.json();
//     dispatch(addGenreList(genreData.genres));
//   } catch (error) {
//     console.log("Error loading genres : ", error);
//   }
// };

// export default useGenresName;

// hooks/useGenresName.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";
import { addGenreList } from "../utils/genreSlice";

const useGenresName = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreResult = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          API_Options
        );
        const genreData = await genreResult.json();
        dispatch(addGenreList(genreData.genres));
      } catch (error) {
        console.error("Error loading genres: ", error);
      }
    };

    fetchGenres();
  }, [dispatch]); // Include dispatch in dependency array
};

export default useGenresName;
