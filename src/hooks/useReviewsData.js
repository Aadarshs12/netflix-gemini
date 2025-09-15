import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReviews } from "../utils/moviesSlice";
import { API_Options } from "../utils/constant";
import { setReviewsLoading } from "../utils/moviesSlice";  // Export the new action

const useReviewsData = (movieId) => {
  const dispatch = useDispatch();

  const getReviewsData = async () => {
    try {
      dispatch(setReviewsLoading({ movieId, loading: true }));
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
      dispatch(setReviewsLoading({ movieId, loading: false }));
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