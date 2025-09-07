import { useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { API_Options } from "../utils/constant";
import { addTrailorVideo, clearTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailor = (id) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getMovieVideos = async (movieId) => {
    if (!movieId || typeof movieId !== 'number') {
      console.warn(`[useMovieTrailor] Invalid or missing movie ID: ${movieId}`);
      setError("Invalid or missing movie ID");
      setIsFetching(false);
      return;
    }
    try {
      setIsFetching(true);
      console.log(`[useMovieTrailor] Initiating fetch for movie ${movieId}`);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_Options
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const jsonData = await response.json();
      console.log(`[useMovieTrailor] Videos for movie ${movieId}:`, jsonData?.results);
      setData(jsonData?.results || []);
      setError(null);
    } catch (error) {
      console.error(`[useMovieTrailor] Error fetching videos for movie ${movieId}:`, error);
      setError(error.message || "Failed to fetch trailer");
      setData([]);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchTrailer = useCallback((movieId) => {
    if (!movieId || typeof movieId !== 'number') {
      console.warn(`[useMovieTrailor] Fetch skipped due to invalid movie ID: ${movieId}`);
      return;
    }
    console.log(`[useMovieTrailor] Fetch triggered for movie ${movieId}`);
    dispatch(clearTrailerVideo(movieId)); // Clear previous trailer
    getMovieVideos(movieId);
  }, [dispatch]);

  useEffect(() => {
    if (data && id) {
      console.log(`[useMovieTrailor] Processing videos for movie ${id}:`, data);
      const filterData = data.filter(
        (video) =>
          video.type === "Trailer" &&
          video.site === "YouTube" &&
          video.key &&
          typeof video.key === "string" &&
          video.key.length >= 11
      );
      const trailer = filterData.length ? filterData[0] : null;
      console.log(`[useMovieTrailor] Selected trailer for ${id}:`, trailer);
      if (data.length && !filterData.length) {
        console.warn(`[useMovieTrailor] No valid YouTube trailers for movie ${id}, available videos:`, data);
        setError("No valid YouTube trailer found");
      }
      dispatch(addTrailorVideo({ movieId: id, trailer }));
    }
  }, [data, id, dispatch]);

  useEffect(() => {
    return () => {
      if (id && typeof id === 'number') {
        console.log(`[useMovieTrailor] Clearing trailer for movie ${id}`);
        dispatch(clearTrailerVideo(id));
      }
    };
  }, [id, dispatch]);

  return { fetchTrailer, error, isFetching };
};

export default useMovieTrailor;