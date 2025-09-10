import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReviews } from "../utils/moviesSlice";
import { API_Options } from "../utils/constant";

const useReviewsData = (movieId) => {
  const dispatch = useDispatch();

  const getReviewsData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
        API_Options
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const json = await response.json();
      dispatch(
        addReviews({
          movieId,
          reviews: json.results || [], 
        })
      );
    } catch (error) {
      console.error("Error fetching reviews for movie", movieId, ":", error);
      dispatch(
        addReviews({
          movieId,
          reviews: [], 
        })
      );
    }
  };

  useEffect(() => {
    if (movieId) {
      getReviewsData();
    }
  }, [movieId]);

  return null; 
};

export default useReviewsData;
