import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";
import { addGenreList } from "../utils/genreSlice";

const useGenresName = async () => {
  const dispatch = useDispatch();
  try {
    const genreResult = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      API_Options
    );
    const genreData = await genreResult.json();
    dispatch(addGenreList(genreData.genres));
  } catch (error) {
    console.log("Error loading genres : ", error);
  }
};

export default useGenresName;
